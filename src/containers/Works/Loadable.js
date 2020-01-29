import React from 'react';
import Loadable from 'react-loadable';

const WorksHome = Loadable({
  loader: () => import('./WorksHome' /* webpackChunkName: 'streams' */).then(module => module.default),
  loading: () => <div>Loading</div>
});

export default WorksHome;
