import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
	menuStatus: true,
	whichCourse: null,
	whichPage: null,
	whichMore: null,
	publicChatRoomID: null,
	groupChatRoomID: null,
	PublicMessages: null,
	GroupMessages: null,
	searchMessages: null,
	groupDetailInfo: [],
	allGroupInfo: [],
	courseStaffInfo: [],
	courseResourceInfo: [],
	courseResourceDetail: [],
	courseThreads: [],
	threadComments: [],
	currentUpvotes: 0
});

export default (state = defaultState, action) => {
	switch(action.type) {
		case constants.MATCH_PARAMS:
			return state.merge({
				whichCourse: action.whichCourse,
				whichPage: action.whichPage
			});
		case constants.MATCH_MORE:
			return state.set('whichMore', action.whichMore);
		case constants.GET_MENU_STATUS:
			return state.set('menuStatus', action.menuStatus);

		case constants.GET_PUBLIC_CHATROOM_ID:
			return state.set('publicChatRoomID', action.publicChatRoomID);
		case constants.GET_GROUP_CHATROOM_ID:
			return state.set('groupChatRoomID', action.groupChatRoomID);
		case constants.GET_PUBLIC_CHAT_MESSAGE:
			return state.set('PublicMessages', action.PublicMessages);
		case constants.GET_GROUP_CHAT_MESSAGE:
			return state.set('GroupMessages', action.GroupMessages);
		case constants.GET_SEARCH_MESSAGE:
			return state.set('searchMessages', action.searchMessages);
			
		case constants.GET_GROUP_DETAIL_INFO:
			return state.set('groupDetailInfo', action.groupDetailInfo);
		case constants.GET_ALL_GROUP_INFO:
			return state.set('allGroupInfo', action.allGroupInfo);
			
		case constants.COURSE_STAFF_INFO:
			return state.set('courseStaffInfo', action.courseStaffInfo);
		case constants.COURSE_RESOURCE_INFO:
			return state.set('courseResourceInfo', action.courseResourceInfo);
		case constants.COURSE_RESOURCE_DETAIL:
			return state.set('courseResourceDetail', action.courseResourceDetail);
		case constants.COURSE_THREADS:
			return state.set('courseThreads', action.courseThreads);
		case constants.GET_THREAD_COMMENTS:
			return state.set('threadComments', action.threadComments);
		case constants.GET_UPVOTES:
			return state.set('currentUpvotes', action.currentUpvotes);
		default:
			return state;
	}
};

