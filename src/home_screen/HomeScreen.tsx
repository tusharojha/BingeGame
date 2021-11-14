import AsyncStorage from "@react-native-async-storage/async-storage"
import React, { useEffect } from "react"
import { View, Text } from "react-native"

export type Props = {
    navigation: any
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {

    const [token, setToken] = React.useState("")

    useEffect(() => {
        AsyncStorage.getItem("user").then(token => {
            if (token != null) {
                setToken(token.toString())
            }
        })
    }, [])

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>{token}</Text>
        </View>
    )
}

export default HomeScreen

