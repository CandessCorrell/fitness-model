import {
	LOGIN,
	LOGOUT,
	REGISTER
} from '../actions/types';

const TAG = 'LoginReducer | ';

const INITIAL_STATE = { team_name: localStorage.getItem('team_name') != null ? localStorage.getItem('team_name') : null,
						user_id: localStorage.getItem('user_id') != null ? localStorage.getItem('user_id') : null,
						isLoggedIn: localStorage.getItem('isLoggedIn') ? localStorage.getItem('isLoggedIn') : null };

export default function(state = INITIAL_STATE, action) {
	switch(action.type) {
		case LOGIN:
			// console.log(TAG, 'action.payload', action.payload);
			if (action.payload.status === 200) {
				const { team_name, user_id } = action.payload.data.rows[0];
				localStorage.setItem('isLoggedIn', 'true');
				localStorage.setItem('team_name', team_name);
				localStorage.setItem('user_id', user_id);
				return { ...state, team_name: team_name, user_id: user_id, isLoggedIn: 'true' };
			} else {
				console.log('Error with login, invalid credentials.');
				localStorage.setItem('isLoggedIn', 'false');
				localStorage.setItem('team_name', null);
				localStorage.setItem('user_id', null);
				return { ...state, team_name: null, user_id: null };
			}
    case LOGOUT:
			localStorage.setItem('isLoggedIn', 'false');
      return { ...state, team_name: null, user_id: null, isLoggedIn: 'false' }
		case REGISTER:
			if (action.payload.status === 200) {
				const { team_name, user_id } = action.payload.data.rows[0];
				localStorage.setItem('isLoggedIn', 'true');
				localStorage.setItem('team_name', null);
				localStorage.setItem('user_id', null);
				return { ...state, team_name: team_name, user_id: user_id, isLoggedIn: 'true' };
			} else {
				localStorage.setItem('isLoggedIn', 'false');
				localStorage.setItem('team_name', null);
				localStorage.setItem('user_id', null);
				return { ...state, team_name: null, user_id: null, isLoggedIn: 'false'}
			}
		default:
			return state;
	}
}
