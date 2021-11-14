import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Dispatch } from "react";

import config from "../../../config";
import { SIGNUP_SCREEN_AVATAR_UPDATE, SIGNUP_SCREEN_STATUS_UPDATE, SIGNUP_SCREEN_USERNAME_UPDATE, SIGNUP_SCREEN_ERROR_UPDATE } from "../types"

export interface response {
    type: String,
    payload: any
}

export const signupPageAvatarUpdate = (avatar: number) => (dispatch: Dispatch<response>) => {
    dispatch({ type: SIGNUP_SCREEN_AVATAR_UPDATE, payload: avatar } as response);
}

export const signupPageUsernameUpdate = (name: string) => (dispatch: Dispatch<response>) => {
    dispatch({ type: SIGNUP_SCREEN_USERNAME_UPDATE, payload: name } as response);
}

export const signupPageSubmit = (name: string, avatar: number) => (dispatch: Dispatch<response>) => {
    if (avatar === -1) {
        console.log('SIGNUP_SCREEN_ERROR', 'Please select an avatar');
        return dispatch({ type: SIGNUP_SCREEN_ERROR_UPDATE, payload: 'Please select an alter ego' } as response);
    }
    if (name.length < 4) {
        console.log('SIGNUP_SCREEN_ERROR', 'Username must be at least 4 characters');
        return dispatch({ type: SIGNUP_SCREEN_ERROR_UPDATE, payload: 'Username must be at least 4 characters' } as response);
    }
    console.log(config.baseURL + '/')
    axios.post(config.baseURL + '/user', {
        name: name,
        avatar: avatar + 1,
        fcmToken: '',
        token: config.tokenRoute.toString()
    })
        .then(res => {
            console.log('JWT Token', res.headers['x-auth']);
            AsyncStorage.setItem('user', res.headers['x-auth']);
            dispatch({ type: SIGNUP_SCREEN_STATUS_UPDATE, payload: true } as response);
        })
        .catch(err => {
            console.log('SIGNUP_SCREEN_ERROR', err.message);
            dispatch({ type: SIGNUP_SCREEN_ERROR_UPDATE, payload: err.message } as response);
        });
}