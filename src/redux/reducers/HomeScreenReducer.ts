import { HOME_SCREEN_CONNECT_SOCKETS, HOME_SCREEN_ERROR_UPDATE, HOME_SCREEN_GAME_CREATED, HOME_SCREEN_GAME_JOINED, HOME_SCREEN_MEMBER_JOINED } from "../types"

export interface HomeScreenState {
    socketsConnected: boolean,
    error: string,
    gameCode?: string,
    self?: {
        name: string,
        avatar: number,
        id: string
    },
    members: {
        id: string,
        name: string,
        avatar: number
    }[]
}

const initialState: HomeScreenState = {
    socketsConnected: false,
    error: "",
    members: []
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
        case HOME_SCREEN_GAME_CREATED:
            return {
                ...state,
                socketsConnected: true,
                error: "",
                gameCode: action.payload.gameCode,
                self: action.payload.gameCreatedBy,
                members: [action.payload.gameCreatedBy],
            }
        case HOME_SCREEN_MEMBER_JOINED:
            return {
                ...state,
                members: [...state.members, action.payload.user]
            }
        case HOME_SCREEN_GAME_JOINED:
            return {
                ...state,
                self: action.payload.self,
                members: action.payload.members,
                gameCode: action.payload.gameCode
            }
        default:
            return state;
    }
}
