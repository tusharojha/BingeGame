import React, { useEffect } from 'react';
import { View, Alert, SafeAreaView, StyleSheet, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import commons from '../commons';
import { homescreenListenLobby } from '../redux/actions/HomeScreenActions';
import { User } from '../redux/models/user';
import { ApplicationState } from '../redux/reducers/reducers';
import PlayerTile from './PlayerTile';

export type Props = {
    navigation: any,
}


const LobbyScreen: React.FC<Props> = ({ navigation }) => {
    const dispatch = useDispatch()
    const user: User = useSelector((state: ApplicationState) => state.SplashScreenReducer.user);
    const state = useSelector((state: ApplicationState) => state.HomeScreenReducer);

    useEffect(() => {
        dispatch(homescreenListenLobby(user.token));
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
            // setTimeout(() => {
            //     navigation.navigate("SplashScreen")
            // }, 1000)
        }
    }
    console.log(state.members)
    return <SafeAreaView style={styles.container}>
        <View style={styles.codeContainer}>
            <Text style={styles.gameCode}>{state.gameCode}</Text>
            <Text style={styles.caption}>YOUR 8 DIGIT GAME CODE</Text>
        </View>
        <View style={styles.playersList}>
            {state.members.map((member: any) => <PlayerTile key={member.id} member={member} />)}
        </View>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    caption: {
        fontSize: 18,
    },
    codeContainer: {
        flexDirection: "column",
        margin: 20,
    },
    gameCode: {
        fontSize: 32,
        letterSpacing: 2,
        color: commons.accentColor,
        fontWeight: "bold",
    },
    playersList: {
        flex: 1,
    }
})

export default LobbyScreen;
