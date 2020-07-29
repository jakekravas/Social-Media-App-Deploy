import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
  CLEAR_PROFILE
} from "../actions/types";
import setAuthToken from "../utils/setAuthToken";
import { loadProfile } from "./profile";

export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/auth");

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });

    dispatch(loadProfile());
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    })
  }
};

export const register = (email, password, password2) => async dispatch => {
  try {
    const res = await axios.post("/api/users", {email, password, password2});

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL,
      payload: err.response.data.errors
    })
  }
};

export const login = (formData) => async dispatch => {
  try {
    const res = await axios.post("/api/auth", formData);
    
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    console.log(err.response.data);
    dispatch({
      type: LOGIN_FAIL,
      payload: err.response.data.errors
    })
  }
};

export const logout = () => async dispatch => {
    dispatch({ type: LOGOUT });
    dispatch({ type: CLEAR_PROFILE });
};