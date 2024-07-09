import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Color from '../utils/Color'

const ProfileOptionListItem = ({ active, style, title, iconPath, onPress }) => {
    return (
        <Pressable onPress={onPress} style={[styles.container, style]}>
            <View style={styles.buttonContainer}>
                <Image style={styles.icon} source={iconPath} />
                <Text style={[styles.title, { color: active ? Color.active : "black" }]}>{title}</Text>
            </View>
            {active && <View style={styles.indicator} />}
        </Pressable>
    )
}

export default ProfileOptionListItem

const styles = StyleSheet.create({
    icon: {
        width: 30,
        height: 30
    },
    title: {
        fontSize: 20,
        paddingLeft: 10
    },
    container: {
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    buttonContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    indicator: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: Color.active
    }
})
