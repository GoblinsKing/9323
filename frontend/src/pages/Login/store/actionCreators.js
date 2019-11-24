import axios from 'axios'
import { fromJS } from 'immutable';
import * as constants from './constants'
import BACKEND_URL from '../../../backend_url'

const baseURL = BACKEND_URL;



export const logout = () => ({
	type: constants.LOGOUT,
	loginStatus: false
});

const getUserData = (data, token) => ({
	type: constants.GET_USER_DATA,
	loginStatus: true,
	userInfo: fromJS(data),
	token: fromJS(token)
});

const getEnrollmentData = (data) => ({
	type: constants.GET_ENROLLMENT_DATA,
	enrollmentInfo: fromJS(data)
});

const getUserAllCourses = (data) => ({
	type: constants.GET_USER_COURSES,
	userAllCourses: fromJS(data)
});

// 发送登录请求, 若登录成功继续发送: 获取用户信息请求 -> 获取enrollment信息请求 -> 获取用户课程请求
export const login = (account, password) => {
	const loginURL = baseURL + '/auth/login';
	const loginAxiosConfig = {
		headers: {
			"accept": "application/json",
			'Content-Type':'application/json'
		}
	};
	const loginData = {"zid": account, "password": password}
	return (dispatch) => {
		// login auth post
		axios.post(loginURL, loginData, loginAxiosConfig).then((res) => {
			
			// get user info
			const userURL = baseURL + '/user/';
			const AxiosConfig = {
				headers: {
					"accept": "application/json",
					"Authorization": res.data.token
				}
			};
			axios.get(userURL, AxiosConfig).then((response) => {
				const userData = response.data;
				dispatch(getUserData(userData, res.data.token));
			}).catch(() => {
				console.log("Get UserInfo Failure!");
			});

			// get enrollment info
			const enrollmentURL = baseURL + '/user/enrolment';
			axios.get(enrollmentURL, AxiosConfig).then((response) => {
				const enrollmentData = response.data;
				dispatch(getEnrollmentData(enrollmentData));

				// get user courses
				var courseData = [];
				enrollmentData.forEach(element => {
					const url = baseURL + '/course/?course_id=' + element.course_id;
					const config = {
						headers: { "accept": "application/json" }
					};
					axios.get(url, config).then((res1) => {
						courseData.push(res1.data.courseInfo);
						if (element === enrollmentData[enrollmentData.length - 1]){
							dispatch(getUserAllCourses(courseData));
						}
					}).catch(() => {
						console.log("Get User Course Failure!");
					});
				});

			}).catch(() => {
				console.log("Get EnrollmentInfo Failure!");
			})

		}).catch(() => {
			console.log("Login Failure!");
		});
	}
};





