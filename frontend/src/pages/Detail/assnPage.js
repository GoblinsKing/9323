import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import * as helpers from '../../helpers.js';
import MenuBlock from './menuBlock';
import { ContentWrapper, Nav, AssignmentBlock, ShowGroupPage, CreateButton, 
	PostComment, PostThreadWrapper, InputWindow, PostButton, Comment} from './style';


const groupTypes = [
	{id: 1, type: "Assignment1" },
	{id: 2, type: "Assignment2"},
	{id: 3, type: "Project1"},
	{id: 4, type: "Project2"},
	{id: 5, type: "hw1"},
	{id: 6, type: "hw2"}
]


class AssnPage extends Component {

	constructor(props) {
		super(props);
		const {  userAllCourses, whichCourse} = this.props;
		let course_id1 = null;
		userAllCourses.forEach(element => {
			if (element.get("code") === whichCourse){
				course_id1 = element.get("id");
			}
		});

		this.state = { 
			existAssnStatus: true,
			putAssnStatus: false,
			assnTitle: groupTypes[0]["type"],
			due_date: '',
			group_size: '',
			all_topics: '',
			content: '',
			course_id: course_id1,
			threadTitle: '',
			threadContent: '',
			postThreadStatus: false,
			commentIconId: '',
			comment_status: false,
			assnComment: ''
		};
	}

	assnTimeLeft(){
		const due_date = this.props.assnInfo.get("due_date");
		let end_time = new Date(due_date).getTime();
		let now_time = new Date().getTime();
		let leftTime = (end_time - now_time) / 86400000;
		if (leftTime < 0){
			leftTime = 0;
		}
		return Math.round(leftTime);
	}

	// only one assn at the same time
	existAssnInfo(assnInfo){
		const { whichCourse, whichPage } = this.props;
		// return assnInfo.map((item) => {
			return (
				<div className="phaseDoing" key={assnInfo.get("id")}>
					<Link to={`/${whichCourse}/${whichPage}/assnDetail`} className="assnTitle">
						<span onClick={ () => {} }>{ assnInfo.get("title") }</span>
					</Link>
					<button className="assButton submit">Submit</button>
					<button className="assButton download">Download</button>
			<button className="assButton doing">{`${this.assnTimeLeft()} days left`}</button>
				</div>
			)
		// }) 
	}

	// post threads modal
	post_Threads(){
		const { course_id, threadTitle, threadContent } = this.state;
		return (
            <PostThreadWrapper>
                <div className="modal">
					<div className="modal-post-notice">Post Comments</div>

                    <div className="modal-title">
						<div className="title">Title:</div>
						<input className="title-input"
							   value={ this.state.threadTitle }
							   onChange={ (e) => { this.setState({ threadTitle: e.target.value }) }}></input>
					</div>

                    <div className="modal-content">
						<div className="content">Content:</div>
						<textarea className="content-input"
								  value={ this.state.threadContent }
								  onChange={ (e) => { this.setState({ threadContent: e.target.value }) }}></textarea>
					</div>

                    <div className="modal-operator">
                        <button 
                            className="modal-operator-button close"
							onClick = { () => { this.setState({ postThreadStatus: false }) }}
                        >Cancel</button>
                        <button 
							className="modal-operator-button confirm"
							onClick = { () => { this.setState({ postThreadStatus: false });
												this.props.postThreads(this.props.token, course_id, threadTitle, threadContent)}}
                        >Confirm</button>
                    </div> 
                </div>
                <div 
                    className="mask"
					onClick = { () => { this.setState({ postThreadStatus: false }) }}
                ></div>
            </PostThreadWrapper>
        )
	}

	// assn page all details
	assignmentPage(){
		const { assnInfo } = this.props;
		const { course_id } = this.state;
		return (
			<AssignmentBlock>
				{
					this.props.userInfo.get("role") === "student"  ? 
					null : 
					<Fragment>
						<CreateButton  value={ this.state.existAssnStatus } 
									onClick={ () => { this.setState({ existAssnStatus: true, putAssnStatus: false }) }}>
							Exist Assnignments
						</CreateButton>
						<CreateButton value={ this.state.putAssnStatus }
									onClick={ () => { this.setState({ putAssnStatus: true, existAssnStatus: false }) }}>
							Create a New Assnignment
						</CreateButton>
					</Fragment>
				}
				<div className="taskBlock">
					{/* shwo exist assn info or not */}
					{  this.state.existAssnStatus ? 
					  ( assnInfo ? (assnInfo.get("course_id") === course_id ? this.existAssnInfo(assnInfo) : null) : null) : 
					   this.assnCreate() }
				</div>
				<div className="allComments">
					<div className="commentHeader">All Comments</div>
					<PostComment
						   value={this.state.postThreadStatus}
						   onChange={(e) => this.setState({})}
						   onClick={()=>{ this.setState({postThreadStatus: true}) }}>
						Post New Comment
					</PostComment>
					{
						this.state.postThreadStatus ?  
						this.post_Threads() :
						null
					}
					{ this.handleAssnThreads() }
				</div>
			</AssignmentBlock>
		)
	}
	
