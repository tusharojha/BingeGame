import React, { useState } from "react"
import { View, TextInput, StyleSheet, SafeAreaView, Image, Dimensions, Text, TouchableNativeFeedback } from "react-native"
import { FlatList } from "react-native-gesture-handler"
import { useSelector, useDispatch } from "react-redux"

import commons from "../commons"
import { signupPageAvatarUpdate } from "../redux/actions/SignupScreenActions"
import { ApplicationState } from "../redux/reducers/reducers"

const windowWidth = Dimensions.get("window").width;

export type Props = {
    navigation: any
}

const SignupScreen: React.FC<Props> = ({ navigation }) => {

    const dispatch = useDispatch()
    const { avatar } = useSelector((state: ApplicationState) => state.SignupScreenReducer)

    // List of available avatar images
    const avatars = [require('../assets/avatars/1.png'),
    require('../assets/avatars/2.png'),
    require('../assets/avatars/3.png'),
    require('../assets/avatars/4.png'),
    require('../assets/avatars/5.png'),
    require('../assets/avatars/6.png')];

    return <SafeAreaView style={styles.container}>
        <View >
            <Image source={require("../assets/images/welcome_title.png")} style={styles.logoContainer} />
        </View>
        <View style={styles.heading}>
            <Text style={styles.text}>
                SELECT YOUR
            </Text>
            <Text style={{ ...styles.highlight, ...styles.text }}>
                ALTER EGO
            </Text>
        </View>

        <View style={styles.avatarsContainer}>
            <FlatList
                data={avatars}
                renderItem={(item) => {
                    return <TouchableNativeFeedback onPress={() => dispatch(signupPageAvatarUpdate(item.index))}>
                        <View style={avatar == item.index ? { ...styles.avatarTile, ...styles.avatarBorder } : styles.avatarTile}>
                            <Image source={item.item} style={styles.avatar} />
                        </View>
                    </TouchableNativeFeedback>
                }}
                keyExtractor={(item, index) => index.toString()}
                numColumns={3}
            />
        </View>
        <View style={{ flex: 1, marginTop: 30 }}>
            <View style={styles.nameContainer}>
                <Text style={[styles.text, { marginTop: 2 }]}> USERNAME </Text>
                <TextInput style={styles.input} autoCorrect={false} spellCheck={false} maxLength={10} placeholder="What's your gaming name?" />
            </View>
        </View>
        <View style={{ margin: 20 }}>
            <TouchableNativeFeedback onPress={() => navigation.navigate("SplashScreen")}>
                <Text style={styles.text}>Register</Text>
            </TouchableNativeFeedback>
        </View>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#fff"
    },
    logoContainer: {
        width: windowWidth,
        resizeMode: 'contain'
    },
    text: {
        fontSize: 18,
    },
    heading: {
        marginTop: 10,
        flexDirection: "row",
    },
    highlight: {
        color: commons.accentColor,
        marginLeft: 5,
        fontWeight: "bold"
    },
    avatarsContainer: {
        marginTop: 30,
        flex: 1,
    },
    avatar: {
        height: windowWidth / 4,
        width: windowWidth / 4,
    },
    avatarTile: {
        padding: 5,
        margin: 5,
        borderWidth: 1,
        borderColor: "#fff",
        borderRadius: 10,
    },
    avatarBorder: {
        borderWidth: 1,
        borderColor: commons.accentColor,
        borderRadius: 10,
    },
    nameContainer: {
        width: windowWidth - 40,
        marginHorizontal: 20,
        flexDirection: "row",
    },
    input: {
        flex: 1,
        borderColor: commons.accentColor,
        borderBottomWidth: 2,
        padding: 3,
    }
})

export default SignupScreen
