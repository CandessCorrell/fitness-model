import {
	FETCH_ASSESSMENTS,
	FETCH_SCORES,
	SELECT_ASSESSMENT,
	ADD_ASSESSMENT,
	FETCH_RECOMMENDATIONS
} from '../actions/types';

const INITIAL_STATE = { assessments: null, selected: null, scores: null};

export default function(state = INITIAL_STATE, action) {
	switch(action.type) {
		case FETCH_ASSESSMENTS:
			return { ...state, assessments: action.payload.data.rows };
		case FETCH_RECOMMENDATIONS:
			return { ...state, recommendations: action.payload.data.rows}
		case FETCH_SCORES:
			return { ...state, scores: action.payload.data.rows };
		case SELECT_ASSESSMENT:
			return { ...state, selected: action.payload };
		case ADD_ASSESSMENT:
			return { ...state, selected: action.payload.data.assessment_id }
		default:
			return state;
	}
}
