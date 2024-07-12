import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import size from '../utils/size'
import { runAxiosAsync } from '../api/runAxiosAsync'
import useClient from '../hooks/useClient'
import { showMessage } from 'react-native-flash-message'
import AppHeader from '../component/AppHeader'
import BackButton from '../ui/BackButton'
import ProductImage from '../ui/ProductImage'
import { useNavigation } from '@react-navigation/native'

const Listing = () => {
  const { navigate } = useNavigation()
  const { authClient } = useClient()
  const [listProduct, setListProduct] = useState([])
  const fetchListings = async () => {
    const res = await runAxiosAsync(authClient.get("/product/get-products"))
    if (!res.status) {
      showMessage({ message: res.data, type: "danger" })
    } else {
      setListProduct(res.data.products)
    }
  }

  useEffect(() => {
    fetchListings()
  }, [])

  return (
    <View style={styles.container}>
      <AppHeader backButton={<BackButton />} />
      <FlatList
        data={listProduct}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <Pressable style={styles.listItem} onPress={() => { navigate("SingleProduct", { product: item }) }}>
              <ProductImage uri={item.thumbnail} />
              <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
            </Pressable>
          )
        }}
      />
    </View>
  )
}

export default Listing

const styles = StyleSheet.create({
  flatList: {
    paddingBottom: 20
  },
  listItem: {
    paddingBottom: size.padding
  },
  productName: {
    fontWeight: "700",
    fontSize: 20,
    letterSpacing: 1,
    paddingTop: 10,
  },
  container: {
    flex: 1,
    padding: size.padding
  }
})