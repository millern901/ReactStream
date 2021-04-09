import api from '../utils/api';
import { setAlert } from './alert';
import {
  GET_VIDEOS,
  VIDEO_ERROR,
  ADD_VIDEO,
  GET_VIDEO
} from './types';

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
