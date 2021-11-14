import { User } from "../models/user";
import { SPLASH_SCREEN_GET_USER_INFO } from "../types"

interface SplashScreenState {
    user?: User,
    error: string,
    redirect: string,
}

const initialState: SplashScreenState = {
    error: "",
    redirect: "",
};


export default (state = initialState, action: any) => {
    switch (action.type) {
        case SPLASH_SCREEN_GET_USER_INFO:
            return {
                ...state,
                error: "",
                user: action.payload['data'] ?? undefined,
                redirect: action.payload['redirect'],
            };
        case SPLASH_SCREEN_GET_USER_INFO:
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
}
