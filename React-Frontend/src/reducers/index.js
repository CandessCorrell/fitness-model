import { combineReducers } from 'redux';
import CategoriesReducer from './reducer_categories'
import ResultsReducer from './reducer_results'

const rootReducer = combineReducers({
  category: CategoriesReducer,
  result: ResultsReducer
});

export default rootReducer;
