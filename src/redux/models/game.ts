export interface SocketResponse {
    status: number,
    message: string,
    data?: any
}

export interface GameCreatedResponse extends SocketResponse {
    data: {
        roomName: string,
        user: {
            id: string,
            name: string,
            avatar: number,
        },
    }
}

export interface MemberJoinedResponse extends SocketResponse {
    user: {
        id: string,
        name: string,
        avatar: number,
    }
}

export interface JoinRoomResponse extends SocketResponse {
    self: {
        id: string,
        name: string,
        avatar: number,
    },
    users: {
        id: string,
        name: string,
        avatar: number,
    }[]
}
