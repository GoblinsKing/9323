import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import MenuBlock from './menuBlock';
import { ContentWrapper, Nav, ShowChatPage, SearchModalWrapper } from './style';



class ChatPage extends Component {

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
			publicInputValue: '',
			groupInputValue: '',
			public_modal_status: false,
			group_modal_status: false,
			searchKeyWord: '',
			showPublicChatRoom: true,
			showGroupChatRoom: false
		};
	}

	handleChatMessage(messages){
		if (messages) {
			return (
				<Fragment>
				{
					messages.map((item) => {
						const user_id = item.get("user_id");
						const message = item.get("message");
						if ( user_id === this.props.userInfo.get("id")) {
							// if message的user_id ==== this.props.userInfo.get("id") then right float，other left float
							// use flexbox
							return (
								<div key={item.get("id")} className="myMessage">
									<div className="myName">{ user_id }</div>
									<div className="myMessageContent">{ message }</div>
								</div>
							)
						} else {
							return (
								<div key={item.get("id")} className="othersMessage">
									<div className="othersName">{ user_id }</div>
									<div className="othersMessageContent">{ message }</div>
								</div>
							)
						}	
					})
				}
				</Fragment>
			)
		}
	}

	// after click return, send message then clear input
	handlePublicKeyUp = (e) => {
		if (e.keyCode === 13 && e.target.value !== ''){
			this.props.sendPublicMessage(this.props.token, this.props.publicChatRoomID.get("chat_room_id"), this.state.publicInputValue);
			this.setState({ publicInputValue: '' })
		}
	}
	handleGroupKeyUp = (e) => {
		if (e.keyCode === 13 && e.target.value !== ''){
			if (this.props.groupChatRoomID) {
				this.props.sendGroupMessage(this.props.token, this.props.groupChatRoomID.get("chat_room_id"), this.state.groupInputValue);
				this.setState({ groupInputValue: '' })
			}
		}
	}

	scrollToBottom(){
		  this.publicMessagesEnd.scrollIntoView({ behavior: "smooth" });
	}

	message_search(searchType){
		const { token, groupChatRoomID, publicChatRoomID } = this.props;
		let chatId = null;
		if (searchType === "Public"){
			chatId = publicChatRoomID.get("chat_room_id");
		}else{
			if (groupChatRoomID) {
				chatId = groupChatRoomID.get("chat_room_id");
			}
		}
		return (
            <SearchModalWrapper>
                <div className="pmodal">
					<div className="modal-post-notice">{searchType} Message Search</div>
                    <div className="pmodal-title">
						<input className="ptitle-input"
							value={ this.state.searchKeyWord }
							onChange={ (e) => { this.setState({ searchKeyWord: e.target.value }) }}
							placeholder="Input keyword"
						></input>
						<button 
							className="publicSearch"
							onClick = {()=>{ this.props.searchChatMessage(token, this.state.searchKeyWord, chatId) }}>search
						</button>
					</div>
                    <div className="search-result">
						<ul>
							{	
								this.props.searchMessages ?
								this.props.searchMessages.map((item)=>{
									return(
									<li key={item.get('id')}>{item.get('message')}</li>
									)
								}) 
								: null
							}
						</ul>
					</div>
					<button className="search-confirm" 
							onClick = { () => { this.setState({ public_modal_status: false, group_modal_status: false, searchKeyWord:''}) }}>
						Back
					</button>
                </div>
                <div className="mask" onClick = { () => { this.setState({ public_modal_status: false, group_modal_status: false }) }}></div>
            </SearchModalWrapper>
        )
	}

	chatPagePublic(){
		const { token, publicChatRoomID, PublicMessages } = this.props;
		return (
			// public channel 
			<div className="chatPageLeft">
				<div className="chatHeader">
					<span className="switchChannel public"  onClick={() => {this.setState({showPublicChatRoom: false, showGroupChatRoom: true})}}>Group</span>
					Public Chatting Room
					<span className="iconfont searchIcon" onClick={()=>{this.setState({public_modal_status: true})}}>&#xeafe;</span>
				</div>
				<div className="chatRoom" >
					{/* public messages */}
					{ this.handleChatMessage(PublicMessages)}

					{/* chat message auto up */}
					<div style={{ float:"left", clear: "both" }}
						ref={(el) => { this.publicMessagesEnd = el; }}>
					</div>

				</div>
				<input placeholder="Enter" 
					value={ this.state.publicInputValue }  
					onChange={(e) => this.setState({ publicInputValue: e.target.value })}
					onKeyUp={this.handlePublicKeyUp}>
				</input>
				<button className="publicButton" 
						onClick={() => { this.props.sendPublicMessage(token, publicChatRoomID.get("chat_room_id"), this.state.publicInputValue); 
										this.setState({ publicInputValue: '' }) }}>Send
				</button>
			</div>
		)
	}

	chatPageGroup(){
		const { token, groupChatRoomID, GroupMessages } = this.props;
		return (
			// group channel
			<div className="chatPageRight">
				<div className="chatHeader Group">
					<span className="switchChannel group" onClick={() => {this.setState({showGroupChatRoom: false, showPublicChatRoom: true})}}>Public</span>
					Group Chatting Room
					<span className="iconfont searchIcon" onClick={() => {this.setState({group_modal_status: true})}}>&#xeafe;</span>
				</div>
				<div className="chatRoom">
					{/* group messages */}
					{ this.handleChatMessage(GroupMessages)}

					{/* chat message auto up */}
					<div style={{ float:"left", clear: "both" }}
						ref={(el) => { this.publicMessagesEnd = el; }}>
					</div>

				</div>
				<input placeholder="Enter" 	
					value={ this.state.groupInputValue  }  
					onChange={(e) => this.setState({ groupInputValue: e.target.value })}
					onKeyUp={this.handleGroupKeyUp}>
				</input>
				
				{/* after created group */}
				<button onClick={() => { groupChatRoomID ? this.props.sendGroupMessage(token, groupChatRoomID.get("chat_room_id"), this.state.groupInputValue) : this.setState({ groupInputValue: '' }) ;
										this.setState({ groupInputValue: '' }) }}>Send
				</button>
			</div>
		)
	}

	chatPage() {
		return (
			<ShowChatPage>
				{ this.state.showPublicChatRoom ? this.chatPagePublic() : this.chatPageGroup()}

				{/* <div className="chatPageMiddle"></div> */}

				{/* search for public messages */}
				{
					this.state.group_modal_status?
					this.message_search('Group'):
					null
				}
				{/* search for group messages */}
				{
					this.state.public_modal_status?
					this.message_search('Public'):
					null
				}
			</ShowChatPage>
		)
	}

	render() {
        return (
            <ContentWrapper>
                <Nav>
                    <MenuBlock />
                    { this.chatPage() }	
                </Nav>
            </ContentWrapper>
        )
	}

	refreshChatMessage() {
		this.props.getChatRoomID_public(this.props.token, "public", this.state.course_id);
		this.props.getChatRoomID_group(this.props.token, "group",  this.state.course_id);
	}
	
	componentDidMount() {
		this.interval = setInterval(() => this.refreshChatMessage(), 2000);
		this.refreshChatMessage();
		this.scrollToBottom();
		let key_word = "hi";
		let chat_room_id = 1;
		this.props.searchChatMessage(this.props.token, key_word, chat_room_id);
	}

	componentDidUpdate() {
		this.scrollToBottom();
	}
	
	componentWillUnmount(){
		clearInterval(this.interval);
	}
}

