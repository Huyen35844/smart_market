import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppHeader from '../component/AppHeader'
import BackButton from '../ui/BackButton'
import size from '../utils/size'
import ProductDetail from '../component/ProductDetail'

const SingleProduct = (props) => {
    const product = props.route?.params
    return (
        <View style={styles.container}>
            <AppHeader backButton={<BackButton />} />
            <ProductDetail />
        </View>
    )
}

export default SingleProduct

const styles = StyleSheet.create({
    container: {
        padding: size.padding
    }
})