import { combineReducers } from "redux"
import SignupScreenReducer from "./SignupScreenReducer"
import SplashScreenReducer from "./SplashScreenReducer";
import HomeScreenReducer from "./HomeScreenReducer";

const rootReducer = combineReducers({
    SplashScreenReducer,
    SignupScreenReducer,
    HomeScreenReducer,
})

export type ApplicationState = ReturnType<typeof rootReducer>;

export { rootReducer };
