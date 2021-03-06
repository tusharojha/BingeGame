const emits = {
    CREATE_ROOM: "create room",
    CONNECT_GAME: "connect game",
    JOIN_ROOM: "join room",
    START_GAME: "start game",
    NEXT_MOVE: "next move",
    SKIP_MOVE: "skip move",
};

const listenrs = {
    MEMBER_LEFT: "member left",
    MEMBER_JOINED: "member joined",
    YOU_ARE_HOST: "you are host",
    GAME_STARTED: "game started",
    BOARD_SET_TIMEOUT: "board set timeout",
    FIRST_MOVE: "first move",
    YOUR_MOVE: "your move",
    CROSS_NUMBER: "cross number",
    WINNER_ANOUNCE: "winner anounce",
};

export { listenrs, emits };