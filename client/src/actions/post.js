import axios from "axios";
import {
  LOADING_TRUE,
  CREATE_POST,
  DELETE_POST,
  GET_LOGGED_IN_POSTS,
  GET_POSTS_TO_VIEW,
  GET_POSTS_OF_FOLLOWING,
  POST_ERROR
} from "../actions/types";

export const getLoggedInPosts = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/posts/user/${userId}`);

    dispatch({
      type: GET_LOGGED_IN_POSTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR
    });
  }
};

export const getPostsByUsername = username => async dispatch => {
  try {
    // dispatch({
    //   type: LOADING_TRUE
    // });
    const res = await axios.get(`/api/posts/username/${username}`);
    console.log(res);
    dispatch({
      type: GET_POSTS_TO_VIEW,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR
    });
  }
};
export const getPostsById = userId => async dispatch => {
  try {
    // dispatch({
    //   type: LOADING_TRUE
    // });
    const res = await axios.get(`/api/posts/user/${userId}`);
    console.log(res);
    dispatch({
      type: GET_POSTS_TO_VIEW,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR
    });
  }
};

export const createPost = postText => async dispatch => {
  try {
    const res = await axios.post("/api/posts", {text: postText});

    dispatch({
      type: CREATE_POST,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR
    });
  }
};

export const toggleLikePost = postId => async dispatch => {
  try {
    await axios.post(`/api/posts/like/${postId}`);
  } catch (err) {
    dispatch({
      type: POST_ERROR
    });
  }
}

export const deletePost = postId => async dispatch => {
  try {
    console.log("A: " + postId);
    const res = await axios.delete(`/api/posts/${postId}`);
    console.log(res);
    dispatch({ type: DELETE_POST })
  } catch (err) {
    dispatch({
      type: POST_ERROR
    });
  }
};

export const getFollowingPosts = () => async dispatch => {
  try {
    const res = await axios.get("/api/posts/following/all");

    dispatch({
      type: GET_POSTS_OF_FOLLOWING,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR
    });
  }
};