import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import MenuBlock from './menuBlock';
import { ContentWrapper, Nav, ShowGroupPage, CreateButton, GroupContent, 
	ModalWrapper, AssignmentType } from './style';




// const allGroupInfo = [
// 	{id: 1, assignment_id: "1", leader_id: 1, title: "tiger", topic: "learning management", num_member: 2, num_backend: 2, num_frontend: 2 },
// 	{id: 2, assignment_id: "2", leader_id: 2, title: "play", topic: "plant management", num_member: 3, num_backend: 2, num_frontend: 2 },
// 	{id: 3, assignment_id: "3", leader_id: 3, title: "dance", topic: "secriuty management", num_member: 4, num_backend: 2, num_frontend: 2 },
// 	{id: 4, assignment_id: "4", leader_id: 4, title: "kangroo", topic: "devops", num_member: 5, num_backend: 2, num_frontend: 2 },
// 	{id: 5, assignment_id: "5", leader_id: 5, title: "kola", topic: "data analysis", num_member: 5, num_backend: 2, num_frontend: 2 },
// 	{id: 6, assignment_id: "6", leader_id: 6, title: "eagle", topic: "data analysis", num_member: 5, num_backend: 2, num_frontend: 2 }
// ]

const levels = [
	{"id": 1, "level": "Beginner"},
	{"id": 2, "level": "Middle"},
	{"id": 3, "level": "Advanced"}
]


class GroupPage extends Component {

	constructor(props) {

		super(props);
		let assnAllTopics = []
		if (this.props.assnInfo){
			// assnAllTopics = this.props.assnInfo.get("all_topics").split('|');
			assnAllTopics = this.strMapToObj(this.props.assnInfo).all_topics.split('|');
		}
		const {  userAllCourses, whichCourse} = this.props;
		let course_id1 = null;
		userAllCourses.forEach(element => {
			if (element.get("code") === whichCourse){
				course_id1 = element.get("id");
			}
		});
		this.state = { 
			existGroupStatus: true,
			createButtonStatus: false,
			matchButtonStatus: false,
			createGroupTitle: '',
			createGroupPreTopic: assnAllTopics[0],
			createFront: levels[0]["id"],
			createBack: levels[0]["id"],
			matchGroupPreTopic: assnAllTopics[0],
			matchFront: levels[0]["id"],
			matchBack: levels[0]["id"],
			assnTopics: assnAllTopics,
			join_group: false,
			join_group_skill: '',
			join_group_id: '',
			course_id: course_id1,
			currentAssignmentID: this.strMapToObj(this.props.assnInfo).id,
		};

	}

	strMapToObj(strMap) {
		let obj = Object.create(null);
		for (let [k,v] of strMap) {
			obj[k] = v;
		}
		return obj;
	}

	groupAssignmentType(assnInfo){
		assnInfo = this.strMapToObj(assnInfo)
		if (assnInfo) {
			// return assnInfo.map((item)=>{
				return (
					<li 
						key={assnInfo.id}
						className="eachAssignmentType" 
						onClick = {() => {this.setState({currentAssignmentID: assnInfo.id})}}
					>{assnInfo.title}</li>
				)
			// })
		}
	}

	existGroupInfo() {
		return(
			<div className="groupInfo">

				<AssignmentType>
					 <ul>
						{this.groupAssignmentType(this.props.assnInfo)}
					</ul>
				</AssignmentType>

				<div className="groupInfoTitle">
					<span className="groupInfoName">Groups</span>
					<span className="groupInfoType">Group Type</span>
					<span className="groupInfoTopic">Perferred Topic</span>
					<span className="groupInfoMember">Frontend</span>
					<span className="groupInfoMember">Backend</span>
				</div>
				{ this.groupInfoDetail(this.props.allGroupInfo) }
			</div>
		)
	}

	groupInfoDetail(allGroupInfo){
		const { token, whichCourse, whichPage, assnInfo } = this.props;
		return allGroupInfo.map((item) => {
			if (item.get("assignment_id") === this.state.currentAssignmentID){
				return (
					<GroupContent key={item.get("id")}>
						<Link to={`/${whichCourse}/${whichPage}/groupDetail`}>
							<span className="groupInfoName"
								  onClick={ () => this.props.getGroupDetail(this.props.token, item.get("id"))}>
								  {item.get("title")}
							</span>
						</Link>
						<span className="groupInfoType">{assnInfo.get("title")}</span>
						<span className="groupInfoTopic">{item.get("topic")}</span>
						<span className="groupInfoMember">{item.get("num_frontend")}</span>
						<span className="groupInfoMember">{item.get("num_backend")}</span>
						{
							item.get("leader_id") !== this.props.userInfo.get("id") ?
							<span className="iconfont joinIcon" 
								  onClick={()=>{ this.setState({join_group_id: item.get("id"), join_group: true }) }}>
								  &#xe608;
							</span> : null
						}
						{
							item.get("leader_id") !== this.props.userInfo.get("id") ?
							<span className="iconfont leaveIcon" 
								  onClick={()=>{this.props.confirmLeaveGroup(token, this.state.currentAssignmentID, item.get("id"))} }>
								  &#xe702;
							</span> : null
						}
					</GroupContent>
				)
			}
			else{
				return null;
			}
			
		})
	}

