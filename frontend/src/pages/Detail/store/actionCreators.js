import axios from 'axios';
import { fromJS } from 'immutable';
import * as constants from './constants';
import { actionCreators as CourseActionCreators } from '../../../pages/Course/store';
import BACKEND_URL from '../../../backend_url';

const baseURL = BACKEND_URL;


export const matchParams = (whichCourse, whichPage) => ({
	type: constants.MATCH_PARAMS,
	whichCourse: fromJS(whichCourse),
	whichPage: fromJS(whichPage)
});

export const whichDetailMore = (whichMore) => ({
	type: constants.MATCH_MORE,
	whichMore: fromJS(whichMore)
});


export const menuShow = (menuStatus) => ({
	type: constants.GET_MENU_STATUS,
	menuStatus: !menuStatus
});

// ########################################################################
const getPublicChatRoomID = (data) => ({
	type: constants.GET_PUBLIC_CHATROOM_ID,
	publicChatRoomID: fromJS(data)
});

const getGroupChatRoomID = (data) => ({
	type: constants.GET_GROUP_CHATROOM_ID,
	groupChatRoomID: fromJS(data)
});

const getPublicChatMessage = (data) => ({
	type: constants.GET_PUBLIC_CHAT_MESSAGE,
	PublicMessages: fromJS(data)
});

const getGroupChatMessage = (data) => ({
	type: constants.GET_GROUP_CHAT_MESSAGE,
	GroupMessages: fromJS(data)
});

// getChatRoomID_public
export const getChatRoomID_public = (token, chanel, course_id) => {
	const AxiosConfig = {
		headers: {
			"accept": "application/json",
			"Authorization": token
		}
	};
	const chatUrl = baseURL + '/chat/chatroom?channel=' + chanel + '&course_id=' + course_id;
	return (dispatch) => {
		axios.get(chatUrl , AxiosConfig).then((res) => {
			console.log(res)
			dispatch(getPublicChatRoomID(res.data));
			// after group chat_room_id, get public chat messages again
			const URL = baseURL + '/chat/message?chat_room_id=' + res.data.chat_room_id;
			axios.get(URL, AxiosConfig).then((res1) => {
				console.log(res1)
				dispatch(getPublicChatMessage(res1.data));
			}).catch(() => {
				console.log('Get Public Message Failure!');
			})

		}).catch(() => {
			console.log('getChatRoomID_public Failure!');
		})
	}
};

// getChatRoomID_group
export const getChatRoomID_group = (token, chanel, course_id) => {
	const AxiosConfig = {
		headers: {
			"accept": "application/json",
			"Authorization": token
		}
	};
	const chatUrl = baseURL + '/chat/chatroom?channel=' + chanel + '&course_id=' + course_id;
	return (dispatch) => {
		axios.get(chatUrl, AxiosConfig).then((res) => {
			console.log(res)
			dispatch(getGroupChatRoomID(res.data));
			// after group chat_room_id, get group chat messages again or clear GroupMessages
			if (res.data) {
				const URL = baseURL + '/chat/message?chat_room_id=' + res.data.chat_room_id;
				axios.get(URL, AxiosConfig).then((res1) => {
					console.log(res1)
					dispatch(getGroupChatMessage(res1.data));
				}).catch(() => {
					console.log('Get Group Message Failure!');
				})
			} else {
				dispatch(getGroupChatMessage(null));
			}
		}).catch(() => {
			console.log('getChatRoomID_group Failure!');
		})

	}
};

// sen public message
export const sendPublicMessage = (token, chat_room_id, message) => {
	const URL = baseURL + '/chat/message';
	const AxiosConfig = {
		headers: {
			"accept": "application/json",
			"Authorization": token,
			'Content-Type':'application/json'
		}
	};
	const sendData = {
		"chat_room_id": chat_room_id, 
		"message": message
	}
	return (dispatch) => {
		axios.post(URL, sendData, AxiosConfig).then((res) => {
			console.log(res)
			// if success, refresh public messages
			const config = {
				headers: {
					"accept": "application/json",
					"Authorization": token
				}
			};
			const URL1 = baseURL + '/chat/message?chat_room_id=' + chat_room_id;
			axios.get(URL1, config).then((res1) => {
				console.log(res1)
				dispatch(getPublicChatMessage(res1.data));
			}).catch(() => {
				console.log('Get Public Message Failure!');
			})

		}).catch(() => {
			console.log('Send Public Message Failure!');
		})
	}
};

