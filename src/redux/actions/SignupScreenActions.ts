import { Dispatch } from "react";
import { SIGNUP_SCREEN_AVATAR_UPDATE } from "../types"

export interface response {
    type: String,
    payload: any
}

export const signupPageAvatarUpdate = (avatar: number) => (dispatch: Dispatch<response>) => {
    dispatch({ type: SIGNUP_SCREEN_AVATAR_UPDATE, payload: avatar } as response);
}