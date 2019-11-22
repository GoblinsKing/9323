import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import { ContentWrapper, Nav,
	WelcomeBorder, Welcome, NavTempItem } from './style';

import group from '../../statics/homeImages/group.png';
import chat from '../../statics/homeImages/chat.png';
import time from '../../statics/homeImages/time.jpeg';
import pin from '../../statics/homeImages/pin.png';
import skill from '../../statics/homeImages/skill.png';
import grade from '../../statics/homeImages/grade.jpeg';



class NotLoginHome extends Component {

	render() {
        return (
            <ContentWrapper>
                <Nav>
                    <WelcomeBorder>
                        <Welcome>Welcome to UniLearn!</Welcome>
                    </WelcomeBorder>
                    <NavTempItem>
                        <div className="info-left">
                            <img src={group} alt=""/>
                            <div className="imgContent">
                                <h1>Group</h1>
                                <p className="explanation">
                                This is an automatic group member matching module that can match group members by topic or skills.
                                </p>
                            </div>
                        </div>
                        <div className="info-left">
                            <img src={chat} alt=""/>
                            <div className="imgContent">
                                <h1>Chat Room</h1>
                                <p className="explanation">
                                This is a web-based chatting room for everyone who enrolls in this course.
                                </p>
                            </div>
                        </div>
                        <div className="info-left">
                            <img src={time} alt=""/>
                            <div className="imgContent">
                                <h1>Reminder System</h1>
                                <p className="explanation">
                                This is an instant notification system to remind users about important information. 
                                </p>
                            </div>
                        </div>
                        <div className="info-right">
                            <img src={skill} alt=""/>
                            <div className="imgContent">
                                <h1>Personal Skill</h1>
                                <p className="explanation">
                                In group member matching module, you can show your skills in advance for better group matching.
                                </p>
                            </div>
                        </div>
                        <div className="info-right">
                            <img src={pin} alt=""/>
                            <div className="imgContent">
                                <h1>IsTop</h1>
                                <p className="explanation">
                                This can pin the good post such as the instructions and Q&A.
                                </p>
                            </div>
                        </div>
                        <div className="info-right">
                            <img src={grade} alt=""/>
                            <div className="imgContent">
                                
                                <h1>Achievement</h1>
                                <p className="explanation">
                                We hope all these functions could bring a relaxing online learning and communication environment.
                                </p>
                            </div>
                        </div>
                    </NavTempItem>
                </Nav>
            </ContentWrapper>
        )
	}

	componentDidMount() {
		this.props.getAllCourses();
	}
}

const mapState = (state) => {
	return {
        courseList: state.getIn(["home", "courseList"])
	}
};

const mapDispatch = (dispatch) => ({
	getAllCourses() {
		dispatch(actionCreators.getCourses());
	}
});

export default connect(mapState, mapDispatch)(NotLoginHome);





