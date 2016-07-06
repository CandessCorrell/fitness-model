import axios from 'axios';

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES'
export const FETCH_CATEGORY = 'FETCH_CATEGORY'

const ROOT_URL = 'http://54.88.169.32:3000/'

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


//This does not work yet
export function fetchCategoryWithErrorHandling(id) {
	axios.get(`${ROOT_URL}fitness_card/${id}`)
		.then(function(res) {
			console.log('woo a response', res);
			return {
				type: FETCH_CATEGORY,
				payload: res
			};
		})
		.catch(function (res) {
			if (res instanceof Error) {
				// In this case a request was never sent to the server
				// Something happened in setting up the request that triggered an Error
				console.log('had an error');
			} else {
				// Here the request was made, but the server responded with a status code
				// that falls out of the range of 2xx
				// You will have the full response details available
				console.log('bad status')
				console.log(res.data); // The data that the server responded with
				console.log(res.headers); // The response headers from the server
				console.log(res.status); // The response status code
				console.log(res.config); // The config that was used to make the request
			}
		});
}