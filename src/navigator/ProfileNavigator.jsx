import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Profile from '../views/Profile'
import Listing from '../views/Listing'
import Chat from '../views/Chat'
import SingleProduct from '../views/SingleProduct'

const ProfileNavigator = () => {
  const Stack = createNativeStackNavigator()
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Profile' component={Profile} />
      <Stack.Screen name='Chat' component={Chat} />
      <Stack.Screen name='Listing' component={Listing} />
      <Stack.Screen name='SingleProduct' component={SingleProduct} />
    </Stack.Navigator>
  )
}

export default ProfileNavigator

const styles = StyleSheet.create({})