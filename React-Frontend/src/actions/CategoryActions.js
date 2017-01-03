import axios from 'axios';
import {
	FETCH_CATEGORY,
	FETCH_CATEGORIES,
	SELECT_CATEGORY,
	NEW_FETCH_CATEGORIES
} from './types';
import { ROOT_URL } from './index';

const TAG = 'CategoryActions | ';

export function newFetchCategories(assessment_id) {
  const request = axios.get(`${ROOT_URL}categories/${assessment_id}`);
  return {
    type: NEW_FETCH_CATEGORIES,
    payload: request
  }
}

export function selectCategory(category_id) {
	console.log(TAG, SELECT_CATEGORY, '| category_id:', category_id);
	return {
		type: SELECT_CATEGORY,
		payload: category_id
	};
}

export function fetchCategories() {
	const request = axios.get(`${ROOT_URL}categories`);

	return {
		type: FETCH_CATEGORIES,
		payload: request
	};
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
