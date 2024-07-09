import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import size from '../utils/size'

const AppHeader = ({ backButton, center, right }) => {
    const { goBack, canGoBack } = useNavigation()
    return (
        <View>
            {/* back button */}
            {canGoBack() && <Pressable onPress={goBack}>{backButton}</Pressable>}
            {/* center ui */}
            {center}
            {/* right ui */}
            {right}
        </View>
    )
}

export default AppHeader

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: size.padding,
    }
})