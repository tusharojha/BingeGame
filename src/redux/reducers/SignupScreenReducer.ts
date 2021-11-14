import { SIGNUP_SCREEN_AVATAR_UPDATE } from "../types"

interface SignupState {
    avatar: number
}

const initialState: SignupState = {
    avatar: -1
};


export default (state = initialState, action: any) => {
    switch (action.type) {
        case SIGNUP_SCREEN_AVATAR_UPDATE:
            return {
                ...state,
                avatar: action.payload
            };
        default:
            return state;
    }
}
