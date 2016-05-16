import axios from 'axios';

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES'
export const FETCH_CATEGORY = 'FETCH_CATEGORY'

const ROOT_URL = 'http://52.207.231.161:3000/'

export function fetchCategories() {
	const request = axios.get(`${ROOT_URL}categories`);

	return {
		type: FETCH_CATEGORIES,
		payload: request
	};
}

export function fetchCategory(id) {
	const request = axios.get(`${ROOT_URL}fitness_card/${id}`);

	return {
		type: FETCH_CATEGORY,
		payload: request
	};
}