// sendGroupMessage
export const sendGroupMessage = (token, chat_room_id, message) => {
	const URL = baseURL + '/chat/message';
	const AxiosConfig = {
		headers: {
			"accept": "application/json",
			"Authorization": token,
			'Content-Type':'application/json'
		}
	};
	const sendData = {
		"chat_room_id": chat_room_id, 
		"message": message
	}
	return (dispatch) => {
		axios.post(URL, sendData, AxiosConfig).then((res) => {
			console.log(res)
			// refresh data
			const config = {
				headers: {
					"accept": "application/json",
					"Authorization": token
				}
			};
			const URL1 = baseURL + '/chat/message?chat_room_id=' + chat_room_id;
			axios.get(URL1, config).then((res1) => {
				console.log(res1)
				dispatch(getGroupChatMessage(res1.data));
			}).catch(() => {
				console.log('Get Group Message Failure!');
			})
		}).catch(() => {
			console.log('Send Group Message Failure!');
		})
	}
};

const getSearchMessage = (data) => ({
	type: constants.GET_SEARCH_MESSAGE,
	searchMessages: fromJS(data)
});

export const searchChatMessage = (token, key_word, chat_room_id) => {
	const config = {
		headers: {
			"accept": "application/json",
			"Authorization": token
		}
	};
	const url = baseURL + '/chat/message/search?key_word=' + key_word + '&chat_room_id=' + chat_room_id;
	return (dispatch) => {
		axios.get(url, config).then((res) => {
			console.log(res)
			dispatch(getSearchMessage(res.data));
		}).catch(() => {
			console.log('searchChatMessage Failure!');
		})

	}
};

// ########################################################################

const getAllExistGroupInfo = (data) => ({
	type: constants.GET_ALL_GROUP_INFO,
	allGroupInfo: fromJS(data)
});

// assignment_id, get all groups info under same assn
export const getAllGroupInfo = (token, assignment_id) => {
	const URL = baseURL + '/group/all?assignment_id=' + assignment_id;
	const axiosConfig = {
		headers: {
			"accept": "application/json",
			"Authorization": token
		}
	};
	return (dispatch) => {
		axios.get(URL, axiosConfig).then((res) => {
			console.log(res)
			dispatch(getAllExistGroupInfo(res.data));
		}).catch(() => {
			console.log('Get All Group Info Failure!');
		})
	}
};

const getGroupDetailInfo = (data) => ({
	type: constants.GET_GROUP_DETAIL_INFO,
	groupDetailInfo: fromJS(data)
});

// get group detail info
export const getGroupDetail = (token, groupId) => {
	const URL = baseURL + '/group/?group_id=' + groupId;
	const axiosConfig = {
		headers: {
			"accept": "application/json",
			"Authorization": token
		}
	};
	return (dispatch) => {
		axios.get(URL, axiosConfig).then((res) => {
			console.log(res)
			dispatch(getGroupDetailInfo(res.data.groupInfo));
		}).catch(() => {
			console.log('Get Group Detail Info Failure!');
		})
	}
};

// create group
export const createNewGroup = (token, currentAssignmentID, createGroupTitle, createGroupPreTopic, createFront, createBack) => {
	const URL = baseURL + '/group/create';
	const axiosConfig = {
		headers: {
			"accept": "application/json",
			'Content-Type':'application/json',
			"Authorization": token
		}
	};
	const sendData = {
		"assignment_id": currentAssignmentID,
		"title": createGroupTitle,
		"topic": createGroupPreTopic,
		"backend_skill": createFront,
		"frontend_skill": createBack
	};
	return (dispatch) => {
		axios.post(URL, sendData, axiosConfig).then((res) => {
			console.log(res)
			// creategroup，then get all group info
			dispatch(getAllGroupInfo(token, currentAssignmentID));
		}).catch(() => {
			console.log('Create Group Failure!');
		})
	}
};


// match a group
export const matchGroup = (token, currentAssignmentID, matchGroupPreTopic, matchFront, matchBack) => {
	const URL = baseURL + '/group/match';
	const AxiosConfig = {
		headers: {
			"accept": "application/json",
			'Content-Type':'application/json',
			"Authorization": token
		}
	};
	const sendData = {
		"assignment_id": currentAssignmentID,
		"topic": matchGroupPreTopic, 
		"backend_skill": matchFront,
		"frontend_skill": matchBack
	};
	return (dispatch) => {
		axios.post(URL, sendData, AxiosConfig).then((res) => {

			console.log(res)
			// after match group后，reget all group info
			if (res.status === 200) {
				if (res.data.message === "success") {
					dispatch(getAllGroupInfo(token, currentAssignmentID));
				} else {
					alert(res.data.message);
				}
			} else {
				alert("Match Group Failure");
			}
		})
	}
};

