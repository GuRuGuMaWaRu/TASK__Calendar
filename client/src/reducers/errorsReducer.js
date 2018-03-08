import { SHOW_ERRORS, CLEAR_ERRORS } from "../actions/types";

const INIT = {
  title: "",
  fromTime: "",
  tillTime: ""
};

const errorsReducer = (state = INIT, action) => {
  switch (action.type) {
    case SHOW_ERRORS:
      return {
        ...state,
        ...action.payload
      };
    case CLEAR_ERRORS:
      return {
        title: "",
        fromTime: "",
        tillTime: ""
      };
    default:
      return state;
  }
};

export default errorsReducer;
