import { Button, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import LayoutAuth from '../ui/LayoutAuth'
import TitleHeaderAuth from '../ui/TitleHeaderAuth'
import FormInput from '../ui/FormInput'
import FormNavigator from '../ui/FormNavigator'
import Color from '../utils/Color'
import FormButton from '../ui/FormButton'
import CustomKeyboardAvoidingView from '../ui/CustomKeyboardAvoidingView'
import { useNavigation } from '@react-navigation/native'
import { newUserSchema, validate } from '../utils/validator'
import { runAxiosAsync } from '../api/runAxiosAsync'
import client from '../api/client'
import { showMessage } from 'react-native-flash-message'

const SignUp = () => {
  const { navigate } = useNavigation()
  const [error, setError] = useState("")

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const [busy, setBusy] = useState(false)

  // create a new function with the parameter name fixed, and then this function will wait to receive the parameter text when the event occurs
  const handleChange = (name) => (text) => {
    setUserInfo({ ...userInfo, [name]: text })
  }

  const handleSubmit = async () => {
    const { error, values } = await validate(newUserSchema, userInfo)
    if (error) return setError(error)

    setBusy(true)
    const res = await runAxiosAsync(
      client.post("/auth/sign-up", values)
    )

    if (!res.status) return setError(res.data)
    else {
      setBusy(false)
      setError('')
      showMessage({ message: res.data.message, type: "success" })
    }

  }

  const { name, email, password, confirmPassword } = userInfo

  return (
    <CustomKeyboardAvoidingView>
      <LayoutAuth>
        <TitleHeaderAuth title="Sign up" />
        <FormInput type="account" placeholder="Enter your name" value={name} onChangeText={handleChange('name')} />
        <FormInput type="email" placeholder="Enter your email" value={email} onChangeText={handleChange('email')} />
        <FormInput type="password" placeholder="Enter your password" value={password} onChangeText={handleChange('password')} />
        <FormInput type="password" placeholder="Confirm password" value={confirmPassword} onChangeText={handleChange('confirmPassword')} />
        {error && <Text style={styles.errorMessage}>{error}</Text>}
        <FormButton active={!busy} title="Sign Up" onPress={handleSubmit} />
        <FormNavigator leftTitle="Sign in" onPressLeft={() => { navigate("SignIn") }} rightTitle="Forget password" onPressRight={() => { navigate("ForgetPassword") }} />
      </LayoutAuth>
    </CustomKeyboardAvoidingView>
  )
}

export default SignUp

const styles = StyleSheet.create({
  text: {
    marginLeft: 10,
    fontWeight: "bold",
    fontSize: 20,
    color: Color.deActive
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    marginBottom: 10,
    width: "100%",
    height: 56,
    borderWidth: 1,
    borderRadius: 32,
    borderColor: Color.deActive,

  },
  errorMessage: {
    fontSize: 16,
    fontWeight: "bold",
    color: "red"
  }
})
