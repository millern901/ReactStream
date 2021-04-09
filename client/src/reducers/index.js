import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import post from './post';
import video from './video';

export default combineReducers({
  alert,
  auth,
  profile,
  post,
  video
});
