import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { Platform, Pressable, StyleSheet, Text } from 'react-native';
import Color from '../utils/Color';
import formatDate from '../utils/date';

const isIOS = Platform.OS == "ios"

const DatePicker = ({ title, value, onChange }) => {
    //On android, DateTimePicker appears right after navigating to Add and can't open DateTimePicker again after cancling, it doesn't show the date text

    //For android, showPicker manage the state on or off the calendar
    const [showPicker, setShowPicker] = useState(false)

    //For android, whenever click on the pressable depends on the state, it will show the calendar
    //For ios, by default is true
    const visible = isIOS ? true : showPicker

    //Manage the action click and change the value of showPicker
    const onPress = () => {
        if (isIOS) return;
        setShowPicker(true)
    }
    return (
        <Pressable onPress={onPress} style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            {!isIOS && <Text style={styles.value}>{formatDate(value.toISOString(), "dd LLL yyyy")}</Text>}
            {
                visible &&
                <DateTimePicker testID='dateTimePicker' value={value}
                    onChange={(_, date) => {
                        if (date) onChange(date)
                        if (!isIOS) setShowPicker(false)
                    }}
                />
            }
        </Pressable>
    )
}

export default DatePicker

const styles = StyleSheet.create({
    title: {
        fontSize: 16
    },
    value: {
        paddingLeft: 10,
        fontSize: 16
    },
    container: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        height: 58,
        //style for android
        padding: isIOS ? 0 : 8,
        borderWidth: isIOS ? 0 : 2,
        marginVertical: 10,
        borderColor: Color.deActive,
        borderRadius: 15
    }
})