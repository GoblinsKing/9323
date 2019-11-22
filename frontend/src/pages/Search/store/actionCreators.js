import axios from 'axios';
import { fromJS } from 'immutable';
import * as constants from './constants';
// import BACKEND_URL from '../../../backend_url';

// const baseURL = BACKEND_URL;

const searchReturn = (data) => ({
	type: constants.GET_SEARCH_INFO,
	searchResult: fromJS(data)
});


export const searchData = (courseCode, courseSemester) => {
	// const loginURL = baseURL + '/auth/login';
	// const loginAxiosConfig = {
	// 	headers: {
	// 		"accept": "application/json",
	// 		'Content-Type':'application/json',
	// 		"Authorization": res.data.token
	// 	}
	// };
	// const loginData = {"zid": courseCode, "password": courseSemester}
	// loginURL, loginData, loginAxiosConfig
	return (dispatch) => {
		let url = '/api/courses.json?courseCode=' + courseCode + '&courseSemester=' + courseSemester;
		axios.get(url).then((res) => {
			const result = [res.data.data[0]];
			dispatch(searchReturn(result))
		}).catch(() => {
			console.log('Search Failure!');
		})
	}
};