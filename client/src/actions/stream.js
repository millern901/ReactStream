import api from '../utils/api';
import { setAlert } from './alert';
import {
    GET_STREAMS,
    STREAM_ERROR,
    DELETE_STREAM,
    ADD_STREAM,
    GET_STREAM
} from './types';

// Get streams
export const getStreams = () => async dispatch => {
  try {
    const res = await api.get('/streams');

    dispatch({
      type: GET_STREAMS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: STREAM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete stream
export const deleteStream = id => async dispatch => {
  try {
    await api.delete(`/streams/${id}`);

    dispatch({
      type: DELETE_STREAM,
      payload: id
    });

    dispatch(setAlert('Stream Removed', 'success'));
  } catch (err) {
    dispatch({
      type: STREAM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add post
export const addStream = formData => async dispatch => {
  try {
    const res = await api.post('/streams', formData);

    dispatch({
      type: ADD_STREAM,
      payload: res.data
    });

    dispatch(setAlert('Stream Created', 'success'));
  } catch (err) {
    dispatch({
      type: STREAM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get post
export const getStream = id => async dispatch => {
  try {
    const res = await api.get(`/streams/${id}`);

    dispatch({
      type: GET_STREAM,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: STREAM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
