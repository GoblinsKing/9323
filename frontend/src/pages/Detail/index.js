import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from './store';

import StaffPage from './staffPage';
import ChatPage from './chatPage';
import GroupPage from './groupPage';
import LecturePage from './lecturePage';
import AssnPage from './assnPage';
import { ContentWrapper, Nav } from './style';



class Detail extends Component {

	render() {
		const whichCourse = this.props.match.params.id;
		const whichPage = this.props.match.params.detail;
		this.props.matchParams(whichCourse, whichPage);
		// according whichPage, route to different Component
		if (this.props.loginStatus) {
			if (whichPage === "staff") {
				return (
					<StaffPage />
				)
			} else if (whichPage === "chat") {
				return (
					<ChatPage />
				)
			} else if (whichPage === "group") {
				return (
					<GroupPage />
				)
			} else if (whichPage === "lecture") {
				return (
					<LecturePage />
				)
			} else if (whichPage === "assignment") {
				return (
					<AssnPage />
				)
			}
		} 
		return (
			<ContentWrapper>
				<Nav>
					<div className="error">ERROR</div>
				</Nav>
			</ContentWrapper>
		)
	}

}

const mapState = (state) => {
	return {
		loginStatus: state.getIn(["login", "loginStatus"]),
		userInfo: state.getIn(["login", "userInfo"]),
		menuStatus: state.getIn(["detail", "menuStatus"])
	}
};

const mapDispatch = (dispatch) => ({
	menuToggle(menuStatus) {
		dispatch(actionCreators.menuShow(menuStatus));
	},
	matchParams(whichCourse, whichPage) {
		dispatch(actionCreators.matchParams(whichCourse, whichPage));
	}

});

export default connect(mapState, mapDispatch)(Detail);



