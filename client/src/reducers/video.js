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
    case DELETE_VIDEO:
      return {
        ...state,
        videos: state.videos.filter((video) => video._id !== payload),
        loading: false
      };
    case VIDEO_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case UPDATE_LIKES:
      return {
        ...state,
        videos: state.videos.map((video) =>
          video._id === payload.id ? { ...video, likes: payload.likes } : video
        ),
        loading: false
      };
    case ADD_COMMENT:
      return {
        ...state,
        video: { ...state.video, comments: payload },
        loading: false
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        video: {
          ...state.video,
          comments: state.video.comments.filter(
            (comment) => comment._id !== payload
          )
        },
        loading: false
      };  
    default:
      return state;
  }
}

export default videoReducer;
