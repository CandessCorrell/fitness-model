// import { LOGIN, LOGOUT, REGISTER } from '../actions/index';
import { LOGIN, LOGOUT } from '../actions/index';

const INITIAL_STATE = { user_name: null, user_id: null, isLoggedIn: localStorage.getItem('isLoggedIn') };

const TAG = 'REDUCER LOGIN | ';

export default function(state = INITIAL_STATE, action) {
	switch(action.type) {
		case LOGIN:
			console.log(TAG, 'action.payload', action.payload);
			if (action.payload.status === 200) {
				const { team_name, user_id } = action.payload.data.rows[0];
				localStorage.setItem('isLoggedIn', 'true');
				localStorage.setItem('team_name', team_name);
				localStorage.setItem('user_id', user_id);
				console.log(TAG, ' \n \
					localStorage.getItem(isLoggedIn):', localStorage.getItem('isLoggedIn') + ' \n \
					localStorage.getItem(team_name):', localStorage.getItem('team_name') + ' \n \
					localStorage.getItem(user_id):', localStorage.getItem('user_id')
				);
				return { ...state, team_name: team_name, user_id: user_id, isLoggedIn: 'true' };
			} else {
				console.log('Error with login, invalid credentials.');
				return { ...state, team_name: null, user_id: null };
			}
    case LOGOUT:
			localStorage.setItem('isLoggedIn', 'false');
      return { ...state, user_name: null, user_id: null, isLoggedIn: 'false' }
		// case REGISTER:
		// 	return { ...state, user_id: action.payload.data.rows[0].user_id };
		default:
			return state;
	}
}
