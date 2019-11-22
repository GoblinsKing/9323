import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
	courseList: null
});

export default (state = defaultState, action) => {
	switch(action.type) {
		case constants.GET_COURSE_LIST:
			return state.set('courseList', action.courseList);
		default:
			return state;
	}
};