	confirm_join_group(){
		const { token } = this.props;
		const { currentAssignmentID, join_group_skill, join_group_id} = this.state;
		return (
            <ModalWrapper>
                <div className="modal">
					<div className="modal-post-notice">Join Group</div>

                    <div className="modal-title">
						<div className="title">Please select one skill！</div>
					</div>

                    <div className="modal-content" onChange={(e) => {this.setState({join_group_skill: e.target.value})}}>
						<span className="content">Skill:</span>
						<label>frontend: </label>
						<input type="radio"  name="skill" value="frontend" className="frontend"></input>
						<label>backend: </label>
						<input type="radio"  name="skill" value="backend" className="frontend"></input>
					</div>
			
                    <div className="modal-operator">
                        <button 
                            className="modal-operator-button close"
							onClick = { () => { this.setState({ join_group: false }) }}
                        >Cancel</button>
                        <button 
                            className="modal-operator-button confirm"
							onClick = { () => { this.props.confirmJoinGroup(token, currentAssignmentID, join_group_skill, join_group_id); 
													this.setState({ join_group: false });}}
						
                        >Confirm</button>
                    </div> 
                </div>
                <div 
                    className="mask"
					onClick = { () => { this.setState({ join_group: false }) }}
                ></div>
            </ModalWrapper>
        )
	}


	groupCreate() {
		return(
			<div className="groupCreateOrMatch">

				<div className="groupCreate">
					<div className="navHead">Create Group</div>

					<div className="navAllContent">
						{/* Group Title */}
						<div className="navContent">
							<div className="groupMenu name">Group Title:</div>
							<input placeholder="Input a group name" 
									className="groupInput"
									value={ this.state.createGroupTitle }
									onChange={ (e) => this.setState({ createGroupTitle: e.target.value }) }></input>
						</div>
						{/* Perferred Topic */}
						<div className="navContent">
							<div className="groupMenu type">Perferred Topic:</div>
							<select className="groupInput"
									value={ this.state.createGroupPreTopic }
									onChange={ (e) => this.setState({ createGroupPreTopic: e.target.value }) }>  
							{  
								this.state.assnTopics ?
								this.state.assnTopics.map((item) => {
									return (
										<option key={item} value={item}>{item}</option>
									)
								}) : null
							}
							</select> 
						</div>
						{/* Frontend */}
						<div className="navContent">
							<div className="groupMenu type">Frontend Skill Level:</div>
							<select className="groupInput"
									value={ this.state.createFront }
									onChange={ (e) => this.setState({ createFront: e.target.value }) }>
							{  
								levels.map((item) => {
									return (
										<option key={item.id} value={item.id}>{item.level}</option>
									)
								})
							}
							</select> 
						</div>
						{/* Backend */}
						<div className="navContent">
							<div className="groupMenu type">Backend Skill Level:</div>
							<select className="groupInput"
									value={ this.state.createBack }
									onChange={ (e) => this.setState({ createBack: e.target.value }) }> 
							{  
								levels.map((item) => {
									return (
										<option key={item.id} value={item.id}>{item.level}</option>
									)
								})
							}
							</select> 
						</div>
				
					</div>
					<CreateButton className="confirm" 
						onClick={ () => { this.state.createGroupTitle ? this.props.createNewGroup(this.props.token, this.state.currentAssignmentID, this.state.createGroupTitle,
									this.state.createGroupPreTopic, this.state.createFront, this.state.createBack) : alert("Please Input Group Title");  this.changeAllButtonStatus() }}>
						Create
					</CreateButton>
				</div>

			</div>
		)
	}

