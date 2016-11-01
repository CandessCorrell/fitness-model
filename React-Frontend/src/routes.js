import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Home from './components/home';
import App from './components/app';
import Test from './components/test';
import Category from './containers/category'
import Rankings from './components/rankings'
import Results from './components/results'

export default (
  <Route path="/" component={ App }>
    <IndexRoute component={ Home } />
    <Route path="/test" component={Test} />
    <Route path="/category/:id" component={Category} />
    <Route path="/rankings" component={Rankings} />
    <Route path="/results" component={Results} />
  </Route>
);
