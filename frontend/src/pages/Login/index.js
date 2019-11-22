import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { actionCreators } from './store';
import { ContentWrapper, Nav,
	WelcomeBorder, Welcome, PP, Label, Input, Button } from './style';


class Login extends Component {

	render() {
		const { loginStatus } = this.props;
		if (!loginStatus) {
			return (
				<ContentWrapper>
					<WelcomeBorder>
						<Welcome>Sign In</Welcome>
					</WelcomeBorder>
					<Nav>
						<PP>Sign in using your Username and Password.</PP>
						<Label>USERNAME</Label>
						<Input placeholder="Username" ref={(input) => { this.account = input }}></Input>
						<Label>PASSWORD</Label>
						<Input placeholder="Password" type="password" ref={(input) => { this.password = input }}></Input>
						<Button onClick={ () => this.props.login(this.account, this.password) }>Login</Button>
					</Nav>
				</ContentWrapper>
			)
		} else {
			return (
				<Redirect to='/'/>
			)
		}
	}

}


const mapState = (state) => {
	return {
		loginStatus: state.getIn(["login", "loginStatus"]),
		enrollmentInfo: state.getIn(["login", "enrollmentInfo"]),
		userAllCourses: state.getIn(["login", "userAllCourses"])
	}
}

const mapDispatch = (dispatch) => ({
	login(accountElem, passwordElem) {
		dispatch(actionCreators.login(accountElem.value, passwordElem.value))
	}
});

export default connect(mapState, mapDispatch)(Login);





