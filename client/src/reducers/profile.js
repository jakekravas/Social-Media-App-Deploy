import {
  LOADING_TRUE,
  GET_PROFILE,
  GET_PROFILE_TO_VIEW,
  GET_PROFILES,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  UPDATE_ERROR,
  CLEAR_PROFILE
} from "../actions/types";

const initialState = {
  profiles: null,
  profile: null,
  profileToView: null,
  errors: null,
  // loading: true
  loading: false
};

export default (state = initialState, dispatch) => {

  const { type, payload } = dispatch;

  switch (type) {
    case LOADING_TRUE:
      return {
        ...state,
        loading: true
      }
    case GET_PROFILE:
      return {
        ...state,
        profile: payload.profile,
        loading: false
      }
    case GET_PROFILE_TO_VIEW:
      console.log("RDCR: " + payload);
      return {
        ...state,
        profileToView: payload.profile,
        loading: false
      }
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload.profiles,
        loading: false
      }
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload.profile,
        errors: null,
        loading: false
      }
    case PROFILE_ERROR:
      return {
        ...state,
        profile: null,
        errors: payload,
        loading: true
      }
    case UPDATE_ERROR:
      return {
        ...state,
        errors: payload,
        loading: false
      }
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        errors: null,
        loading: true
      }
    default:
      return state;
  }
}