	groupAutoMatch() {
		return(
			<div className="groupCreateOrMatch">
				<div className="groupCreate">
					<div className="navHead">Match Group</div>
					<div className="navAllContent">
						{/* Perferred Topic */}
						<div className="navContent">
							<div className="groupMenu type">Perferred Topic:</div>
							<select className="groupInput" 
									value={ this.state.matchGroupPreTopic }
									onChange={ (e) => this.setState({ matchGroupPreTopic: e.target.value }) }>  
							{  
								this.state.assnTopics ?
								this.state.assnTopics.map((item) => {
									return (
										<option key={item} value={item}>{item}</option>
									)
								}) : null
							}
							</select> 
						</div>
						{/* Frontend */}
						<div className="navContent">
							<div className="groupMenu type">Frontend Skill Level:</div>
							<select className="groupInput"
									value={ this.state.matchFront }
									onChange={ (e) => this.setState({ matchFront: e.target.value }) }>
							{  
								levels.map((item) => {
									return (
										<option key={item.id} value={item.id}>{item.level}</option>
									)
								})
							}
							</select> 
						</div>
						{/* Backend */}
						<div className="navContent">
							<div className="groupMenu type">Backend Skill Level:</div>
							<select className="groupInput"
									value={ this.state.matchBack }
									onChange={ (e) => this.setState({ matchBack: e.target.value }) }> 
							{  
								levels.map((item) => {
									return (
										<option key={item.id} value={item.id}>{item.level}</option>
									)
								})
							}
							</select> 
						</div>
					</div>
					<CreateButton className="confirm" 
						onClick={ () => { this.changeAllButtonStatus(); 
						this.props.matchGroup(this.props.token, this.state.currentAssignmentID, 
												this.state.matchGroupPreTopic, this.state.matchFront, this.state.matchBack) }}>
						Match
					</CreateButton>
				</div>
			</div>
		)
	}


	changeAllButtonStatus = () => {
		this.setState({ 
			createButtonStatus: false,
			matchButtonStatus: false,
			existGroupStatus: true
		});
	};

	changeCreateButtonStatus = () => {
		this.setState({ 
			existGroupStatus: false,
			matchButtonStatus: false,
			createButtonStatus: true,
		});
	};

	changeMatchButtonStatus = () => {
		this.setState({ 
			existGroupStatus: false,
			createButtonStatus: false,
			matchButtonStatus: true
		});
	};

	groupPage() {
		return (
			<ShowGroupPage>
				<CreateButton  value={ this.state.existGroupStatus } 
				  			   onClick={ () => this.changeAllButtonStatus() }>
					Exist Groups
				</CreateButton>
				<CreateButton value={ this.state.creatButtonStatus }
							  onClick={ () => { this.changeCreateButtonStatus() }}>
					Create Group
				</CreateButton>
				<CreateButton value={ this.state.matchButtonStatus } 
							  onClick={ () => { this.changeMatchButtonStatus() } }>
					Match Group
				</CreateButton>

				{
					( this.state.createButtonStatus | this.state.matchButtonStatus ) ?
					( this.state.createButtonStatus ? this.groupCreate() : this.groupAutoMatch() ) :
					  this.existGroupInfo()
				}
				{
					this.state.join_group ?  
					this.confirm_join_group() : null
				}
			</ShowGroupPage>
		)
    }
	

	render() {	
        return (
            <ContentWrapper>
                <Nav>
                    <MenuBlock />
                    { this.groupPage() }	
                </Nav>
            </ContentWrapper>
        )			
	}

	componentDidMount(){
		this.props.getAllGroupInfo(this.props.token, this.state.currentAssignmentID);
	}

}

const mapState = (state) => {
	return {
		userInfo: state.getIn(["login", "userInfo"]),
		token: state.getIn(["login", "token"]),
		userAllCourses: state.getIn(["login", "userAllCourses"]),
		assnInfo: state.getIn(["course", "assnInfo"]),
		whichCourse: state.getIn(["detail", "whichCourse"]),
		whichPage: state.getIn(["detail", "whichPage"]),
		groupInfo: state.getIn(["detail", "groupInfo"]),
		groupDetailInfo: state.getIn(["detail", "groupDetailInfo"]),
		allGroupInfo: state.getIn(["detail", "allGroupInfo"]),
		notMatchHints: state.getIn(["detail", "notMatchHints"])
	}
};

const mapDispatch = (dispatch) => ({
	getAllGroupInfo(token, assignment_id){
		dispatch(actionCreators.getAllGroupInfo(token, assignment_id));
	},
	getGroupDetail(token, groupId){
		dispatch(actionCreators.getGroupDetail(token, groupId));
	},
	createNewGroup(token, currentAssignmentID, createGroupTitle, createGroupPreTopic, createFront, createBack ){
		dispatch(actionCreators.createNewGroup(token, currentAssignmentID, createGroupTitle, createGroupPreTopic, createFront, createBack));
	},
	matchGroup(token, currentAssignmentID, matchGroupPreTopic, matchFront, matchBack){
		dispatch(actionCreators.matchGroup(token, currentAssignmentID, matchGroupPreTopic, matchFront, matchBack));
	},
	confirmJoinGroup(token, currentAssignmentID, join_group_skill, join_group_id){
		dispatch(actionCreators.confirmJoinGroup(token, currentAssignmentID, join_group_skill, join_group_id));
	},
	confirmLeaveGroup(token, currentAssignmentID, groupId){
		dispatch(actionCreators.confirmLeaveGroup(token, currentAssignmentID, groupId));
	},
});

export default connect(mapState, mapDispatch)(GroupPage);




