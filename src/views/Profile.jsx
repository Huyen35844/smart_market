import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import AvatarView from '../ui/AvatarView'
import useAuth from '../hooks/useAuth'
import size from '../utils/size'
import ProfileOptionListItem from '../component/ProfileOptionListItem'
import { useNavigation } from '@react-navigation/native'

const Profile = () => {
    const { authState, signOut } = useAuth()
    const { profile } = authState
    const [active, setActive] = useState(false)
    const { navigate } = useNavigation()
    const onMessagePress = () => {
        navigate('Chat')
    }
    const onListingPress = () => {
        navigate('Listing')
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.profileContainer}>
                <AvatarView uri={profile?.avatar} size={80} />

                <View style={styles.profileInfo}>
                    <Text style={styles.name}>{profile?.name}</Text>
                    <Text style={styles.email}>{profile?.email}</Text>
                </View>
            </View>

            <ProfileOptionListItem onPress={onMessagePress} title={'Message'} style={[styles.marginBottom, { marginTop: 25 }]} iconPath={active ? require("../../assets/icons/icon_message_selected.png") : require("../../assets/icons/icon_message.png")} />
            <ProfileOptionListItem onPress={onListingPress} title={'Your Listings'} style={styles.marginBottom} iconPath={require("../../assets/icons/icon_list.png")} />
            <ProfileOptionListItem onPress={signOut} title={'Log Out'} style={styles.marginBottom} iconPath={require("../../assets/icons/icon_log_out.png")} />
        </ScrollView>
    )
}

export default Profile

const styles = StyleSheet.create({
    marginBottom: {
        marginBottom: 10
    },
    profileInfo: {
        flex: 1,
        paddingLeft: size.padding
    },
    profileContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    name: {
        color: "black",
        fontSize: 20,
        fontWeight: "bold"
    },
    email: {
        color: "black",
        paddingTop: 2
    },
    container: {
        padding: size.padding
    }
})