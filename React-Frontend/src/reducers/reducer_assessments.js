import { FETCH_ASSESSMENTS, FETCH_SCORES } from '../actions/index';

const INITIAL_STATE = { results: null, scores: null};

export default function(state = INITIAL_STATE, action) {
	switch(action.type) {
		case FETCH_ASSESSMENTS:
			return { ...state, assessments: action.payload.data.rows };
		case FETCH_SCORES:
			return { ...state, scores: action.payload.data.rows };
		default:
			return state;
	}
}