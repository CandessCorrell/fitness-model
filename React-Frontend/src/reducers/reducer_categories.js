import { FETCH_CATEGORY, FETCH_CATEGORIES } from '../actions/index';

const INITIAL_STATE = { titles: [], questions: null};

export default function(state = INITIAL_STATE, action) {
	switch(action.type) {
		case FETCH_CATEGORY:
			return { ...state, questions: action.payload.data.rows };
		case FETCH_CATEGORIES:
			return { ...state, titles: action.payload.data.rows };
		default:
			return state;
	}
}