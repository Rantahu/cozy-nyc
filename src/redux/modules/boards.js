const initialState = {
  categories: [],
  currentBoard: {
    tag: null,
    name: null,
    threads: []
  },
  currentThread: {
    id: null,
    board: null, // board id
    posts: []
  },
  loaded: false
};
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'FETCH_CATEGORIES':
      return {
        ...state,
        fetching: true
      };
    case 'FETCH_CATEGORIES_ERROR':
      return {
        ...state,
        fetching: false,
        fetched: false,
        error: action.error
      };
    case 'FETCH_CATEGORIES_FULFILLED':
      return {
        ...state,
        fetching: true,
        fetched: true,
        categories: action.result
      };
    case 'FETCH_BOARD':
      return {
        ...state,
        fetching: true
      };
    case 'FETCH_BOARD_ERROR':
      return {
        ...state,
        fetching: false,
        fetched: false,
        online: false,
        error: action.error
      };
    case 'FETCH_BOARD_FULFILLED':
      return {
        ...state,
        fetching: true,
        fetched: true,
        online: true,
        currentBoard: action.result
      };
    case 'FETCH_THREAD':
      return {
        ...state,
        fetching: true
      };
    case 'FETCH_THREAD_ERROR':
      return {
        ...state,
        fetching: false,
        fetched: false,
        online: false,
        error: action.error
      };
    case 'FETCH_THREAD_FULFILLED':
      return {
        ...state,
        fetching: true,
        fetched: true,
        online: true,
        currentThread: action.result
      };
    case 'CREATE_THREAD':
      return {
        ...state,
        fetching: true
      };
    case 'CREATE_THREAD_ERROR':
      return {
        ...state,
        fetching: false,
        fetched: false,
        error: action.error
      };
    case 'CREATE_THREAD_FULFILLED':
      return {
        ...state,
        fetching: true,
        fetched: true
      };
    case 'CREATE_POST':
      return {
        ...state,
        fetching: true
      };
    case 'CREATE_POST_FULFILLED':
      return {
        ...state,
        fetching: true,
        fetched: true
      };
    case 'CREATE_POST_ERROR':
      return {
        ...state,
        fetching: false,
        fetched: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function getCategories() {
  return {
    types: ['FETCH_CATEGORIES', 'FETCH_CATEGORIES_FULFILLED', 'FETCH_CATEGORIES_ERROR'],
    promise: async ({ client }) => {
      try {
        // TODO: change to /boards/
        const response = await client.get('/boards/list');
        return response;
      } catch (error) {
        return { type: 'FETCH_CATEGORIES_ERROR', error };
      }
    }
  };
}

export function getBoard(boardTag) {
  return {
    types: ['FETCH_BOARD', 'FETCH_BOARD_FULFILLED', 'FETCH_BOARD_ERROR'],
    promise: async ({ client }) => {
      try {
        const response = await client.get(`/boards/board/${boardTag}/`);
        return response;
      } catch (error) {
        return { type: 'FETCH_BOARD_ERROR', error };
      }
    }
  };
}

export function createThread(data) {
  return {
    types: ['CREATE_THREAD', 'CREATE_THREAD_FULFILLED', 'CREATE_THREAD_ERROR'],
    promise: async ({ client }) => {
      try {
        const response = client.post('/boards/thread/create', data);
        return response;
      } catch (error) {
        return { type: 'CREATE_THREAD_ERROR', error };
      }
    }
  };
}

export function getThread(threadId) {
  return {
    types: ['FETCH_THREAD', 'FETCH_THREAD_FULFILLED', 'FETCH_THREAD_ERROR'],
    promise: async ({ client }) => {
      try {
        // TODO: change to /posts/
        const response = await client.get(`/boards/thread/${threadId}/`);
        return response;
      } catch (error) {
        return { type: 'FETCH_THREAD_ERROR', error };
      }
    }
  };
}

export function createPost(data) {
  return {
    types: ['CREATE_POST', 'CREATE_POST_FULFILLED', 'CREATE_POST_ERROR'],
    promise: async ({ client }) => {
      try {
        const response = client.post('/boards/post/create', data);
        return response;
      } catch (error) {
        return { type: 'CREATE_POST_ERROR', error };
      }
    }
  };
}
