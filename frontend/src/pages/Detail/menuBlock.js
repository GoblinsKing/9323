import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import { ContentHeader, MenuButton, ContentMenu } from './style';


import homeImage from '../../statics/coursePages/home.jpeg';
import staffImage from '../../statics/coursePages/staff.png';
import groupImage from '../../statics/coursePages/group.png';
import chatImage from '../../statics/coursePages/chat.png';
import assnImage from '../../statics/coursePages/assn.png';
import lectureImage from '../../statics/coursePages/lecture.png';


// common component in all detail pages
class MenuBlock extends Component {
	
	detailContentHeader() {
		const courseName = this.props.whichCourse;
		const { userAllCourses } = this.props;
		var courseTitle = null;
		userAllCourses.forEach(element => {
			if (element.get("code") === courseName)
				courseTitle = element.get("title")
		});
		return (
			<ContentHeader>
				<MenuButton onClick={ () => this.props.menuToggle(this.props.menuStatus) }>Menu Toggle</MenuButton>
				<div className="courseInfo">
					<span className="courseTitle">{courseTitle}</span>
					<span className="courseName">{ courseName }</span>
					<span className="courseTerm">19T3</span>
				</div>
			</ContentHeader>
		)
	}

	detailContentMenu(){
		const courseName = this.props.whichCourse;
		return (
			<ContentMenu>
				{/* Home */}
				<div className="menuBlock">
					<Link to={`/${courseName}`}>
						<img src={ homeImage } className="menuImg" alt=""/>
					</Link>
					<div className="imgWord">Home</div>
				</div>
				{/* Staff */}
				<div className="menuBlock">
					<Link to={`/${courseName}/staff`}>
						<img className="menuImg" src={ staffImage } alt=""/>
					</Link>
					<div className="imgWord">Staff</div>
				</div>
				{/* Chat */}
				<div className="menuBlock">
					<Link to={`/${courseName}/chat`}>
						<img className="menuImg" src={ chatImage } alt=""/>	
					</Link>
					<div className="imgWord">Chat</div>
				</div>
				{/* Group */}
				<div className="menuBlock">
					<Link to={`/${courseName}/group`}>
						<img className="menuImg" src={ groupImage } alt=""/>
					</Link>
					<div className="imgWord">Group</div>
				</div>
				{/* Lecture */}
				<div className="menuBlock">
					<Link to={`/${courseName}/lecture`}>
						<img className="menuImg" src={ lectureImage } alt=""/>
					</Link>
					<div className="imgWord">Lecture</div>
				</div>
				{/* Assignment */}
				<div className="menuBlockRight">
					<Link to={`/${courseName}/assignment`}>
						<img className="menuImg" src={ assnImage } alt=""/>
					</Link>
					<div className="imgWord">Assignment</div>
				</div>
			</ContentMenu>	
		)
	}
	
	render() {
		return (
			<Fragment>
				{ this.detailContentHeader() }
				{ this.props.menuStatus ?  this.detailContentMenu() : null }
			</Fragment>	
		) 
    }
}

const mapState = (state) => {
	return {
		menuStatus: state.getIn(["detail", "menuStatus"]),
		userAllCourses: state.getIn(["login", "userAllCourses"]),
		whichCourse: state.getIn(["detail", "whichCourse"]),
		whichPage: state.getIn(["detail", "whichPage"])
	}
};

const mapDispatch = (dispatch) => ({
	menuToggle(menuStatus) {
		dispatch(actionCreators.menuShow(menuStatus));
	}

});

export default connect(mapState, mapDispatch)(MenuBlock);



