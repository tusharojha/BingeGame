import React, { useState } from "react"
import { Text, Dimensions, View, KeyboardAvoidingView, StyleSheet, SafeAreaView, Button } from "react-native"
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";

import commons from "../commons";
import { ApplicationState } from "../redux/reducers/reducers";
import { homescreenJoinRoom } from "../redux/actions/HomeScreenActions";

export type Props = {
    navigation: any
}

const windowWidth = Dimensions.get("window").width;

const JoinGameScreen: React.FC<Props> = ({ navigation }) => {

    const dispatch = useDispatch();
    const user = useSelector((state: ApplicationState) => state.SplashScreenReducer).user;
    const state = useSelector((state: ApplicationState) => state.HomeScreenReducer);
    const [error, setError] = useState("");
    const [roomCode, setRoomCode] = useState("");

    const joinRoom = () => {
        if (roomCode.length === 0) {
            setError("Please enter a game code");
            return;
        }
        if (roomCode.length < 8) {
            setError("Game code must be at least 8 characters");
            return;
        }
        dispatch(homescreenJoinRoom(user.token, roomCode));
    }

    if (state.gameCode !== undefined) {
        setTimeout(() => {
            navigation.replace("LobbyScreen")
        }, 1000)
    }

    return <SafeAreaView style={styles.container}>
        <View style={styles.backButton}>
            <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
                <Text style={styles.option}>Go Back</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.joinMenu}>
            <TextInput value={roomCode} onChangeText={(val) => setRoomCode(val)} maxLength={8} style={styles.textField} placeholder="Enter 8 digit Game Code" />
            <Text style={styles.error} > {error} </Text>
            <Button color={commons.accentColor} title="Join Game" onPress={() => joinRoom()} />
        </View>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backButton: {
        width: windowWidth - 40,
        margin: 20,
    },
    error: {
        color: "red",
        overflow: "hidden",
        fontWeight: "bold",
    },
    option: {
        fontSize: 20,
    },
    joinMenu: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    textField: {
        borderBottomColor: commons.accentColor,
        borderBottomWidth: 2,
        width: windowWidth * 0.6,
        margin: 20,
        fontSize: 18,
        textAlign: "center",
        padding: 5,
    }
})

export default JoinGameScreen
