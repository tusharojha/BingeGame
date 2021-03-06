import React, { useEffect } from "react"
import { Alert, View, StyleSheet, Image, Text, SafeAreaView, Dimensions, TouchableNativeFeedback } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { homescreenConnectSockets, homescreenCreateGame } from "../redux/actions/HomeScreenActions"

import { User } from "../redux/models/user"
import { ApplicationState } from "../redux/reducers/reducers"

const windowWidth = Dimensions.get('window').width

export type Props = {
    navigation: any
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {

    const dispatch = useDispatch()
    const user: User = useSelector((state: ApplicationState) => state.SplashScreenReducer.user);
    const state = useSelector((state: ApplicationState) => state.HomeScreenReducer);

    useEffect(() => {
        dispatch(homescreenConnectSockets())
    }, [])

    if (state.error) {
        Alert.alert(
            "Error",
            state.error,
            [
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
        )

        if (state.error === "Disconnected from server.") {
            setTimeout(() => {
                // navigation.navigate("SplashScreen")
            }, 1000)
        }
    }

    if (state.gameCode !== undefined) {
        setTimeout(() => {
            navigation.replace("LobbyScreen")
        }, 1000)
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Image style={styles.avatar} source={require("../assets/avatars/2.png")} />
                <View style={styles.details}>
                    <Text style={styles.text}>{user.name}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        {[
                            ...Array(user.bingeStars),
                        ].map((value: undefined, index: number) => (
                            <Image key={index} style={styles.star} source={require("../assets/images/star.png")} />
                        ))}</View>
                </View>
            </View>
            <Image source={require("../assets/logo.png")} style={{
                resizeMode: 'contain', width: 300, height: 300, flex: 1,
            }} />
            <View style={styles.buttonContainer}>
                <TouchableNativeFeedback onPress={() => dispatch(homescreenCreateGame(user.token))}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Create Game</Text>
                    </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback onPress={() => { navigation.replace('JoinGameScreen') }}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Join Game</Text>
                    </View>
                </TouchableNativeFeedback>

            </View>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    header: {
        width: windowWidth - 20,
        marginLeft: 20,
        marginVertical: 20,
        flexDirection: "row",
        alignItems: "center",
    },
    avatar: {
        width: 80,
        height: 80,
    },
    star: {
        width: 30,
        height: 30,
    },
    details: {
        flex: 1,
        marginLeft: 20,
    },
    text: {
        fontSize: 20,
        color: "#fff",
        backgroundColor: "grey",
        textAlign: "center",
    },
    buttonContainer: {
        flexDirection: "row",
        marginBottom: 10,
    },
    button: {
        height: windowWidth / 3,
        width: windowWidth / 3,
        backgroundColor: "red",
        margin: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 20,
        textAlign: "center",
    }
})

export default HomeScreen

