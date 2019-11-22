import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ContentWrapper, Nav } from './style';
import { actionCreators as DetailActionCreators } from '../../pages/Detail/store';


class More extends Component {

	render() {
		const whichCourse = this.props.match.params.id;
		const whichMore = this.props.match.params.more;
		const { loginStatus, assnInfo, groupDetailInfo, courseResourceDetail } = this.props;
		this.props.whichDetailMore(whichMore);
		if (loginStatus) {
			if (whichMore === "assnDetail") {
				return (
					<ContentWrapper>
						<Nav>
							<div className="moreTitle">{`${whichCourse}: ${assnInfo.get("title")}`}</div>
							<div className="moreContent">{assnInfo.get("content")}</div>
						</Nav>
					</ContentWrapper>
					
				)
			} else if (whichMore === "groupDetail") {
				return (
					<ContentWrapper>
						<Nav>
							<div className="moreTitle">{`${whichCourse}: ${groupDetailInfo.get("title")}`}</div>
							<div className="moreContent">{`Topic: ${groupDetailInfo.get("topic")}`}</div>
							<div className="moreContent">{`num_member: ${groupDetailInfo.get("num_member")}`}</div>
							<div className="moreContent">{`num_backend: ${groupDetailInfo.get("num_backend")}`}</div>
							<div className="moreContent">{`num_frontend: ${groupDetailInfo.get("num_frontend")}`}</div>
						</Nav>
					</ContentWrapper>
					
				)
			} else if (whichMore === "resourceDetail") {
				return (
					<ContentWrapper>
						<Nav>
							<div className="moreTitle">{`${whichCourse}: ${courseResourceDetail.get("title")}`}</div>
							<div className="moreContent">{courseResourceDetail.get("content")}</div>
						</Nav>
					</ContentWrapper>
					
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
		assnInfo: state.getIn(["course", "assnInfo"]),
		groupDetailInfo: state.getIn(["detail", "groupDetailInfo"]),
		courseResourceDetail: state.getIn(["detail", "courseResourceDetail"])
	}
}

const mapDispatch = (dispatch) => ({
	whichDetailMore(whichMore) {
		dispatch(DetailActionCreators.whichDetailMore(whichMore));
	}

});

export default connect(mapState, mapDispatch)(More);
