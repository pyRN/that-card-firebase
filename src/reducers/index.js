import { combineReducers } from "redux";

//Individual Reducers
import expansionsReducer from "./expansionsReducer";
import userReducer from "./userReducer";

//Combine all reducers into the rootReducer
const rootReducer = combineReducers({
  oExpansionsReducer: expansionsReducer,
  oUserReducer: userReducer,
});

export default rootReducer;
