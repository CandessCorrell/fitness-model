import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Home from './components/Home';
import App from './components/App';
import Assessments from './containers/Assessments'
import Category from './containers/Category'
import Results from './containers/Results'

export default (
  <Route path="/" component={ App }>
    <IndexRoute component={ Home } />
    <Route path="/assessments" component={Assessments} />
    <Route path="/assessment" component={Category} />
    <Route path="/results" component={Results} />
  </Route>
);
