const initialState = {
  blocks: {},
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'FETCH_WORKS':
      return {
        ...state,
        fetching: true
      };
    case 'FETCH_WORKS_ERROR':
      return {
        ...state,
        fetching: false,
        fetched: false,
        error: action.error
      };
    case 'FETCH_WORKS_FULFILLED':
      return {
        ...state,
        fetching: true,
        fetched: true,
        streams: action.result.streams
      };
    default:
      return state;
  }
}
