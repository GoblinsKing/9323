import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import MenuBlock from './menuBlock';
import { ContentWrapper, Nav, StaffTable } from './style';

class StaffPage extends Component {

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
		};

	}

	staffTable(){
		if (this.props.courseStaffInfo) {
			return (
				<StaffTable>
					<thead>
						<tr><th>Role</th><th>Name</th><th>Email</th></tr>
					</thead>
					<tbody>
						{
						this.props.courseStaffInfo.map((item) => {
							return (
								<tr key={item.get("id")}>
									<td>{item.get("role")}</td>
									<td>{item.get("user_name")}</td>
									<td>{item.get("email")}</td>
								</tr>
							)
						})
						}
					</tbody>
				</StaffTable>
			)
		}
	}
	
	render() {
        return (
            <ContentWrapper>
                <Nav>
                    <MenuBlock />
                    { this.staffTable() }
                </Nav>
            </ContentWrapper>
        )
	}
	
	componentDidMount(){
		this.props.getCourseStaffInfo(this.state.course_id);
	}

}

const mapState = (state) => {
	return {
		userInfo: state.getIn(["login", "userInfo"]),
		token: state.getIn(["login", "token"]),
		userAllCourses: state.getIn(["login", "userAllCourses"]),
		whichCourse: state.getIn(["detail", "whichCourse"]),
		courseStaffInfo: state.getIn(["detail", "courseStaffInfo"]),
	}
};

const mapDispatch = (dispatch) => ({
	getCourseStaffInfo(course_id) {
		dispatch(actionCreators.getCourseStaffInfo(course_id));
	}
});


export default connect(mapState, mapDispatch)(StaffPage);