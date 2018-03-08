import { UPDATE_FORM, CLEAR_FORM, FILL_FORM } from "../actions/types";

const INITIAL = {
  id: "",
  title: "",
  fromTime: "",
  tillTime: ""
};

export default function(state = INITIAL, action) {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_FORM:
      return { ...state, [payload.field]: payload.value };
    case CLEAR_FORM:
      return INITIAL;
    case FILL_FORM:
      console.log(payload);
      return payload;
    default:
      return state;
  }
}
