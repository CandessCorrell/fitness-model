import { combineReducers } from 'redux';
import CategoriesReducer from './reducer_categories';
import AssessmentsReducer from './reducer_assessments';
import LoginReducer from './reducer_login';

const rootReducer = combineReducers({
  categories: CategoriesReducer,
  assessments: AssessmentsReducer,
  login: LoginReducer
});

export default rootReducer;
