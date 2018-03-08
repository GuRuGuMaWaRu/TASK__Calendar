import axios from "axios";
import {
  FETCH_USER,
  FETCH_EVENTS,
  UPDATE_EVENT,
  ADD_EVENT,
  DELETE_EVENT,
  UPDATE_FORM,
  CLEAR_FORM,
  FILL_FORM,
  SHOW_ERRORS,
  CLEAR_ERRORS
} from "./types";
import { getStartAndDuration } from "../utils/layoutHelpers";

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const addEvent = () => async (dispatch, getState) => {
  const event = getState().form;
  const updatedEvent = { ...event, ...getStartAndDuration(event) };
  const res = await axios.post("/api/event/add", updatedEvent);

  dispatch({ type: ADD_EVENT, payload: res.data });
};

export const updateEvent = () => async (dispatch, getState) => {
  const event = getState().form;
  const updatedEvent = { ...event, ...getStartAndDuration(event) };
  await axios.post("/api/event/update", updatedEvent);
  const res = await axios.get("/api/events");

  dispatch({ type: UPDATE_EVENT, payload: res.data });
};

export const deleteEvent = id => async (dispatch, getState) => {
  const event = getState().form;
  await axios.post("/api/event/delete", event);
  const res = await axios.get("/api/events");

  dispatch({ type: DELETE_EVENT, payload: res.data });
};

export const fetchEvents = () => async dispatch => {
  const res = await axios.get("/api/events");

  dispatch({ type: FETCH_EVENTS, payload: res.data });
};

export const fetchEvent = id => async dispatch => {
  const res = await axios.post("/api/event", { id: id });

  dispatch({
    type: FILL_FORM,
    payload: {
      id: res.data[0]._id,
      title: res.data[0].title,
      fromTime: res.data[0].fromTime,
      tillTime: res.data[0].tillTime
    }
  });
};

export const updateForm = (field, value) => ({
  type: UPDATE_FORM,
  payload: {
    field,
    value
  }
});

export const clearForm = () => ({
  type: CLEAR_FORM
});

export const showErrors = errors => ({
  type: SHOW_ERRORS,
  payload: errors
});

export const clearErrors = errors => ({
  type: CLEAR_ERRORS
});
