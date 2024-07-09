import { FlatList, Pressable, StyleSheet, Image, Text, View } from 'react-native'
import React from 'react'

const HorizontalImageList = ({ data, style, onPress, onLongPress }) => {
    return (
        <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={data}
            keyExtractor={(item) => item}
            contentContainerStyle={style}
            renderItem={({ item }) => {
                return (
                    // onPress && onPress(item) means when we pass the value to onPress property then onPress(item) will trigger, otherwise that's fine
                    < Pressable style={styles.listItem} onPress={() => onPress && onPress(item)} onLongPress={() => onLongPress && onLongPress(item)}>
                        <Image style={styles.image} source={{ uri: item }} />
                    </Pressable >
                )
            }}
        />
    )
}

export default HorizontalImageList

const styles = StyleSheet.create({
    listItem: {
        width: 90,
        height: 90,
        marginLeft: 5,
        borderRadius: 5,
        //to hide the part outside of the borderRadius
        overflow: "hidden"
    },
    image: {
        flex: 1
    }
})