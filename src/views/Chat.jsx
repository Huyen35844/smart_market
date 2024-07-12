import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppHeader from '../component/AppHeader'
import BackButton from '../ui/BackButton'
import size from '../utils/size'

const Chat = () => {
  return (
    <View style={styles.container}>
      <AppHeader backButton={<BackButton />} />
    </View>
  )
}

export default Chat

const styles = StyleSheet.create({
  container: {
    padding: size.padding
  }
})