import { combineReducers } from "redux"
import SignupScreenReducer from "./SignupScreenReducer"

const rootReducer = combineReducers({
    SignupScreenReducer,
})

export type ApplicationState = ReturnType<typeof rootReducer>;

export { rootReducer };
