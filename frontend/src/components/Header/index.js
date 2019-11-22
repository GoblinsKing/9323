import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { HeaderWrapper, Nav, NavItem } from './style';
import { actionCreators as loginActionCreators } from '../../pages/Login/store';
import logo from '../../statics/logo.png';



class Header extends Component {

	constructor(props){
		super(props);
		this.state = {
			currentCourseCode: ''
		}
	}

	beforeLogin(){
		return (
			<HeaderWrapper>
				<Nav>
					<Link to='/'><NavItem className="title"><img src={logo} className="logo" alt=""/></NavItem></Link>
					{/* <Link to='/search'>
						<NavItem className="search">
							<span className="iconfont">&#xeafe;</span>
							Search Courses
						</NavItem>
					</Link> */}
					<Link to='/login'>
						<NavItem className="login">
							<span className="iconfont">&#xe6f0;</span>
							Login
						</NavItem>
					</Link>
				</Nav>
			</HeaderWrapper>
		)
	}

	afterLogin(){
		const { userAllCourses } = this.props;
		return (
			<HeaderWrapper>
				<Nav>
					<Link to='/'>
						<NavItem className="title">
							<img src={logo} className="logo" alt="" onClick={() => { this.setState({currentCourseCode: ''}) }}/>
						</NavItem>
					</Link>
					{ 
						userAllCourses ?
						userAllCourses.map((item) => {
							return (
								<Link to={`/${item.get("code")}`} key={item.get("id")}>
									<NavItem 
										className="search" 
										style={{ backgroundColor: (this.state.currentCourseCode === item.get("code") ? "#00BFFF" : "#1E90FF") }}
										onClick={() => { this.setState({currentCourseCode: item.get("code")}) }}
									>{ item.get("code") }</NavItem>
								</Link>
							)
						}) : null
					}
					<Link to='/'>
						<NavItem className="login" onClick={ this.props.logout } >
							<span className="iconfont">&#xe6f0;</span>
							logout
						</NavItem>
					</Link> 
					{/* <Link to='/search'>
						<NavItem className="login_search">
							<span className="iconfont">&#xeafe;</span>
						</NavItem>
					</Link> */}
				</Nav>
			</HeaderWrapper>
		)

	}

	render() {
		const { loginStatus } = this.props;
		if (!loginStatus) {
			return this.beforeLogin()

		} else {
			return this.afterLogin()
		}
	}
}

const mapState = (state) => {
	return {
		loginStatus: state.getIn(["login", "loginStatus"]),
		userAllCourses: state.getIn(["login", "userAllCourses"]),
		whichMore: state.getIn(["detail", "whichMore"])
	}
};

const mapDispatch = (dispatch) => ({
	logout() {
		dispatch(loginActionCreators.logout())
	}
});

export default connect(mapState, mapDispatch)(Header);





