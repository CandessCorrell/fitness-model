import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Home from './components/home';
import App from './components/app';
import Category from './containers/category'
import Rankings from './components/rankings'
import Results from './containers/results'

export default (
  <Route path="/" component={ App }>
    <IndexRoute component={ Home } />
    <Route path="/category/:id" component={Category} />
    <Route path="/results/:id" component={Results} />
  </Route>
);
