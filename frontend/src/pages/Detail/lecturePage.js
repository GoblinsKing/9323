import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import MenuBlock from './menuBlock';
import { ContentWrapper, Nav, LectureInfo, PostResourceButton, PostResourceWrapper } from './style';



const weeks = [
	{id: 1, time: "Week1" },
	{id: 2, time: "Week2"},
	{id: 3, time: "Week3"},
	{id: 4, time: "Week4"},
	{id: 5, time: "Week5"},
	{id: 6, time: "Week6"},
	{id: 7, time: "Week7" },
	{id: 8, time: "Week8"},
	{id: 9, time: "Week9"},
	{id: 10, time: "Week10"},
	{id: 11, time: "Week11"},
	{id: 12, time: "Week12"}
]



class LecturePage extends Component {

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
			course_id: course_id1,
			postButtonStatus: false,
			resourceTime: weeks[0]["time"],
			resourceTitle: '',
			resourceContent: ''
		};
	}


	post_Resource(){
		const { course_id, resourceTime, resourceTitle, resourceContent } = this.state;
		return (
            <PostResourceWrapper>
                <div className="modal">
					<div className="modal-post-notice">Post Resource</div>

					{/* Which Week */}
					<div className="modal-title">
						<div className="title">Which Week:</div>
						<select className="title-input"
								value={ this.state.resourceTime}
								onChange={ (e) => this.setState({ resourceTime: e.target.value }) }> 
						{  
							weeks.map((item) => {
								return (
									<option key={item.id} value={item.time}>{item.time}</option>
								)
							})
						}
						</select> 
					</div>

                    <div className="modal-title">
						<div className="title">Title:</div>
						<input className="title-input"
							   value={ this.state.resourceTitle }
							   onChange={ (e) => { this.setState({ resourceTitle: e.target.value }) }}></input>
					</div>

                    <div className="modal-content">
						<div className="content">Content:</div>
						<textarea className="content-input"
								  value={ this.state.resourceContent }
								  onChange={ (e) => { this.setState({ resourceContent: e.target.value }) }}></textarea>
					</div>

                    <div className="modal-operator">
                        <button 
                            className="modal-operator-button close"
							onClick = { () => { this.setState({ postButtonStatus: false }) }}
                        >Cancel</button>
                        <button 
							className="modal-operator-button confirm"
							onClick = { () => { this.setState({ postButtonStatus: false });
												this.props.postCourseResource(this.props.token, course_id, resourceTime, resourceTitle, resourceContent)}}
                        >Confirm</button>
                    </div> 
                </div>
                <div 
                    className="mask"
					onClick = { () => { this.setState({ postButtonStatus: false }) }}
                ></div>
            </PostResourceWrapper>
        )
	}

	lectureInfo(doc){
		const { whichCourse, whichPage } = this.props;
		return (
			<LectureInfo key={doc.get("id")}>
				<p className="time">{doc.get("group")}</p>
				<div className="fileBlock">
					<Link to={`/${whichCourse}/${whichPage}/resourceDetail`} className="link">
						<span className="file" 
						      onClick={ () => this.props.getResourceDetail(doc.get("id")) }>
							{doc.get("title")}
						</span>
					</Link>
					<span className="iconfont downloadIcon">&#xe68a;</span>
				</div>
			</LectureInfo>
		)
	}

	render() {
        return (
            <ContentWrapper>
                <Nav>
                    <MenuBlock />
					{
						this.props.userInfo.get("role") === "student"  ? 
						null : 
						<PostResourceButton value={this.state.postButtonStatus}
									onClick={()=>{ this.setState({postButtonStatus: !this.state.postButtonStatus}) }}>
							Post Resource
						</PostResourceButton>
					}
					{
						this.state.postButtonStatus ?  
						this.post_Resource() :
						null
					}
                    {/* map files */}
                    <div className="wholeLectureFile">
					{
						this.props.courseResourceInfo.map((item) => {
							return (this.lectureInfo(item))
						})
					}
                    </div>
                </Nav>
            </ContentWrapper>
        )
	}
	
	componentDidMount(){
		this.props.getCourseResourceInfo(this.state.course_id);
	}
}


const mapState = (state) => {
	return {
		userInfo: state.getIn(["login", "userInfo"]),
		token: state.getIn(["login", "token"]),
		userAllCourses: state.getIn(["login", "userAllCourses"]),
		whichCourse: state.getIn(["detail", "whichCourse"]),
		whichPage: state.getIn(["detail", "whichPage"]),
		courseResourceInfo: state.getIn(["detail", "courseResourceInfo"]),
		courseResourceDetail: state.getIn(["detail", "courseResourceDetail"]),
	}
};

const mapDispatch = (dispatch) => ({
	getCourseResourceInfo(course_id) {
		dispatch(actionCreators.getCourseResourceInfo(course_id));
	},
	getResourceDetail(resource_id){
		dispatch(actionCreators.getResourceDetail(resource_id));
	},
	postCourseResource(token, course_id, resourceTime, resourceTitle, resourceContent){
		dispatch(actionCreators.postCourseResource(token, course_id, resourceTime, resourceTitle, resourceContent));
	}
});

export default connect(mapState, mapDispatch)(LecturePage);



