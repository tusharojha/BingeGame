import AsyncStorage from "@react-native-async-storage/async-storage"
import React, { useEffect } from "react"
import { View, StyleSheet, Image } from "react-native"


export type Props = {
    navigation: any
}

const SplashScreen: React.FC<Props> = ({ navigation }) => {

    useEffect(() => {
        setTimeout(() => {
            AsyncStorage.getItem("user").then(user => {
                if (user == null) {
                    navigation.replace("SignupScreen")
                } else {
                    navigation.replace("HomeScreen")
                }
            });
        }, 2000)
    }, [])

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
