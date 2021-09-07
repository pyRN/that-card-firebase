import { combineReducers } from "redux";

//Individual Reducers
import userReducer from "./userReducer";

//Combine all reducers into the rootReducer
const rootReducer = combineReducers({
  oUserReducer: userReducer,
});

export default rootReducer;
