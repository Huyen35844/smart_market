import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppHeader from '../component/AppHeader'
import BackButton from '../ui/BackButton'

const Chat = () => {
  return (
    <View>
      <AppHeader backButton={<BackButton />} />
    </View>
  )
}

export default Chat

const styles = StyleSheet.create({})