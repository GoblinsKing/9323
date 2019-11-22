import { combineReducers } from 'redux-immutable';
import { reducer as loginReducer } from '../pages/Login/store';
import { reducer as homeReducer } from '../pages/Home/store';
import { reducer as courseReducer } from '../pages/Course/store';
import { reducer as detailReducer } from '../pages/Detail/store';


const reducer = combineReducers({
	login: loginReducer,
	home: homeReducer,
	course: courseReducer,
	detail: detailReducer
});

export default reducer;