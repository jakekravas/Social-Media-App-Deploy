import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  // token: null,
  isAuthenticated: null,
  user: null,
  profile: null,
  loading: true,
  errors: null
};

export default (state = initialState, dispatch) => {

  const { type, payload } = dispatch;

  switch (type) {
    
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        token: payload.token,
        isAuthenticated: true,
        loading: false,
        errors: null
      }
    case USER_LOADED:
      return {
        ...state,
        user: payload.user,
        isAuthenticated: true,
        loading: false
      }
    case AUTH_ERROR:
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: null,
        loading: false
      }
    case REGISTER_FAIL:
    case LOGIN_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: null,
        loading: false,
        errors: payload
      }
    default:
      return state;
  }
}