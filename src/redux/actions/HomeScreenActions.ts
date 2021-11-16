import { Dispatch } from "react";
import { io } from "socket.io-client"

import config from "../../../config";
import { emits } from "../socketEvents"
import { HOME_SCREEN_CONNECT_SOCKETS, HOME_SCREEN_ERROR_UPDATE } from "../types";

export interface response {
    type: String,
    payload: any
}

const socket = io(config.baseURL, {
    transports: ['websocket'],
});


export const homescreenConnectSockets = () => (dispatch: Dispatch<response>) => {
    console.log("homescreenConnectSockets");

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
}

export const homescreenCreateGame = (token: string) => (dispatch: Dispatch<response>) => {
    console.log("homescreenCreateGame");
    socket.emit(emits.CREATE_ROOM, {
        token: token,
    }, (data: any) => {
        console.log(typeof data, data);
    });
}
