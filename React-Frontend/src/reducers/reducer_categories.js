import { FETCH_CATEGORY } from '../actions/index';

const INITIAL_STATE = { titles: [], questions: null};

export default function(state = INITIAL_STATE, action) {
	switch(action.type) {
		case FETCH_CATEGORY:
			return { ...state, questions: action.payload.data.rows };
		default:
			return state;
	}
}