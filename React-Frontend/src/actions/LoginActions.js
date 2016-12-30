import axios from 'axios';
import { ROOT_URL } from './index';
import {
	LOGIN,
	LOGOUT,
	REGISTER
} from './types';

export function login(team_name, password) {
	const request = axios.post(`${ROOT_URL}login`, {
    loginJson: {
			team_name: team_name,
			password: password
		}
  })
	localStorage.setItem('isLoggedIn', 'true');
	return {
		type: LOGIN,
		payload: request
	}
}

export function logout() {
	return {
		type: LOGOUT
	}
}

export function register(team_name, password) {
	const request = axios.post(`${ROOT_URL}register`, {
		registerJson: {
			team_name: team_name,
			password: password
		}
	})
	return {
		type: REGISTER,
		payload: request
	}
}
