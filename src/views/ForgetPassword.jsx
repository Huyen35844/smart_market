import { StyleSheet, Text } from 'react-native'
import React, { useState } from 'react'
import LayoutAuth from '../ui/LayoutAuth'
import TitleHeaderAuth from '../ui/TitleHeaderAuth'
import FormInput from '../ui/FormInput'
import FormNavigator from '../ui/FormNavigator'
import Color from '../utils/Color'
import FormButton from '../ui/FormButton'
import CustomKeyboardAvoidingView from '../ui/CustomKeyboardAvoidingView'
import { useNavigation } from '@react-navigation/native'
import { runAxiosAsync } from '../api/runAxiosAsync'
import client from '../api/client'
import { showMessage } from 'react-native-flash-message'

const ForgetPassword = () => {
  const { navigate } = useNavigation()
  const [error, setError] = useState("")
  const [email, setEmail] = useState("")

  const handleSubmit = async () => {
    const res = await runAxiosAsync(
      client.post("/auth/forget-pass", { email })
    )
    console.log(res);
    if (!res.status) return setError(res.data)
    else {
      setError("")
      showMessage({ message: res.data.message, type: "success" })
    }
  }

  return (
    <CustomKeyboardAvoidingView>
      <LayoutAuth>
        <TitleHeaderAuth title="Forget Password" />
        <FormInput type="email" placeholder="Enter your email" value={email} onChangeText={(text) => setEmail(text)} />
        {error && <Text style={styles.errorMessage}>{error}</Text>}
        <FormButton active title="Request Link" onPress={handleSubmit} />
        <FormNavigator leftTitle="Sign up" onPressLeft={() => { navigate("SignUp") }} rightTitle="Sign in" onPressRight={() => { navigate("SignIn") }} />
      </LayoutAuth>
    </CustomKeyboardAvoidingView>
  )
}

export default ForgetPassword

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