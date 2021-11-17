import { Dispatch } from "react";
import { io } from "socket.io-client"

import config from "../../../config";
import { GameCreatedResponse, JoinRoomResponse, MemberJoinedResponse, SocketResponse } from "../models/game";
import { emits, listenrs } from "../socketEvents"
import { HOME_SCREEN_CONNECT_SOCKETS, HOME_SCREEN_ERROR_UPDATE, HOME_SCREEN_GAME_CREATED, HOME_SCREEN_GAME_JOINED, HOME_SCREEN_MEMBER_JOINED } from "../types";

export interface response {
    type: String,
    payload: any
}

const socket = io(config.baseURL, {
    transports: ['websocket'],
});


export const homescreenConnectSockets = () => (dispatch: Dispatch<response>) => {
    socket.on('connect', () => {
        console.log('connected with server')
        dispatch({ type: HOME_SCREEN_CONNECT_SOCKETS, payload: true } as response);
    });
    socket.on("connect_error", (e) => {
        console.log('unable to connect with sockets')
        dispatch({ type: HOME_SCREEN_ERROR_UPDATE, payload: 'Unable to connect with server.' })
    });
    socket.io.on("reconnect_attempt", (e) => {
        console.log('reconnecting to sockets')
        dispatch({ type: HOME_SCREEN_ERROR_UPDATE, payload: 'Trying to reconnect with server.' })
    });
    socket.on('disconnect', () => {
        console.log('disconnected from sockets')
        dispatch({ type: HOME_SCREEN_ERROR_UPDATE, payload: 'Disconnected from server.' })
    })
}

export const homescreenCreateGame = (token: string) => (dispatch: Dispatch<response>) => {
    socket.emit(emits.CREATE_ROOM, {
        token: token,
    }, (data: any) => {
        const response = <SocketResponse>data;
        if (response.status === 201) {
            console.log('game created');
            const game = <GameCreatedResponse>response;
            dispatch({ type: HOME_SCREEN_GAME_CREATED, payload: { gameCode: game.data.roomName, gameCreatedBy: game.data.user } } as response);
        } else {
            console.log(HOME_SCREEN_ERROR_UPDATE, response);
            dispatch({ type: HOME_SCREEN_ERROR_UPDATE, payload: response.message } as response);
        }
    });
}

export const homescreenListenLobby = (token: string) => (dispatch: Dispatch<response>) => {
    socket.on(listenrs.MEMBER_JOINED, (data: any) => {
        const response = <SocketResponse>data;
        if (response.status == 200) {
            const gameResponse = <MemberJoinedResponse>response;
            dispatch({ type: HOME_SCREEN_MEMBER_JOINED, payload: { message: gameResponse.message, user: gameResponse.user } } as response);
        } else {
            console.log(HOME_SCREEN_ERROR_UPDATE, response);
            dispatch({ type: HOME_SCREEN_ERROR_UPDATE, payload: response.message } as response);
        }
    });
}

export const homescreenJoinRoom = (token: string, roomCode: string) => (dispatch: Dispatch<response>) => {
    socket.emit(emits.JOIN_ROOM, {
        token: token,
        roomName: roomCode
    }, (data: any) => {
        const response = <SocketResponse>data
        if (response.status === 200) {
            const game = <JoinRoomResponse>response;
            dispatch({ type: HOME_SCREEN_GAME_JOINED, payload: { members: game.users, self: game.self, gameCode: roomCode } } as response);
        } else {
            console.log(HOME_SCREEN_ERROR_UPDATE, response);
            dispatch({ type: HOME_SCREEN_ERROR_UPDATE, payload: response.message } as response);
        }
    })
}
