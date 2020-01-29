import { FORM_ERROR } from 'final-form';
import cookie from 'js-cookie';
import * as jwtDecode from 'jwt-decode';

const LOAD = 'redux-example/auth/LOAD';
const LOAD_SUCCESS = 'redux-example/auth/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/auth/LOAD_FAIL';
const LOGIN = 'redux-example/auth/LOGIN';
const LOGIN_SUCCESS = 'redux-example/auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'redux-example/auth/LOGIN_FAIL';
const REGISTER = 'redux-example/auth/REGISTER';
const REGISTER_SUCCESS = 'redux-example/auth/REGISTER_SUCCESS';
const REGISTER_FAIL = 'redux-example/auth/REGISTER_FAIL';
const LOGOUT = 'redux-example/auth/LOGOUT';
const LOGOUT_SUCCESS = 'redux-example/auth/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'redux-example/auth/LOGOUT_FAIL';

const initialState = {
  loaded: false,
  user: null
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        accessToken: action.result.token,
        user: action.result.user
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case LOGIN:
      return {
        ...state,
        loggingIn: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        loaded: true,
        token: action.result.access,
        user: action.result.user
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loggingIn: false,
        loginError: action.error
      };
    case REGISTER:
      return {
        ...state,
        registeringIn: true
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        registeringIn: false
      };
    case REGISTER_FAIL:
      return {
        ...state,
        registeringIn: false,
        registerError: action.error
      };
    case LOGOUT:
      return {
        ...state,
        loggingOut: true
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loggingOut: false,
        token: null,
        user: null
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        loggingOut: false,
        logoutError: action.error
      };
    case 'FETCH_USER_PROFILE':
      return {
        ...state,
        fetching: true
      };
    case 'FETCH_USER_PROFILE_ERROR':
      return {
        ...state,
        fetching: false,
        fetched: false,
        error: action.payload
      };
    case 'FETCH_USER_PROFILE_FULFILLED':
      return {
        ...state,
        fetching: false,
        fetched: true,
        profile: action.result
      };
    default:
      return state;
  }
}

const catchValidation = error => {
  if (error.message) {
    if (error.message === 'Validation failed' && error.data) {
      return Promise.reject(error.data);
    }
    const err = {
      [FORM_ERROR]: error.message
    };
    return Promise.reject(err);
  }
  return Promise.reject(error);
};

function setCookie() {
  return response => {
    const payload = jwtDecode(response.access);
    console.log(payload);
    const options = payload.exp ? { expires: new Date(payload.exp * 1000) } : undefined;

    cookie.set('jwt', response.access, options);
  };
}

function setToken({ client }) {
  return response => {
    console.log('test');
    const token = response.access;
    client.setJwtToken(token);
  };
}

/*
* Actions
* * * * */

export function isLoaded(globalState) {
  return globalState.auth && globalState.auth.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: async ({ client }) => {
      try {
        const token = cookie.get('jwt');
        const response = await client.post('/auth/token/verify/', token);
        setToken({
          client
        })(token);
        return response;
      } catch (error) {
        return catchValidation(error);
      }
    }
  };
}

export function register(data) {
  return {
    types: [REGISTER, REGISTER_SUCCESS, REGISTER_FAIL],
    promise: async ({ client }) => {
      try {
        const response = await client.post('/register/', data);
        await cookie.set('jwt', response.token);
      } catch (error) {
        return catchValidation(error);
      }
    }
  };
}

export function getUserProfile(username) {
  return {
    types: ['FETCH_USER_PROFILE', 'FETCH_USER_PROFILE_FULFILLED', 'FETCH_USER_PROFILE_ERROR'],
    promise: async ({ client }) => {
      try {
        const response = await client.get(`/profile/${username}/`);
        console.log(response);
        return response;
      } catch (error) {
        console.log(error);
      }
    }
  };
}

export function login(data) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: async ({ client }) => {
      console.log('ugh');
      try {
        const response = await client.post('/auth/token/', data);
        setCookie()(response);
        setToken({ client })(response);
        const payload = await jwtDecode(response.access);
        response.user = {
          username: payload.username,
          id: payload.user_id
        };
        console.log(response);
        return response;
      } catch (error) {
        return catchValidation(error);
      }
    }
  };
}

export function logout() {
  return {
    types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
    promise: async ({ client }) => {
      setToken({ client })({ token: null });
      cookie.remove('jwt');
    }
  };
}
