import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionCreators } from './store';
import { actionCreators as DetailActionCreators } from '../../pages/Detail/store';
import * as helpers from '../../helpers.js';
import { ContentWrapper, Nav, NavItem, 
	WelcomeBorder, Welcome,
	NavLeft, NavRight, Comment, InputWindow, PostButton, ModalWrapper } from './style';



class LoginHome extends Component {

	constructor(props){
		super(props);
		this.state = {
			createPostStatus: false,
			commentIconId: '',
			comment_status: false,
			generalPostTitle: '',
			generalPostContent: '',
			generalComment: ''
		}
	}

	create_general_post(){
		const { generalPostTitle, generalPostContent } = this.state;
		const { token } = this.props;
		return (
            <ModalWrapper>
                <div className="modal">
					<div className="modal-post-notice" >Create General Post</div>

                    <div className="modal-title">
						<div className="title">Title:</div>
						<input className="title-input"
								value={ this.state.generalPostTitle }
								onChange={ (e) => { this.setState({ generalPostTitle: e.target.value }) }}></input>
					</div>

                    <div className="modal-content">
						<div className="content">Content:</div>
						<textarea className="content-input"
									 value={ this.state.generalPostContent }
									 onChange={ (e) => { this.setState({ generalPostContent: e.target.value }) }}></textarea>
					</div>

                    <div className="modal-operator">
                        <button 
                            className="modal-operator-button close"
							onClick = { () => { this.setState({ createPostStatus: false }) }}
                        >Cancel</button>
                        <button 
							className="modal-operator-button confirm"
							// course_id set to 0 to judge is general or not
							onClick = { () => { this.setState({ createPostStatus: false });
												this.props.postGeneral(token, 0, generalPostTitle, generalPostContent) }}
                        >Confirm</button>
                    </div> 
                </div>
                <div 
                    className="mask"
					onClick = { () => { this.setState({ createPostStatus: false }) }}
                ></div>
            </ModalWrapper>
        )
	}


	handleCourseTable(){
		if (this.props.courseList) {
			return this.props.courseList.map((item)=>{
				return (
				<tr key={item.get('id')}>
					<td>
						<Link to={`/${item.get("code")}`}>
							<div className="courseCode" >{ item.get("code") }</div>
						</Link>																			
						{item.get('title')}															
					</td>
				</tr>
				)
			})
		}
	}

	handleGeneralInfo(){
		const { token,  userInfo, } = this.props;
		const { generalComment } = this.state;
 		if (this.props.courseThreads){
			let reverseCourseThreads = this.props.courseThreads.reverse()
			return reverseCourseThreads.map((item)=>{
				return (
					//  format general info
					<div key={item.get('id')} className="generalInfo">
						<p className="title">{item.get('title')}</p>
						<p className="content">{item.get('content')}</p>

						{/* below content */}
						<div className="poster_time">
							Post by
							<span className="poster">{ item.get('publisher_name') }</span>
							{ helpers.formatTime(new Date().getTime()) }
						</div>

						<div className="actionAndIcon">	
							<span className="action"
								  onClick={ () => {this.setState({commentIconId: item.get('id'), comment_status: !this.state.comment_status});}}>
								Reply
							</span>
							{/* Votes Icon */}
							<span className="iconSet">
								<span className="iconfont iconColor"
									 onClick={ () => { this.props.upVoteThread(token, 0, item.get('id'))}}>&#xe621;
								</span>
								<span className="num">{item.get('up_vote')}</span>
							</span>
							{/* Comments Icon */}
							<div className="iconSet">
								<span className="iconfont iconColor">&#xe66f;</span>
								<span className="num">{item.get('comments').count()}</span>
							</div>
						</div>
							
						{
							this.state.comment_status && this.state.commentIconId === item.get('id') ?
							<Fragment>
								<InputWindow placeholder="Post your comment"
											 value={ this.state.generalComment }
									 		 onChange={ (e) => { this.setState({ generalComment: e.target.value }) }}>
								</InputWindow>
								<PostButton
									onClick={ () => { this.setState({comment_status: false});
													this.props.postGeneralComments(token, item.get('id'), generalComment, userInfo.get('id'), 0) }}>
									post
								</PostButton>
							</Fragment> : null
						}

						{
							item.get('comments').map((comment)=>{
								return (
									<Comment key={comment.get('id')}>
										<p>{comment.get('content')}</p>
										<div className="poster_time">
											Post by
											<span className="poster">{this.props.userInfo.get('name')}</span>
											{ helpers.formatTime(new Date().getTime()) }
										</div>	
									</Comment>
								)
							})
						}
					
					</div>
				)
			})
		}
	}

	render() {
        return (
            <ContentWrapper>
                <Nav>
                    <WelcomeBorder>
                        <Welcome>Welcome to UniLearn!</Welcome>
                    </WelcomeBorder>
                    <NavItem>
                        <NavLeft>
                            <table>
                                <tbody>
                                    <tr style={{background: "#eee", fontSize: "20px", 
                                                fontWeight: "bold", lineHeight: "50px"}}>
                                        <td>
                                        All Courses List
                                        </td>
                                    </tr>
                                { this.handleCourseTable() }
                                </tbody>
                            </table>
                        </NavLeft>
                        <NavRight>
                            <div className="generalHead">
                                General Information
                            </div>
							{/* control post */}
							<div 
								className="createGeneralInfo"
								onClick = {() => {this.setState({createPostStatus: true})}}
							>Create New Post</div>

							{
								this.state.createPostStatus ?
								this.create_general_post():
								null
							}
                            { this.handleGeneralInfo() }
                        </NavRight>
                    </NavItem>
                </Nav>
            </ContentWrapper>
        )  
	}

	componentDidMount() {
		// get data when course_id=0 
		this.props.getGeneral(this.props.token, 0);
		this.props.getAllCourses();
	}
}

const mapState = (state) => {
	return {
		loginStatus: state.getIn(["login", "loginStatus"]),
        courseList: state.getIn(["home", "courseList"]),
		userInfo: state.getIn(["login", "userInfo"]),
		token: state.getIn(["login", "token"]),
		generalList: state.getIn(["home", "generalList"]),
		commentStatus: state.getIn(["home", "commentStatus"]),
		courseThreads: state.getIn(["detail", "courseThreads"]),
		threadComments:  state.getIn(["detail", "threadComments"])
	}
};

const mapDispatch = (dispatch) => ({
	getAllCourses() {
		dispatch(actionCreators.getCourses());
	},
	// reuse assnpage, getThreads, postThreads Interface
	getGeneral(token, course_id){
		dispatch(DetailActionCreators.getThreads(token, course_id));
	},
	postGeneral(token, course_id, title, content){
		dispatch(DetailActionCreators.postThreads(token, course_id, title, content));
	},
	postGeneralComments(token, thread_id, content, publisher_id, course_id){
		dispatch(DetailActionCreators.postThreadComments(token, thread_id, content, publisher_id, course_id));
	},
	upVoteThread(token, course_id, thread_id){
		dispatch(DetailActionCreators.upVoteThread(token, course_id, thread_id));
	}
});

export default connect(mapState, mapDispatch)(LoginHome);





