import { combineReducers } from 'redux-immutable';
import { reducer as homeReducer } from '../pages/Home/store';
import { reducer as courseReducer } from '../pages/Course/store';
import { reducer as loginReducer } from '../pages/Login/store';
import { reducer as searchReducer } from '../pages/Search/store';
import { reducer as detailReducer } from '../pages/Detail/store';



// redux包也有combineReducer函数
// redux-immutable的combineReducer函数生成的内容就是immutable对象
// 这样state也变成了一个immutable对象
const reducer = combineReducers({
	home: homeReducer,
	course: courseReducer,
	login: loginReducer,
	search: searchReducer,
	detail: detailReducer
});

export default reducer;