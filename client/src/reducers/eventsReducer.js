import {
  FETCH_EVENTS,
  UPDATE_EVENT,
  ADD_EVENT,
  DELETE_EVENT
} from "../actions/types";

export default function(state = [], action) {
  switch (action.type) {
    case ADD_EVENT:
      return [...state, action.payload];
    case UPDATE_EVENT:
    case FETCH_EVENTS:
    case DELETE_EVENT:
      return action.payload;
    default:
      return state;
  }
}
