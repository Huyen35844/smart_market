import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import size from '../utils/size'

const { width } = Dimensions.get('screen')
const imageWidth = width - size.padding * 2
const aspect = 16 / 9

const ProductImage = ({ uri }) => {
    return (
        uri &&
        <Image
            source={{ uri }}
            style={styles.image}
            resizeMethod='resize'
            resizeMode='cover'
        />
    )
}

export default ProductImage

const styles = StyleSheet.create({
    image: {
        width: imageWidth,
        height: imageWidth / aspect,
        borderRadius: 7
    }
})