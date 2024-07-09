import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CategoryOptions = ({ name, icon }) => {
    return (
        <View style={styles.container}>
            <View style={styles.icon}>
                {icon}
            </View>
            <Text style={styles.cateogry}>{name}</Text>
        </View>
    )
}

export default CategoryOptions

const styles = StyleSheet.create({
    icon: {
        transform: [{ scale: 0.5 }]
    },
    container: { flexDirection: "row", alignItems: "center" },
    cateogry: {
        paddingVertical: 10
    },
})