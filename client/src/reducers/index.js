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

/*

TODOs:

1. Display error messages
2. Prevent Add, Edit event if there are errors
3. Create Calendar layout
4. Figure out how to display many different events

*/
