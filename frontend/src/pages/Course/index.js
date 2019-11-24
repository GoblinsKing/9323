import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import * as helpers from '../../helpers.js';
import { actionCreators as DetailActionCreators } from '../../pages/Detail/store';
import { ContentWrapper, Nav, ContentHeader, MenuButton, 
	ContentMenu, PostButton, ContentNotice, ContentDue, ModalWrapper } from './style';

import homeImage from '../../statics/coursePages/home.jpeg';
import staffImage from '../../statics/coursePages/staff.png';
import groupImage from '../../statics/coursePages/group.png';
import chatImage from '../../statics/coursePages/chat.png';
import assnImage from '../../statics/coursePages/assn.png';
import lectureImage from '../../statics/coursePages/lecture.png';



class Course extends Component {

	constructor(props) {
		super(props);
		
		const whichCourse = this.props.match.params.id;
		const {  userAllCourses } = this.props;
		let course_id1 = null;
		userAllCourses.forEach(element => {
			if (element.get("code") === whichCourse){
				course_id1 = element.get("id");
			}
		});
		this.state = { 
			course_id: course_id1,
			postButtonStatus: false,
			noticeTitle: '',
			noticeContent: ''
		};

	}

	calculateTimeRate(){
		const publish_date = this.props.assnInfo.get("publish_date");
		const due_date = this.props.assnInfo.get("due_date");
		let start_time = new Date(publish_date).getTime();
		let end_time = new Date(due_date).getTime();
		let now_time = new Date().getTime();
		let rate = Math.round((now_time - start_time) / (end_time - start_time) * 100);
		if (rate > 100) {
			rate = 100;
		}
		return String(rate) + "%";
	}

	post_notice(){
		const { course_id, noticeTitle, noticeContent } = this.state;
		const { token, userInfo } = this.props;
		return (
            <ModalWrapper>
                <div className="modal">
					<div className="modal-post-notice">Post Notice</div>

                    <div className="modal-title">
						<div className="title">Title:</div>
						<input className="title-input"
							   value={ this.state.noticeTitle }
							   onChange={ (e) => { this.setState({ noticeTitle: e.target.value }) }}></input>
					</div>

                    <div className="modal-content">
						<div className="content">Content:</div>
						<textarea className="content-input"
								  value={ this.state.noticeContent }
								  onChange={ (e) => { this.setState({ noticeContent: e.target.value }) }}></textarea>
					</div>

                    <div className="modal-operator">
                        <button 
                            className="modal-operator-button close"
							onClick = { () => { this.setState({ postButtonStatus: false }) }}
                        >Cancel</button>
                        <button 
                            className="modal-operator-button confirm"
							onClick = { () => { this.setState({ postButtonStatus: false });
												this.props.postCourseNotice(token, course_id, noticeTitle, noticeContent, userInfo.get('id'))}}
                        >Confirm</button>
                    </div> 
                </div>
                <div 
                    className="mask"
					onClick = { () => { this.setState({ postButtonStatus: false }) }}
                ></div>
            </ModalWrapper>
        )
	}

	show_notice(notices){
		if (notices) {
			let reverseNotices = notices.reverse()
			return reverseNotices.map((item) => {
				if (item.get("course_id") === this.state.course_id){
					return (
						<div className="noticeInfo" key={item.get('id')}>
						<h4 className="title">{item.get('title')}</h4>
						<p className="content">{item.get('content')}</p>
						<div className="poster_time">
							Post by
							<span className="poster">{this.props.userInfo.get('name')}</span>
							{ helpers.formatTime(new Date().getTime())}
						</div>
					</div>
					)
				}
				return null;
			})
		}
	}

