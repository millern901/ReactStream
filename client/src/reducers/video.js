import {
  GET_VIDEOS,
  VIDEO_ERROR,
  UPLOAD_VIDEO,
  ADD_VIDEO,
  GET_VIDEO
} from '../actions/types';

const initialState = {
  videos: [],
  video: null,
  fileName: null,
  loading: true,
  error: {}
};

function videoReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_VIDEOS:
      return {
        ...state,
        videos: payload,
        loading: false
      };
    case GET_VIDEO:
      return {
        ...state,
        video: payload,
        loading: false
      };
    case UPLOAD_VIDEO:
      return {
        ...state,
        fileName: payload,
        loading: false
      };
    case ADD_VIDEO:
      return {
        ...state,
        videos: [payload, ...state.videos],
        loading: false
      };
    case VIDEO_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}

export default videoReducer;
