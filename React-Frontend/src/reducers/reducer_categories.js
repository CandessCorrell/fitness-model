import { FETCH_CATEGORY, FETCH_CATEGORIES } from '../actions/index';

const INITIAL_STATE = { titles: null, questions: null, checked: false};

export default function(state = INITIAL_STATE, action) {
	switch(action.type) {
		case FETCH_CATEGORY:
			return { ...state, questions: action.payload.data.rows };
		case FETCH_CATEGORIES:
			return { ...state, titles: action.payload.data.rows };
		// case UPDATE_CHECKED:
		// 	return { ...state, checked: action.payload.checked};
		default:
			return state;
	}
}
