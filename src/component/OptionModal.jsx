import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Color from '../utils/Color'

const OptionModal = ({ visible, onRequestClose, options, renderItem, onPress }) => {
    const handleClose = () => onRequestClose(!visible)

    return (
        //onRequestClose: click back, or navigate back then the Modal closes
        <Modal transparent visible={visible} onRequestClose={handleClose}>
            <Pressable style={styles.container} onPress={handleClose}>
                <View style={styles.innerContainer}>
                    <ScrollView>
                        {options.map((item, index) => {
                            return <Pressable key={index}
                                onPress={() => { onPress(item), handleClose() }}>{renderItem(item)}
                            </Pressable>
                        })}
                    </ScrollView>
                </View>
            </Pressable>
        </Modal>
    )
}

export default OptionModal

const styles = StyleSheet.create({
    container: {
        //means position:"absoluate", top, bottom, left, right = 0, take the entire screen
        ...StyleSheet.absoluteFillObject,
        justifyContent: "center",
        alignItems: "center",
        padding: 15,
        backgroundColor: Color.backDrop
    },
    innerContainer: {
        width: "100%",
        backgroundColor: "white",
        padding: 10,
        borderRadius: 7,
        maxHeight: 200
    }
})