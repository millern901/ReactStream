import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import post from './post';
import video from './video';

export default combineReducers({
  alert,
  auth,
  post,
  video
});
