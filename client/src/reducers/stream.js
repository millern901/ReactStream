import {
    GET_STREAMS,
    GET_STREAM,
    ADD_STREAM,
    DELETE_STREAM,
    STREAM_ERROR
} from '../actions/types';
  
  const initialState = {
    streams: [],
    stream: null,
    loading: true,
    error: {}
  };
  
function streamReducer(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case GET_STREAMS:
        return {
          ...state,
          streams: payload,
          loading: false
        };
      case GET_STREAM:
        return {
          ...state,
          stream: payload,
          loading: false
        };
      case ADD_STREAM:
        return {
          ...state,
          streams: [payload, ...state.streams],
          loading: false
        };
      case DELETE_STREAM:
        return {
          ...state,
          streams: state.streams.filter((stream) => stream._id !== payload),
          loading: false
        };
      case STREAM_ERROR:
        return {
          ...state,
          error: payload,
          loading: false
        };
      default:
        return state;
    }
  }
  
  export default streamReducer;
  