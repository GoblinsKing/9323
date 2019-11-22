import axios from 'axios';
import { fromJS } from 'immutable';
import * as constants from './constants';
import BACKEND_URL from '../../../backend_url'

const baseURL = BACKEND_URL;



const getExistAssnInfo = (data) => ({
	type: constants.GET_ASSN_INFO,
	assnInfo: fromJS(data)
});

// get assn info
export const getAssnInfo= (token, course_id) => {
	const URL = baseURL + '/course/assignment?course_id=' + course_id;
	const axiosConfig = {
		headers: {
			"accept": "application/json",
			"Authorization": token
		}
	};
	return (dispatch) => {
		axios.get(URL, axiosConfig).then((res) => {
			console.log(res)
			dispatch(getExistAssnInfo(res.data.assignmentInfo));
		}).catch(() => {
			console.log('getAssnInfo Failure!');
		})
	}
};

const getExistNotice = (data) => ({
	type: constants.GET_NOTICE_INFO,
	courseNotice: fromJS(data)
});

// get course Notice
export const getCourseNotice = (course_id) => {
	const URL = baseURL + '/course/notice?course_id=' + course_id;
	const axiosConfig = {
		headers: {
			"accept": "application/json"
		}
	};
	return (dispatch) => {
		axios.get(URL, axiosConfig).then((res) => {
			console.log(res)
			dispatch(getExistNotice(res.data));
		}).catch(() => {
			console.log('getCourseNotice Failure!');
		})
	}
};


// post new Notice
export const postCourseNotice = (token, course_id, title, content, publisher_id) => {
	const URL = baseURL + '/course/notice';
	const AxiosConfig = {
		headers: {
			"accept": "application/json",
			'Content-Type':'application/json',
			"Authorization": token
		}
	};
	const sendData = {
		"course_id": course_id,
		"title": title, 
		"content": content,
		"publisher_id": publisher_id
	}
	return (dispatch) => {
		axios.post(URL, sendData, AxiosConfig).then((res) => {
			console.log(res)
			dispatch(getCourseNotice(course_id));
		}).catch(() => {
			console.log('postCourseNotice Failure!');
		})
	}
};