// join group
export const confirmJoinGroup = (token, currentAssignmentID, join_group_skill, join_group_id) => {
	const URL = baseURL + '/group/member?skill=' + join_group_skill + '&group_id=' + join_group_id;
	return (dispatch) => {
		// axios.post(URL, AxiosConfig).then((res) => {
		axios({
			method: 'post',
			url: URL,
			headers: {
				"accept": "application/json",
				"Authorization": token
			}
		}).then((res) => {
			console.log(res);
			dispatch(getAllGroupInfo(token, currentAssignmentID));
		}).catch(() => {
			console.log('Confirm Join Group Failure!');
		})
	}
};

// leave group
export const confirmLeaveGroup = (token, currentAssignmentID, groupId) => {
	const URL = baseURL + '/group/leave?group_id=' + groupId;
	const AxiosConfig = {
		headers: {
			"accept": "application/json",
			"Authorization": token
		}
	};
	return (dispatch) => {
		axios.get(URL, AxiosConfig).then((res) => {
			dispatch(getAllGroupInfo(token, currentAssignmentID));
		}).catch(() => {
			console.log('Confirm Leave Group Failure!');
		})
	}
};
// ########################################################################

// put new assn
export const putNewAssn = (token, course_id, assnTitle, publish_date, due_date, group_size, all_topics, content) => {
	const URL = baseURL + '/course/assignment';
	const AxiosConfig = {
		headers: {
			"accept": "application/json",
			'Content-Type':'application/json',
			"Authorization": token
		}
	};
	const sendData = {
		"course_id": course_id,
		"title": assnTitle, 
		"publish_date": publish_date,
		"due_date": due_date,
		"group_size": group_size,
		"all_topics": all_topics, 
		"content": content,
	}
	return (dispatch) => {
		axios.post(URL, sendData, AxiosConfig).then((res) => {
			console.log(res)
			dispatch(CourseActionCreators.getAssnInfo(token, course_id));
		}).catch(() => {
			console.log('putNewAssn Failure!');
		})
	}
};


const getStaffInfo = (data) => ({
	type: constants.COURSE_STAFF_INFO,
	courseStaffInfo: fromJS(data)
});

// get course staff info
export const getCourseStaffInfo = (token, course_id) => {
	const URL = baseURL + '/course/staff?course_id=' + course_id;
	const AxiosConfig = {
		headers: {
			"accept": "application/json"
		}
	};
	return (dispatch) => {
		// return [id, lecturer_id, course_id, term] array
		axios.get(URL, AxiosConfig).then((res) => {
			// then match staff detail info
			const config = {
				headers: {
					"accept": "application/json",
					"Authorization": token
				}
			};
			let courseStaffDetail = [];
			let promises = [];
			res.data.forEach(element => {
				const userURL = baseURL + '/user/?user_id=' + element.lecturer_id;
				const result = axios.get(userURL, config);
				promises.push(result);
			});
			Promise.all(promises).then((val) => {
				val.forEach((item) => { 
					courseStaffDetail.push(item.data); 
				})
			}).catch(() => {
				console.log("getCourseStaffDetail Failure!");
			});
			console.log(courseStaffDetail)
			dispatch(getStaffInfo(courseStaffDetail));

		}).catch(() => {
			console.log('getCourseStaffInfo Failure!');
		})
	}
};

const getResourceInfo = (data) => ({
	type: constants.COURSE_RESOURCE_INFO,
	courseResourceInfo: fromJS(data)
});

//  get course lecture info
export const getCourseResourceInfo = (course_id) => {
	const URL = baseURL + '/course/resource/all?course_id=' + course_id;
	const AxiosConfig = {
		headers: {
			"accept": "application/json"
		}
	};
	return (dispatch) => {
		axios.get(URL, AxiosConfig).then((res) => {
			console.log(res)
			dispatch(getResourceInfo(res.data))
		}).catch(() => {
			console.log('getCourseResourceInfo Failure!');
		})
	}
};


