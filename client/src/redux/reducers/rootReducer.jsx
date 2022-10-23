import { combineReducers } from "redux";
// reducers
import authReducer from "./auth/auth.reducer";

const rootReducer = combineReducers({ authReducer });

export default rootReducer;
