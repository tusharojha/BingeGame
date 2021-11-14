import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Dispatch } from "react";

import config from "../../../config";
import { User } from "../models/user";
import { SPLASH_SCREEN_GET_USER_INFO, SPLASH_SCREEN_ERROR_UPDATE } from "../types"

export interface response {
    type: String,
    payload: any
}

export const splashScreenGetUserInfo = () => (dispatch: Dispatch<response>) => {
    AsyncStorage.getItem("user").then(user => {
        if (user == null) {
            dispatch({ type: SPLASH_SCREEN_GET_USER_INFO, payload: {redirect: 'SignupScreen'} } as response);
        } else {
            axios.get(config.baseURL + '/user', { headers: { 'x-auth': user.toString() } })
                .then(res => {
                    if (res.status == 201) {
                        const userData: User = {
                            avatar: res.data['avatar'],
                            name: res.data['name'],
                            bingeStars: res.data['bingeStars'],
                            token: user.toString()
                        }
                        dispatch({ type: SPLASH_SCREEN_GET_USER_INFO, payload: { redirect: 'HomeScreen', data: userData } } as response);
                    } else {
                        dispatch({ type: SPLASH_SCREEN_GET_USER_INFO, payload: { redirect: 'SignupScreen' } } as response);
                    }
                })
                .catch(err => {
                    console.log('SPLASH_SCREEN_ERROR', err.message)
                    dispatch({ type: SPLASH_SCREEN_ERROR_UPDATE, payload: err.message } as response);
                })
        }
    }).catch(err => {
        console.log('SPLASH_SCREEN_ERROR', err.message)
        dispatch({ type: SPLASH_SCREEN_ERROR_UPDATE, payload: err.message } as response);
    });
}
