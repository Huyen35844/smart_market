import { StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import AuthNavigator from './AuthNavigator'
import useAuth from '../hooks/useAuth'
import { runAxiosAsync } from '../api/runAxiosAsync'
import { useDispatch } from 'react-redux'
import { updateAuthState } from '../store/auth'
import LoadingSpinner from '../ui/LoadingSpinner'
import TabNavigator from './TabNavigator'
import asyncStorage, { Keys } from '../utils/asycnStorage'
import useClient from '../hooks/useClient'
import { showMessage } from 'react-native-flash-message'


const Navigator = () => {
    const MyTheme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            background: "white"
        }
    }

    const { authClient } = useClient()
    const dispatch = useDispatch()
    const { loggedIn, authState } = useAuth();
    //Why don't we store loggedIn in asyncStorage because it causes the delay and show signIn screen
    const fetchAuthState = async () => {
        const token = await asyncStorage.get(Keys.ACCESS_TOKEN)
        // const token = await AsyncStorage.getItem("access-token")
        if (token) {
            dispatch(updateAuthState({ profile: null, pending: true }))
            const res = await runAxiosAsync(
                authClient.get("/auth/profile", {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                })
            )
            if (res.status) {
                dispatch(updateAuthState({ profile: { ...res.data, accessToken: token }, pending: false }))
            } else {
                showMessage({ message: res.data, type: 'danger' })
                dispatch(updateAuthState({ profile: null, pending: false }))
            }
        }
    }

    useEffect(() => {
        fetchAuthState()
    }, [])

    return (
        <NavigationContainer theme={MyTheme}>
            <LoadingSpinner visiable={authState.pending} />
            {!loggedIn ? <AuthNavigator /> : <TabNavigator />}
        </NavigationContainer>
    )
}

export default Navigator

const styles = StyleSheet.create({})