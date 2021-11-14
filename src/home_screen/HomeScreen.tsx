import React from "react"
import { View, Text } from "react-native"

export type Props = {
    navigation: any
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {

    return (
        <View>
            <Text>Home Screen</Text>
        </View>
    )
}

export default HomeScreen