	render() {
		const { loginStatus, userAllCourses } = this.props;
		const courseName = this.props.match.params.id;
		var courseTitle = null;
		userAllCourses.forEach(element => {
			if (element.get("code") === courseName)
				courseTitle = element.get("title")
		});
		
		if (loginStatus) {
			return (
				<ContentWrapper>
					<Nav>
						<ContentHeader>
							<Link to={`/${courseName}`}>
								<MenuButton>Home</MenuButton>
							</Link>
							<div className="courseInfo">
								<span className="courseTitle">{ courseTitle }</span>
								<span className="courseName">{ courseName }</span>
								<span className="courseTerm">19T3</span>
							</div>
						</ContentHeader>
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

						{
							this.props.userInfo.get("role") === "student"  ? 
							null : 
							<PostButton value={this.state.postButtonStatus}
										onClick={()=>{ this.setState({postButtonStatus: !this.state.postButtonStatus}) }}>
								Post Notice
							</PostButton>
						}
						{
							this.state.postButtonStatus ?  
							this.post_notice() :
							null
						}
						<ContentNotice>
						<div className="noticeBlock">Notice</div>
						{ this.show_notice(this.props.courseNotice) }
						</ContentNotice>

						<ContentDue>
							<div className="noticeBlock">Due Dates</div>
							{/* Due Block*/}
							<div className="dueBlock">
								<div className="base">
									<div className="sixty" style={{width: this.calculateTimeRate()}}>{this.props.assnInfo.get("title")}</div>
								</div>
								<div className="num">{this.calculateTimeRate()}</div>
							</div>
							<div className="dueBlock">
								<div className="base">
									<div className="hundred">Project1</div>
								</div>
								<div className="num">100%</div>
							</div>
						</ContentDue>

					</Nav>
				</ContentWrapper>
			)
		} else {
			return (
				<ContentWrapper>
					<Nav>
						<div className="error">ERROR</div>
					</Nav>
				</ContentWrapper>
			)
		}
	}
	
	componentDidMount(){
		this.props.getAssnInfo(this.props.token, this.state.course_id);	
		this.props.getCourseNotice(this.state.course_id);
		this.props.getCourseStaffInfo(this.props.token, this.state.course_id);
	}


	UNSAFE_componentWillReceiveProps(nextProps){
	
		const whichCourse = nextProps.match.params.id;
		const { userAllCourses } = this.props;
		let course_id1 = null;
		userAllCourses.forEach(element => {
			if (element.get("code") === whichCourse){
				course_id1 = element.get("id");
			}
		});
		this.setState({course_id: course_id1})
		if (this.props !== nextProps) {
			// if course id has changed, get assnInfo and CourseNotice again
			if(this.props.match.params.id !== nextProps.match.params.id) {
				this.props.getAssnInfo(this.props.token, course_id1);	
				this.props.getCourseNotice(course_id1);
			}
		}
	}

}


const mapState = (state) => {
	return {
		loginStatus: state.getIn(["login", "loginStatus"]),
		userInfo: state.getIn(["login", "userInfo"]),
		enrollmentInfo: state.getIn(["login", "enrollmentInfo"]),
		token: state.getIn(["login", "token"]),
		userAllCourses: state.getIn(["login", "userAllCourses"]),
		whichCourse: state.getIn(["detail", "whichCourse"]),
		assnInfo: state.getIn(["course", "assnInfo"]),
		courseNotice:  state.getIn(["course", "courseNotice"]),
	}
};

const mapDispatch = (dispatch) => ({
	getAssnInfo(token, course_id) {
		dispatch(actionCreators.getAssnInfo(token, course_id));
	},
	getCourseNotice(course_id){
		dispatch(actionCreators.getCourseNotice(course_id));
	},
	postCourseNotice(token, course_id, title, content, publisher_id){
		dispatch(actionCreators.postCourseNotice(token, course_id, title, content, publisher_id));
	},
	getCourseStaffInfo(token, course_id) {
		dispatch(DetailActionCreators.getCourseStaffInfo(token, course_id));
	}

});

export default connect(mapState, mapDispatch)(Course);





