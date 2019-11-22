import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
	assnInfo: [],
	courseNotice: null
});

export default (state = defaultState, action) => {
	switch(action.type) {
		case constants.GET_ASSN_INFO:
			return state.set('assnInfo', action.assnInfo);
		case constants.GET_NOTICE_INFO:
			return state.set('courseNotice', action.courseNotice);
		
		default:
			return state;
	}
};


