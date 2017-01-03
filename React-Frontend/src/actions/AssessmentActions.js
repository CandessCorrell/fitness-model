import axios from 'axios';
import {
	FETCH_ASSESSMENTS,
	SELECT_ASSESSMENT,
	ADD_ASSESSMENT
} from './types';
import { ROOT_URL } from './index';

export function fetchAssessments(id) {
	const request = axios.get(`${ROOT_URL}assessments/${id}`);

	return {
		type: FETCH_ASSESSMENTS,
		payload: request
	};
}

export function selectAssessment(id) {
	return {
		type: SELECT_ASSESSMENT,
		payload: id
	};
}

export function postAssessment(user_id,version_id) {
	const request = axios.post(`${ROOT_URL}assessments`,{
		user_id: user_id,
		version_id: version_id
	});

	return {
		type: ADD_ASSESSMENT,
		payload: request
	};

}