const getDetailResource = (data) => ({
	type: constants.COURSE_RESOURCE_DETAIL,
	courseResourceDetail: fromJS(data)
});

//  getResourceDetail 
export const getResourceDetail = (resource_id) => {
	const URL = baseURL + '/course/resource?resource_id=' + resource_id;
	const AxiosConfig = {
		headers: {
			"accept": "application/json"
		}
	};
	return (dispatch) => {
		axios.get(URL, AxiosConfig).then((res) => {
			console.log(res)
			dispatch(getDetailResource(res.data))
		}).catch(() => {
			console.log('getResourceDetail Failure!');
		})
	}
};

// post course lecture info
export const postCourseResource = (token, course_id, resourceTime, resourceTitle, resourceContent) => {
	const URL = baseURL + '/course/resource';
	const AxiosConfig = {
		headers: {
			"accept": "application/json",
			"Authorization": token,
			'Content-Type':'application/json'
		}
	};
	const sendData = {
		"course_id": course_id,
		"title": resourceTitle, 
		"group": resourceTime,
		"content": resourceContent
	}
	return (dispatch) => {
		axios.post(URL, sendData, AxiosConfig).then((res) => {
			console.log(res)
			dispatch(getCourseResourceInfo(course_id));
		}).catch(() => {
			console.log('postCourseResource Failure!');
		})
	}
};


const getCourseThreads = (data) => ({
	type: constants.COURSE_THREADS,
	courseThreads: fromJS(data)
});

//  get course threads
export const getThreads = (token, course_id) => {
	const URL = baseURL + '/thread/course?course_id=' + course_id;
	const AxiosConfig = {
		headers: {
			"accept": "application/json",
			"Authorization": token
		}
	};
	return (dispatch) => {
		axios.get(URL, AxiosConfig).then((res) => {
			console.log(res)
			dispatch(getCourseThreads(res.data))
		}).catch(() => {
			console.log('getThreads Failure!');
		})
	}
};


// postThreads
export const postThreads = (token, course_id, threadTitle, threadContent) => {
	const URL = baseURL + '/thread/';
	const AxiosConfig = {
		headers: {
			"accept": "application/json",
			'Content-Type':'application/json',
			"Authorization": token,
		}
	};
	const sendData = {
		"course_id": course_id,
		"title": threadTitle, 
		"content": threadContent
	}
	return (dispatch) => {
		axios.post(URL, sendData, AxiosConfig).then((res) => {
			console.log(res)
			dispatch(getThreads(token, course_id))
		}).catch(() => {
			console.log('postThreads Failure!');
		})
	}
};



const getComments = (data) => ({
	type: constants.GET_THREAD_COMMENTS,
	threadComments: fromJS(data)
});

//  getThreadComments
export const getThreadComments = (token, thread_id) => {
	const URL = baseURL + '/thread/comment?thread_id=' + thread_id;
	const AxiosConfig = {
		headers: {
			"accept": "application/json",
			"Authorization": token,
		}
	};
	return (dispatch) => {
		axios.get(URL, AxiosConfig).then((res) => {
			console.log(res)
			dispatch(getComments(res.data))
		}).catch(() => {
			console.log('getThreadComments Failure!');
		})
	}
};

// postThreadComments
export const postThreadComments = (token, thread_id, content, publisher_id, course_id) => {
	const URL = baseURL + '/thread/comment';
	const AxiosConfig = {
		headers: {
			"accept": "application/json",
			'Content-Type':'application/json',
			"Authorization": token,
		}
	};
	const sendData = {
		"thread_id": thread_id,
		"content": content,
		"publisher_id": publisher_id
	}
	return (dispatch) => {
		axios.post(URL, sendData, AxiosConfig).then((res) => {
			console.log(res)
			dispatch(getThreads(token, course_id))
			// dispatch(getThreadComments(token, thread_id))
		}).catch(() => {
			console.log('postThreadComments Failure!');
		})
	}
};

// upVote Thread
export const upVoteThread = (token, course_id, thread_id) => {
	const URL = baseURL + '/thread/up_vote?thread_id=' + thread_id;
	return (dispatch) => {
		// axios.post(URL, config).then((res) => {
		axios({
			method: 'post',
			url: URL,
			headers: {
				"accept": "application/json",
				"Authorization": token
			}
		}).then((res) => {
			console.log(res);
			dispatch(getThreads(token, course_id));
		}).catch(() => {
			console.log('upVoteThread Failure!');
		})
	}
};











