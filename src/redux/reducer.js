// import multireducer from 'multireducer';
import { routerReducer } from 'react-router-redux';
import auth from './modules/auth';
import notifs from './modules/notifs';
import info from './modules/info';
import boards from './modules/boards';
import streams from './modules/streams';
import profile from './modules/profile';
import works from './modules/works';

export default function createReducers(asyncReducers) {
  return {
    router: routerReducer,
    online: (v = true) => v,
    notifs,
    auth,
    boards,
    streams,
    works,
    profile,
    info,
    // errorHandler,
    ...asyncReducers
  };
}
