import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import mime from 'mime'
import React, { useState } from 'react'
import FormInput from '../ui/FormInput'
import DatePicker from '../ui/DatePicker'
import OptionModal from '../component/OptionModal'
import categories from '../utils/categories'
import CategoryOptions from '../ui/CategoryOptions'
import Color from '../utils/Color'
import FormButton from '../ui/FormButton'
import CustomKeyboardAvoidingView from '../ui/CustomKeyboardAvoidingView'
import { launchImageLibrary } from 'react-native-image-picker'
import HorizontalImageList from '../component/HorizontalImageList'
import { newProduct, validate } from '../utils/validator'
import { showMessage } from 'react-native-flash-message'
import LoadingSpinner from '../ui/LoadingSpinner'
import { runAxiosAsync } from '../api/runAxiosAsync'
import useClient from '../hooks/useClient'
import size from '../utils/size'

const Add = () => {
  const defaultInfo = {
    name: "",
    description: "",
    price: "",
    category: "",
    purchasingDate: new Date()
  }
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [showImageOption, setShowImageOption] = useState(false)
  const [busy, setBusy] = useState(false)
  const [images, setImages] = useState([])
  const [productInfo, setProductInfo] = useState(defaultInfo)
  const [selectedImage, setSelectedImage] = useState("")
  const imageOptions = [{ value: "Remove Image", id: "remove" }];
  const { authClient } = useClient()

  const handleChange = (name) => (text) => {
    setProductInfo({ ...productInfo, [name]: text })
  }

  const handleSubmit = async () => {
    const { error } = await validate(newProduct, productInfo)
    if (error) return showMessage({ message: error, type: "danger" })


    const formData = new FormData()
    for (let key in productInfo) {
      formData.append(key, productInfo[key])
    }

    //appending image
    const newImages = images.map(({ img, index }) => {
      return {
        name: "image_" + index,
        type: mime.getType(img),
        uri: img
      }
    })

    for (let img of newImages) {
      formData.append('images', img)
    }

    setBusy(true)
    const res = await runAxiosAsync(
      authClient.post("/product/add-new-product", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
        //   headers: {
        //     Accept: 'application/json',
        //    'Content-Type': 'multipart/form-data'
        //  }
      })
    )    

    console.log(res);
    setBusy(false)
    if (!res.status) return showMessage({ message: res.data, type: "danger" })
    showMessage({ message: res.data, type: "success" })


  }

  const { name, description, price, category, purchasingDate } = productInfo

  const handleOnImageSelection = async () => {
    const options = {
      mediaType: 'photo',
      quality: 0.3,
      selectionLimit: 0, //allow to upload mutilple images
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorCode);
      } else if (response.assets) {
        const imageUris = response.assets.map(({ uri }) => uri)
        setImages([...images, ...imageUris])
      }
    });
  }


  return (
    <CustomKeyboardAvoidingView>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Pressable style={styles.fileSelector} onPress={handleOnImageSelection}>
            <Image source={require("../../assets/icons/icon_image.png")} />
            <Text>Add Images</Text>
          </Pressable>

          <HorizontalImageList data={images} style={{}} onLongPress={(img) => { setShowImageOption(true), setSelectedImage(img) }} />
          {/* <FlatList showsHorizontalScrollIndicator={false} horizontal data={images} keyExtractor={(item) => item} renderItem={({ item }) => { return <Image style={styles.selectedImage} source={{ uri: item }} /> }} /> */}
        </View>
        <FormInput placeholder="Product name" value={name} onChangeText={handleChange("name")} />
        <FormInput placeholder="Price" value={price} onChangeText={handleChange("price")} keyboardType="numeric" />

        <DatePicker title={"Purchasing date: "} value={purchasingDate} onChange={(purchasingDate) => { setProductInfo({ ...productInfo, purchasingDate }) }} />

        <TouchableOpacity style={styles.categorySelector} onPress={() => setShowCategoryModal(true)}>
          <Text>{category || "Category"}</Text>
          <Image style={styles.iconShow} source={require("../../assets/icons/icon_show.png")} />
        </TouchableOpacity>

        <FormInput placeholder="Description" multiline numberOfLines={4} value={description} onChangeText={handleChange("description")} />

        <FormButton title={"Add Product"} onPress={handleSubmit} />

        {/* category modal */}
        <OptionModal
          visible={showCategoryModal}
          onRequestClose={setShowCategoryModal}
          options={categories}
          renderItem={(item) => {
            return <CategoryOptions {...item} />
          }}
          onPress={(item) => {
            setProductInfo({ ...productInfo, category: item.name })
          }}
        />

        {/* image remove modal */}

        <OptionModal
          visible={showImageOption}
          onRequestClose={setShowImageOption}
          options={imageOptions}
          renderItem={(item) => {
            return <Text style={styles.textImageOption}>{item.value}</Text>
          }}
          onPress={(option) => {
            if (option.id == "remove") {
              const newImages = images.filter((img) => img !== selectedImage)
              setImages(newImages)
              console.log(images);
              setShowImageOption(false)
            }
          }}
        />
      </View >
      <LoadingSpinner visiable={busy} />
    </CustomKeyboardAvoidingView >
  )
}

export default Add

const styles = StyleSheet.create({
  textImageOption: {
    fontSize: 18,
    padding: 10,
    fontWeight: "700"
  },
  imageContainer: {
    flexDirection: "row"
  },
  selectedImage: {
    width: 90,
    height: 90,
    marginLeft: 5,
    borderWidth: 2.5,
    borderRadius: 5
  },
  iconShow: {
    width: 15,
    height: 15,
    marginRight: 5
  },
  categorySelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: 58,
    padding: 8,
    borderWidth: 2,
    marginVertical: 10,
    borderColor: Color.deActive,
    borderRadius: 15
  },
  cateogry: {
    paddingVertical: 10
  },
  fileSelector: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: 90,
    height: 90,
    borderWidth: 2.5,
    borderColor: "black",
    borderRadius: 5
  },
  container: {
    flex: 1,
    padding: size.padding
  }
})