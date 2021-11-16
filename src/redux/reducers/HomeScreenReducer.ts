import { HOME_SCREEN_CONNECT_SOCKETS, HOME_SCREEN_ERROR_UPDATE } from "../types"

export interface HomeScreenState {
    socketsConnected: boolean,
    error: string,
}

const initialState: HomeScreenState = {
    socketsConnected: false,
    error: ""
}

export default (state = initialState, action: any) => {
    switch (action.type) {
        case HOME_SCREEN_CONNECT_SOCKETS:
            return {
                ...state,
                socketsConnected: action.payload
            }
        case HOME_SCREEN_ERROR_UPDATE:
            return {
                ...state,
                error: action.payload,
                socketsConnected: false
            }
        default:
            return state;
    }
}
