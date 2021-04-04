import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import post from './post';
import stream from './stream';

export default combineReducers({
  alert,
  auth,
  profile,
  post,
  stream
});
