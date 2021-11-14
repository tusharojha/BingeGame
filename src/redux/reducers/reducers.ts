import { combineReducers } from "redux"
import SignupScreenReducer from "./SignupScreenReducer"
import SplashScreenReducer from "./SplashScreenReducer";

const rootReducer = combineReducers({
    SplashScreenReducer,
    SignupScreenReducer,
})

export type ApplicationState = ReturnType<typeof rootReducer>;

export { rootReducer };
