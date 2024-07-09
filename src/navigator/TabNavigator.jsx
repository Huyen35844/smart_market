import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import AppNavigator from './AppNavigator';
import ProfileNavigator from './ProfileNavigator';
import Add from '../views/Add';


const Tab = createBottomTabNavigator()

// "require" cannot accept dynamic parameter
const IconTab = (source) => {
    return <Image source={source} style={{ width: 25, height: 25 }} />;
};


const tabBarIcon = (route, focused) => {
    switch (route.name) {
        case "HomeNavigator":
            return focused ? IconTab(require('../../assets/icons/icon_home_selected.png')) : IconTab(require('../../assets/icons/icon_home.png'));
        case "AddNavigator":
            return focused ? IconTab(require('../../assets/icons/icon_add_selected.png')) : IconTab(require('../../assets/icons/icon_add.png'));
        case "ProfileNavigator":
            return focused ? IconTab(require('../../assets/icons/icon_person_selected.png')) : IconTab(require('../../assets/icons/icon_person.png'));
        default:
            return null;
    }
};


//route is a param of screenOptions, focused is a param of tabBarIcon, return ()
const screenOptions = ({ route }) => ({
    headerShown: false,
    tabBarIcon: ({ focused }) => tabBarIcon(route, focused),
    tabBarLabel: (route) => route.name
})


const TabNavigator = () => {
    return (
        <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen name='HomeNavigator' component={AppNavigator} />
            <Tab.Screen name='AddNavigator' component={Add} />
            <Tab.Screen name='ProfileNavigator' component={ProfileNavigator} />
        </Tab.Navigator>
    )
}

export default TabNavigator

const styles = StyleSheet.create({})