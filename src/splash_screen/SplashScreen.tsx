import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import React, { useEffect } from "react"
import { View, StyleSheet, Image } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import config from "../../config"
import { splashScreenGetUserInfo } from "../redux/actions/SplashScreenActions"
import { ApplicationState } from "../redux/reducers/reducers"


export type Props = {
    navigation: any
}

const SplashScreen: React.FC<Props> = ({ navigation }) => {

    const { redirect, error } = useSelector((state: ApplicationState) => state.SplashScreenReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(splashScreenGetUserInfo())
    }, [])

    if (redirect !== '') {
        setTimeout(() => {
            navigation.replace(redirect);
        }, 1000)
    }

    return <View style={styles.container}>
        <View >
            <Image source={require("../assets/logo.png")} style={styles.logoContainer} />
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff"
    },
    logoContainer: {
        width: 300,
        resizeMode: 'contain'
    }
})

export default SplashScreen
