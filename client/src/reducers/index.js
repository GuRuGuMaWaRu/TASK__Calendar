import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorsReducer from "./errorsReducer";
import eventsReducer from "./eventsReducer";
import formReducer from "./formReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorsReducer,
  form: formReducer,
  events: eventsReducer
});
