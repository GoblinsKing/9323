import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { actionCreators } from './store';
import MenuBlock from './menuBlock';
import { ContentWrapper, Nav, StaffTable } from './style';


const staffInfo2 = [
	{id: 1, role: "Lecturer", name: "Kate Grenville", email: "z5100009@unsw.edu.au"},
	{id: 2, role: "Lecturer", name: "Alice Grenville", email: "z5100034@unsw.edu.au"},
	{id: 3, role: "Tutor", name: "Peter Snow", email: "z5100039@unsw.edu.au"},
	{id: 4, role: "Tutor", name: "Lisa", email: "z5100086@unsw.edu.au"},
	{id: 5, role: "Tutor", name: "Anna", email: "z5100098@unsw.edu.au"}
]


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
		if (staffInfo2) {
			return (
				<StaffTable>
					<thead>
						<tr><th>Role</th><th>Name</th><th>Email</th></tr>
					</thead>
					<tbody>
						{
						staffInfo2.map((item) => {
							return (
								<tr key={item.id}>
									<td>{item.role}</td>
									<td>{item.name}</td>
									<td>{item.email}</td>
								</tr>
							)
						})
						}
					</tbody>
				</StaffTable>
			)
		}
	}

	// staffTable(){
	// 	if (this.props.courseStaffInfo) {
	// 		console.log("######")
	// 		console.log(this.props.courseStaffInfo)
	// 		return (
	// 			<StaffTable>
	// 				<thead>
	// 					<tr><th>Role</th><th>Name</th><th>Email</th></tr>
	// 				</thead>
	// 				<tbody>{this.props.courseStaffInfo.map((item) => {
	// 					return (
	// 						<tr key={item.get("id")}>
	// 							<td>{item.get("role")}</td>
	// 							<td>{item.get("name")}</td>
	// 							<td>{item.get("email")}</td>
	// 						</tr>
	// 				)})}</tbody>
	// 			</StaffTable>
	// 		)
	// 	}
	// }
	
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
		// this.props.getCourseStaffInfo(this.props.token, this.state.course_id);
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
	// getCourseStaffInfo(token, course_id) {
	// 	dispatch(actionCreators.getCourseStaffInfo(token, course_id));
	// }
});


export default connect(mapState, mapDispatch)(StaffPage);



