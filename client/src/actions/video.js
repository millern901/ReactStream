import api from '../utils/api';
import { setAlert } from './alert';
import {
  GET_VIDEOS,
  VIDEO_ERROR,
  UPLOAD_VIDEO,
  ADD_VIDEO,
  GET_VIDEO,
  DELETE_VIDEO,
  UPDATE_LIKES,
  ADD_COMMENT,
  REMOVE_COMMENT
} from '../actions/types';

// Get videos
export const getVideos = () => async dispatch => {
  try {
    const res = await api.get('/videos');

    dispatch({
      type: GET_VIDEOS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: VIDEO_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add video
export const addVideo = formData => async dispatch => {
  try {
    const res = await api.post('/videos', formData);

    dispatch({
      type: ADD_VIDEO,
      payload: res.data
    });

    dispatch(setAlert('Video Created', 'success'));
  } catch (err) {
    dispatch({
      type: VIDEO_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete video
export const deleteVideo = id => async dispatch => {
  try {
    await api.delete(`/videos/${id}`);

    dispatch({
      type: DELETE_VIDEO,
      payload: id
    });

    dispatch(setAlert('Video Removed', 'success'));
  } catch (err) {
    dispatch({
      type: VIDEO_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get video
export const getVideo = id => async dispatch => {
  try {
    const res = await api.get(`/videos/${id}`);

    dispatch({
      type: GET_VIDEO,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: VIDEO_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add like
export const addLike = id => async dispatch => {
  try {
    const res = await api.put(`/videos/like/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: VIDEO_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Remove like
export const removeLike = id => async dispatch => {
  try {
    const res = await api.put(`/videos/unlike/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: VIDEO_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add comment
export const addComment = (videoId, formData) => async dispatch => {
  try {
    const res = await api.post(`/videos/comment/${videoId}`, formData);

    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    });

    dispatch(setAlert('Comment Added', 'success'));
  } catch (err) {
    dispatch({
      type: VIDEO_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete comment
export const deleteComment = (videoId, commentId) => async dispatch => {
  try {
    await api.delete(`/videos/comment/${videoId}/${commentId}`);

    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId
    });

    dispatch(setAlert('Comment Removed', 'success'));
  } catch (err) {
    dispatch({
      type: VIDEO_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