const mapState = (state) => {
	return {
		userInfo: state.getIn(["login", "userInfo"]),
		token: state.getIn(["login", "token"]),
		enrollmentInfo: state.getIn(["login", "enrollmentInfo"]),
		userAllCourses: state.getIn(["login", "userAllCourses"]),
		whichCourse: state.getIn(["detail", "whichCourse"]),
		publicChatRoomID: state.getIn(["detail", "publicChatRoomID"]),
		groupChatRoomID: state.getIn(["detail", "groupChatRoomID"]),
		PublicMessages: state.getIn(["detail", "PublicMessages"]),
		GroupMessages: state.getIn(["detail", "GroupMessages"]),
		searchMessages: state.getIn(["detail", "searchMessages"])
	}
};

const mapDispatch = (dispatch) => ({
	getChatRoomID_public(token, chanel, course_id){
		dispatch(actionCreators.getChatRoomID_public(token, chanel, course_id));
	},
	getChatRoomID_group(token, chanel, course_id){
		dispatch(actionCreators.getChatRoomID_group(token, chanel, course_id));
	},
	sendPublicMessage(token, chat_room_id, message) {
		dispatch(actionCreators.sendPublicMessage(token, chat_room_id, message));
	},
	sendGroupMessage(token, chat_room_id, message) {
		dispatch(actionCreators.sendGroupMessage(token, chat_room_id, message));
	},
	searchChatMessage(token, key_word, chat_room_id){
		dispatch(actionCreators.searchChatMessage(token, key_word, chat_room_id));
	}

});

export default connect(mapState, mapDispatch)(ChatPage);