	// threads module
    handleAssnThreads(){
		const { token,  userInfo, } = this.props;
		const { assnComment, course_id } = this.state;
		if (this.props.courseThreads){
			//  sort Threads by time and upvotes
			let sortThreads = helpers.sortThreads(this.props.courseThreads)
			return sortThreads.map((item)=>{
				return (
					//  format threads
					<div key={item.get('id')} className="generalInfo">
						<p className="commentTitle">{item.get('title')}</p>
						<p className="content">{item.get('content')}</p>
						{/* below content */}
						<div className="poster_time">
							Post By
							<span className="poster">{ item.get('publisher_name') }</span>
							{ helpers.formatTime(new Date().getTime()) }
						</div>
						<div className="actionAndIcon">	
							<span className="actionset">
								<span className="action" 
									  onClick={ () => {this.setState({commentIconId: item.get('id'), comment_status: !this.state.comment_status});}}>
									Reply
								</span>
								{/* <span className="action">Delete</span> */}
							</span>
							{/* Votes Icon */}
							<div className="iconSet">
								<span className="iconfont iconColor" 
									onClick={ () => { this.props.upVoteThread(this.props.token, course_id, item.get('id'))}}>&#xe621;
								</span>
								<span className="num">{item.get('up_vote')}</span>
							</div>
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
											value={ this.state.assnComment }
											onChange={ (e) => { this.setState({ assnComment: e.target.value }) }}>></InputWindow>
								<PostButton 
									onClick={ () => { this.setState({comment_status: false});
													this.props.postThreadComments(token, item.get('id'), assnComment, userInfo.get('id'), course_id) }}>
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

	assnCreate() {
		const { course_id, assnTitle, due_date, group_size, all_topics, content } = this.state;
		return(
			<ShowGroupPage>
				<div className="groupCreateOrMatch">

				<div className="groupCreate">
					<div className="navHead">Create A New Assnignment</div>

					<div className="navAllContent">
						{/* title */}
						<div className="navContent">
							<div className="groupMenu name">Assn Title:</div>
							{/* <input placeholder="Input Assn Title" 
									className="groupInput"
									value={ this.state.assnTitle }
									onChange={ (e) => { this.setState({ assnTitle: e.target.value }) }}></input> */}
							<select className="groupInput"
									value={ this.state.assnTitle }
									onChange={ (e) => { this.setState({ assnTitle: e.target.value }) }}> 
							{  
								groupTypes.map((item) => {
									return (
										<option key={item.id} value={item.type}>{item.type}</option>
									)
								})
							}
							</select> 
						</div>
						{/* due_date */}
						<div className="navContent">
							<div className="groupMenu type">Due Date:</div>
							<input placeholder="Input Assn Due Date" 
									className="groupInput"
									value={ this.state.due_date }
									onChange={ (e) => { this.setState({ due_date: e.target.value }) }}></input>
						</div>
						{/* group_size */}
						<div className="navContent">
							<div className="groupMenu type">Group Size:</div>
							<input placeholder="Input Group Size"
								   className="groupInput"
								   value={ this.state.group_size }
								   onChange={ (e) => { this.setState({ group_size: e.target.value }) }}></input>
						</div>
						{/* all_topics */}
						<div className="navContent">
							<div className="groupMenu type">All Topics:</div>
							<input placeholder="Input Assn Topics Which Divided By '|' " 
									className="groupInput"
									value={ this.state.all_topics }
									onChange={ (e) => { this.setState({ all_topics: e.target.value }) }}></input>
						</div>
						{/* content */}
						<div className="navContent">
							<div className="groupMenu type">Description:</div>
							<input placeholder="Input A Description" 
									className="groupInput"
									value={ this.state.content }
									onChange={ (e) => { this.setState({ content: e.target.value }) }}></input>
						</div>
				
					</div>
					<CreateButton className="confirm" 
						onClick={ () => { this.setState({ putAssnStatus: false, existAssnStatus: true });
						                  this.props.putNewAssn(this.props.token, course_id, assnTitle, new Date().getTime(), due_date, group_size, all_topics, content) }}>
						Confirm
					</CreateButton>
				</div>

				</div>
			</ShowGroupPage>
		)
	}
	
	render() {
        return (
            <ContentWrapper>
                <Nav>
                    <MenuBlock />
                    { this.assignmentPage()}
                </Nav>
            </ContentWrapper>
        )
	}

	componentDidMount(){
		this.props.getThreads(this.props.token, this.state.course_id);
	}
}

const mapState = (state) => {
	return {
		userInfo: state.getIn(["login", "userInfo"]),
		token: state.getIn(["login", "token"]),
		userAllCourses: state.getIn(["login", "userAllCourses"]),
		generalList: state.getIn(["home", "generalList"]),
		whichCourse: state.getIn(["detail", "whichCourse"]),
		whichPage: state.getIn(["detail", "whichPage"]),
		assnInfo: state.getIn(["course", "assnInfo"]),
		courseThreads: state.getIn(["detail", "courseThreads"]),
		threadComments:  state.getIn(["detail", "threadComments"]),
		currentUpvotes: state.getIn(["detail", "currentUpvotes"]),
	}
};

const mapDispatch = (dispatch) => ({
	putNewAssn(token, course_id, assnTitle, publish_date, due_date, group_size, all_topics, content) {
		dispatch(actionCreators.putNewAssn(token, course_id, assnTitle, publish_date, due_date, group_size, all_topics, content));
	},
	getThreads(token, course_id){
		dispatch(actionCreators.getThreads(token, course_id));
	},
	postThreads(token, course_id, threadTitle, threadContent){
		dispatch(actionCreators.postThreads(token, course_id, threadTitle, threadContent));
	},
	getThreadComments(token, thread_id){
		dispatch(actionCreators.getThreadComments(token, thread_id));
	},
	postThreadComments(token, thread_id, content, publisher_id, course_id){
		dispatch(actionCreators.postThreadComments(token, thread_id, content, publisher_id, course_id));
	},
	upVoteThread(token, course_id, thread_id){
		dispatch(actionCreators.upVoteThread(token, course_id, thread_id));
	}
});


export default connect(mapState, mapDispatch)(AssnPage);



