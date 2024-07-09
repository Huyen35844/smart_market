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
import { useSelector } from 'react-redux'
import { getAuthState } from '../store/auth'
import useAuth from '../hooks/useAuth'
import { showMessage } from 'react-native-flash-message'
import { showErrorCSS } from 'react-native-svg/lib/typescript/deprecated'

const SignIn = () => {
    const { navigate } = useNavigation()
    const [userInfo, setUserInfo] = useState({ email: "", password: "" })
    const [error, setError] = useState("")
    const [busy, setBusy] = useState(false)


    // create a new function with the parameter name fixed, and then this function will wait to receive the parameter text when the event occurs
    const handleChange = (name) => (text) => {
        setUserInfo({ ...userInfo, [name]: text })
    }

    const { signIn, authState } = useAuth();

    const handleSubmit = async () => {
        setBusy(true)
        const res = await signIn(userInfo)
        setBusy(false)
        if (!res.status) return setError(res.data)

        showMessage({ message: "Login successfully!", type: "success" })
    }

    const { email, password } = userInfo
    return (
        <CustomKeyboardAvoidingView>
            <LayoutAuth>
                <TitleHeaderAuth title="Login" />
                <FormInput type="email" placeholder="Enter your email" value={email} onChangeText={handleChange("email")} />
                <FormInput type="password" placeholder="Enter your password" value={password} onChangeText={handleChange("password")} />
                {error && <Text style={styles.errorMessage}>{error}</Text>}
                <FormButton active={!busy} title="Sign In" onPress={handleSubmit} />
                <FormNavigator leftTitle="Sign up" onPressLeft={() => { navigate("SignUp") }} rightTitle="Forget password" onPressRight={() => { navigate("ForgetPassword") }} />
                <Pressable style={styles.button}>
                    <Image source={require("../../assets/icons/icon_google.png")} />
                    <Text style={styles.text}>Google</Text>
                </Pressable>
                <Pressable style={styles.button}>
                    <Image source={require("../../assets/icons/icon_facebook.png")} />
                    <Text style={styles.text}>Facebook</Text>
                </Pressable>
            </LayoutAuth>
        </CustomKeyboardAvoidingView>

    )
}

export default SignIn

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