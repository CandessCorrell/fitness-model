import {
	FETCH_CATEGORY,
	FETCH_CATEGORIES,
	NEW_FETCH_CATEGORIES,
	SELECT_CATEGORY
} from '../actions/types';

// After we switch to NEW_FETCH_CATEGORIES, won't need titles or questions.
// Still need to implement something in here to track 'checked' for each individual category
const INITIAL_STATE = { titles: '', questions: '', categories: '', selected: '' };

export default function(state = INITIAL_STATE, action) {
	switch(action.type) {
		case FETCH_CATEGORY:
			return { ...state, questions: action.payload.data.rows };
		case FETCH_CATEGORIES:
			return { ...state, titles: action.payload.data.rows };
		case NEW_FETCH_CATEGORIES:
			return { ...state, categories: action.payload.data};
		case SELECT_CATEGORY:
			return { ...state, selected: action.payload};
		default:
			return state;
	}
}
