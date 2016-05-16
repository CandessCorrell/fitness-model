import { combineReducers } from 'redux';
import CategoriesReducer from './reducer_categories'

const rootReducer = combineReducers({
  category: CategoriesReducer
});

export default rootReducer;
