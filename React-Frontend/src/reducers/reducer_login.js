// import { LOGIN, LOGOUT, REGISTER } from '../actions/index';
import { LOGIN } from '../actions/index';

const INITIAL_STATE = { user_name: null, user_id: null};

const TAG = 'REDUCER LOGIN | ';

export default function(state = INITIAL_STATE, action) {
	switch(action.type) {
		case LOGIN:
			console.log(TAG, 'action.payload', action.payload);
			if (action.payload.status === 200) {
				return { ...state, team_name: action.payload.data.rows[0].team_name, user_id: action.payload.data.rows[0].user_id };
			} else {
				console.log('Error with login, invalid credentials.');
				return { ...state, team_name: null, user_id: null };
			}
    // case LOGOUT:
    //   return { ...state, user_name: null, user_id: null }
		// case REGISTER:
		// 	return { ...state, user_id: action.payload.data.rows[0].user_id };
		default:
			return state;
	}
}
