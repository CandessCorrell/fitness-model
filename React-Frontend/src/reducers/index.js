import { combineReducers } from 'redux';
import CategoriesReducer from './CategoriesReducer';
import AssessmentsReducer from './AssessmentsReducer';
import LoginReducer from './LoginReducer';

const rootReducer = combineReducers({
  categories: CategoriesReducer,
  assessments: AssessmentsReducer,
  login: LoginReducer
});

export default rootReducer;
