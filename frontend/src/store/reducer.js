import { combineReducers } from 'redux-immutable';
import { reducer as homeReducer } from '../pages/Home/store';
import { reducer as courseReducer } from '../pages/Course/store';
import { reducer as loginReducer } from '../pages/Login/store';
import { reducer as detailReducer } from '../pages/Detail/store';



// redux package include combineReducer function
// redux-immutable combineReducer function create immutable object
// then state become an immutable object
const reducer = combineReducers({
	home: homeReducer,
	course: courseReducer,
	login: loginReducer,
	detail: detailReducer
});

export default reducer;