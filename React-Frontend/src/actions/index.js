import axios from 'axios';
import {
	FETCH_CATEGORY,
	FETCH_CATEGORIES,
	FETCH_ASSESSMENTS,
	FETCH_RECOMMENDATIONS,
	FETCH_SCORES,
	SELECT_ASSESSMENT,
	ADD_ASSESSMENT,
	LOGIN,
	LOGOUT,
	REGISTER
} from './types';
// export const UPDATE_CHECKED = 'UPDATE_CHECKED';

export const ROOT_URL = 'http://' + 'fitness.cicddevops.com' + ':3000/';

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

export function fetchCategories() {
	const request = axios.get(`${ROOT_URL}categories`);

	return {
		type: FETCH_CATEGORIES,
		payload: request
	};
}

export function postResponse(assessment_id, question_id, answer_id) {
	axios.post(`${ROOT_URL}responses`, {
    question_id: question_id,
    answer_id: answer_id,
		assessment_id: assessment_id
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}

export function putResponse(response_id, assessment_id, question_id, answer_id) {
	axios.put(`${ROOT_URL}responses/${response_id}`, {
    responseJson: {
			question_id: question_id,
    	answer_id: answer_id,
			assessment_id: assessment_id
		}
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}

export function fetchCategory(assessment_id,category_id) {
	const request = axios.get(`${ROOT_URL}assessments/${assessment_id}/category/${category_id}`);
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

export function fetchAssessments(id) {
	const request = axios.get(`${ROOT_URL}assessments/${id}`);

	return {
		type: FETCH_ASSESSMENTS,
		payload: request
	};
}

export function fetchRecommendations(id) {
	const request = axios.get(`${ROOT_URL}assessment/${id}`)

	return {
		type: FETCH_RECOMMENDATIONS,
		payload: request
	}
}

export function selectAssessment(id) {
	return {
		type: SELECT_ASSESSMENT,
		payload: id
	};
}

export function postAssessment(user_id,version_id) {
	const request = axios.post(`${ROOT_URL}assessments`,{
		user_id:user_id,
		version_id:version_id
	});

	return {
		type: ADD_ASSESSMENT,
		payload: request
	};

}

export function fetchScores(assessment_id) {
	const request = axios.get(`${ROOT_URL}scores/${assessment_id}`);

	return {
		type: FETCH_SCORES,
		payload: request
	};
}
