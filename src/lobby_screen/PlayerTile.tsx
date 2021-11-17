import React from 'react';
import { View, StyleSheet, Dimensions, Image, Text } from 'react-native';
import { useSelector } from 'react-redux';
import commons from '../commons';
import { User } from '../redux/models/user';
import { ApplicationState } from '../redux/reducers/reducers';

const windowWidth = Dimensions.get('window').width;

export type Props = {
    member: {
        avatar: number,
        name: string,
        id: string,
    }
}

const PlayerTile: React.FC<Props> = ({ member }) => {

    // List of available avatar images
    const avatars = [require('../assets/avatars/1.png'),
    require('../assets/avatars/2.png'),
    require('../assets/avatars/3.png'),
    require('../assets/avatars/4.png'),
    require('../assets/avatars/5.png'),
    require('../assets/avatars/6.png')];

    return <View style={styles.container}>
        <View style={styles.avatar}>
            <Image style={styles.image} source={avatars[member.avatar - 1]} />
        </View>
        <View style={styles.nameContainer}>
            <Text style={styles.name}> {member.name} </Text>
            <View style={styles.starContainer}>
                {[
                    ...Array(Math.floor(Math.random() * (5 - 1 + 1) + 1)),
                ].map((value: undefined, index: number) =>
                    <Image key={index} style={styles.star} source={require("../assets/images/star.png")} />)}
            </View>
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        width: windowWidth - 30,
        margin: 15,
        backgroundColor: commons.accentColor,
        height: 120,
        borderRadius: 20,
        flexDirection: 'row',
    },
    avatar: {
        flex: 1,
        justifyContent: "center",
    },
    image: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
        margin: 20,
    },
    nameContainer: {
        flex: 2,
        justifyContent: "center",
    },
    name: {
        fontSize: 22,
        color: 'white',
        overflow: 'hidden'
    },
    star: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
        shadowColor: 'yellow',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 10,
        shadowOpacity: 1,
    },
    starContainer: {
        flexDirection: 'row',
    }
})

export default PlayerTile
