import {
  LOADING_TRUE,
  CREATE_POST,
  DELETE_POST,
  GET_LOGGED_IN_POSTS,
  GET_POSTS_TO_VIEW,
  GET_POSTS_OF_FOLLOWING,
  POST_ERROR
} from "../actions/types";

const initialState = {
  posts: null,
  postsToView: null,
  postsOfFollowing: null,
  loading: true
};

export default (state = initialState, dispatch) => {

  const { type, payload } = dispatch;

  switch (type) {
    case LOADING_TRUE:
      return {
        ...state,
        loading: true
      }
    case GET_LOGGED_IN_POSTS:
      return {
        ...state,
        posts: payload.posts,
        loading: false
      }
    case GET_POSTS_TO_VIEW:
      return {
        ...state,
        postsToView: payload.posts,
        loading: false
      }
    case GET_POSTS_OF_FOLLOWING:
      // console.log(payload.postsFollowing);
      return {
        ...state,
        postsOfFollowing: payload.postsOfFollowing,
        loading: false
      }
    case CREATE_POST:
    case DELETE_POST:
      return {
        ...state,
        loading: false
      }
    case POST_ERROR:
      return {
        posts: null,
        loading: false
      }
    default:
      return state;
  }
}