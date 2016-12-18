import { combineReducers } from 'redux';
import CategoriesReducer from './reducer_categories';
import ResultsReducer from './reducer_results';
import LoginReducer from './reducer_login';

const rootReducer = combineReducers({
  category: CategoriesReducer,
  result: ResultsReducer,
  login: LoginReducer
});

export default rootReducer;
