import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Home from './components/home';
import App from './components/app';
import Assessments from './containers/assessments'
import Category from './containers/category'
import Rankings from './components/rankings'
import Results from './containers/results'

export default (
  <Route path="/" component={ App }>
    <IndexRoute component={ Home } />
    <Route path="/assessments" component={Assessments} />
    <Route path="/assessment" component={Category} />
    <Route path="/results" component={Results} />
  </Route>
);
