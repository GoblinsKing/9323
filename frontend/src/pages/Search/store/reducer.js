import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
	searchResult: []
});

export default (state = defaultState, action) => {
	switch(action.type) {
		case constants.GET_SEARCH_INFO:
			return state.merge({
				searchResult: action.searchResult
			});
		default:
			return state;
	}
}
