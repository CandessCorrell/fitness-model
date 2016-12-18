import axios from 'axios';

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const FETCH_CATEGORY = 'FETCH_CATEGORY';
export const FETCH_RESULTS = 'FETCH_RESULTS';
export const FETCH_SCORES = 'FETCH_SCORES';
export const LOGIN = 'LOGIN';
// export const UPDATE_CHECKED = 'UPDATE_CHECKED';

export const ROOT_URL = 'http://fitness.cicddevops.com:3000/';

export function login(team_name, password) {
	const request = axios.post(`${ROOT_URL}login`, {
    loginJson: {
			team_name: team_name,
			password: password
		}
  })

	return {
		type: LOGIN,
		payload: request
	};
}

export function fetchCategories() {
	const request = axios.get(`${ROOT_URL}categories`);

	return {
		type: FETCH_CATEGORIES,
		payload: request
	};
}

export function postResponse(result_id, question_id, answer_id) {
	axios.post(`${ROOT_URL}responses`, {
    question_id: question_id,
    answer_id: answer_id,
		result_id: result_id
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}

export function putResponse(response_id, result_id, question_id, answer_id) {
	axios.put(`${ROOT_URL}responses/${response_id}`, {
    resultJson: {
			question_id: question_id,
    	answer_id: answer_id,
			result_id: result_id
		}
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}

export function fetchCategory(id) {
	const request = axios.get(`${ROOT_URL}fitness_card/${id}`);
	console.log('fetchCategory request:', request);

	return {
		type: FETCH_CATEGORY,
		payload: request
	};
}

/* Not live yet
 * updateChecked takes category_id (int) and checked (boolean)
 * Used to track whether a category-item in SideBar should be checked or empty.
 * If true, checked, else empty.
 */
// export function updateChecked(category_id, checked) {
// 	return {
// 		type: UPDATE_CHECKED,
// 		payload: { checked }
// 	};
// }

//This does not work yet
export function fetchCategoryWithErrorHandling(id) {
	console.log('entered fetchCategoryWithErrorHandling');
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

export function fetchResults(id) {
	const request = axios.get(`${ROOT_URL}result/${id}`);

	return {
		type: FETCH_RESULTS,
		payload: request
	};
}

export function fetchScores(id) {
	const request = axios.get(`${ROOT_URL}scores/${id}`);

	return {
		type: FETCH_SCORES,
		payload: request
	};
}
