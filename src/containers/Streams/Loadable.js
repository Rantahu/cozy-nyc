import React from 'react';
import Loadable from 'react-loadable';

const StreamsHome = Loadable({
  loader: () => import('./StreamsHome' /* webpackChunkName: 'streams' */).then(module => module.default),
  loading: () => <div>Loading</div>
});

// export const Streams = Loadable({
//   loader: () => import('./Streams' /* webpackChunkName: 'streams' */).then(module => module.default),
//   loading: () => <div>Loading</div>
// });

export default StreamsHome;
