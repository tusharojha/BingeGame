import { SIGNUP_SCREEN_AVATAR_UPDATE, SIGNUP_SCREEN_STATUS_UPDATE, SIGNUP_SCREEN_ERROR_UPDATE, SIGNUP_SCREEN_USERNAME_UPDATE } from "../types"

interface SignupState {
    avatar: number,
    username: string,
    error: string,
    status: boolean
}

const initialState: SignupState = {
    avatar: -1,
    username: "",
    error: "",
    status: false,
};


export default (state = initialState, action: any) => {
    switch (action.type) {
        case SIGNUP_SCREEN_AVATAR_UPDATE:
            return {
                ...state,
                error: "",
                avatar: action.payload
            };
        case SIGNUP_SCREEN_USERNAME_UPDATE:
            return {
                ...state,
                error: "",
                username: action.payload
            };
        case SIGNUP_SCREEN_ERROR_UPDATE:
            return {
                ...state,
                error: action.payload,
            };
        case SIGNUP_SCREEN_STATUS_UPDATE:
            return {
                ...state,
                status: action.payload,
            };
        default:
            return state;
    }
}
