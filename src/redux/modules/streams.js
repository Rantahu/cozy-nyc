const initialState = {
  streamsList: {},
  currentStreams: null,
  loaded: false
};
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'FETCH_STREAMS':
      return {
        ...state,
        fetching: true
      };
    case 'FETCH_STREAMS_ERROR':
      return {
        ...state,
        fetching: false,
        fetched: false,
        error: action.error
      };
    case 'FETCH_STREAMS_FULFILLED':
      return {
        ...state,
        fetching: true,
        fetched: true,
        streams: action.result.streams
      };
    case 'FETCH_USER_STREAMS':
      return {
        ...state,
        fetching: true
      };
    case 'FETCH_USER_STREAMS_ERROR':
      return {
        ...state,
        fetching: false,
        fetched: false,
        error: action.error
      };
    case 'FETCH_USER_STREAMS_FULFILLED':
      return {
        ...state,
        fetching: true,
        fetched: true,
        currentStreams: action.result
      };
    default:
      return state;
  }
}

export function getStreams() {
  return {
    types: ['FETCH_STREAMS', 'FETCH_STREAMS_FULFILLED', 'FETCH_STREAMS_ERROR'],
    promise: async ({ client }) => {
      try {
        const response = await client.get('/streams/list');
        return response;
      } catch (error) {
        console.log(error);
        // return catchValidation(error);
      }
    }
  };
}

export function getStreamsByUser(username) {
  return {
    types: ['FETCH_USER_STREAMS', 'FETCH_USER_STREAMS_FULFILLED', 'FETCH_USER_STREAMS_ERROR'],
    promise: async ({ client }) => {
      try {
        const response = await client.get(`/streams/${username}/`);
        return response;
      } catch (error) {
        console.log(error);
        // return catchValidation(error);
      }
    }
  };
}
