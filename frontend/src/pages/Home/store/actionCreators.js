import axios from 'axios';
import { fromJS } from 'immutable';
import * as constants from './constants';
import BACKEND_URL from '../../../backend_url';

const baseURL = BACKEND_URL;


const getCourseList = (data) => ({
	type: constants.GET_COURSE_LIST,
	courseList: fromJS(data),
});

// get all courses Info
export const getCourses = () => {
	const URL = baseURL + '/course/all';
	const config = {
		headers: { "accept": "application/json" }
	};
	return (dispatch) => {
		axios.get(URL, config).then((res) => {
			console.log(res)
			dispatch(getCourseList(res.data));
		}).catch(() => {
			console.log('no course data');
		})
	}
};



