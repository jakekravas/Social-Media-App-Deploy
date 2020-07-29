import axios from "axios";
import {
  LOADING_TRUE,
  GET_PROFILE,
  GET_PROFILES,
  UPDATE_PROFILE,
  PROFILE_ERROR,
  UPDATE_ERROR,
  GET_PROFILE_TO_VIEW
} from "../actions/types";

export const loadProfile = () => async dispatch => {
  try {
    const res = await axios.get("/api/profile/me");
    console.log(res);
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR
    });
  }
}

export const createProfile = (name, username, bio, avatar, cover) => async dispatch => {
  try {
    const res = await axios.post("/api/profile/", {name, username, bio, avatar, cover});

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: err.response.data.errors
    });
  }
}

export const updateProfile = (name, username, bio, avatar, cover) => async dispatch => {
  try {
    const res = await axios.post("/api/profile/", {name, username, bio, avatar, cover});

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: UPDATE_ERROR,
      payload: err.response.data.errors
    });
  }
}

export const getAllProfiles = () => async dispatch => {
  try {
    const res = await axios.get("/api/profile/");

    console.log(res.data);

    dispatch({
      type: GET_PROFILES,
      payload: res.data
    });
  } catch (err) {

    dispatch({
      type: PROFILE_ERROR,
      payload: err.response.data
    });
  }
}

export const getProfileByUsername = username => async dispatch => {
  try {
    // dispatch({
    //   type: LOADING_TRUE
    // });
    const res = await axios.get(`/api/profile/un/${username}`);
    console.log(res.data);
    dispatch({
      type: GET_PROFILE_TO_VIEW,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: err.response
    });
  }
}
export const getProfileById = id => async dispatch => {
  try {
    // dispatch({
    //   type: LOADING_TRUE
    // });

    const res = await axios.get(`/api/profile/${id}`);
    console.log(res.data);
    dispatch({
      type: GET_PROFILE_TO_VIEW,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: err.response.data
    });
  }
}

export const toggleFollow = id => async dispatch => {
  try {
    const res = await axios.post(`/api/profile/follow/${id}`);
    console.log(res);
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: err.response.data
    });
  }
}