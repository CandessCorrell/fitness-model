import axios from 'axios';
import {
	FETCH_RECOMMENDATIONS,
	FETCH_SCORES
} from './types';
import { ROOT_URL } from './index';

export function fetchRecommendations(id) {
	const request = axios.get(`${ROOT_URL}assessment/${id}`)

	return {
		type: FETCH_RECOMMENDATIONS,
		payload: request
	}
}

export function fetchScores(assessment_id) {
	const request = axios.get(`${ROOT_URL}scores/${assessment_id}`);

	return {
		type: FETCH_SCORES,
		payload: request
	};
}
