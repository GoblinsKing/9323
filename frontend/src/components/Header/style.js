import styled from 'styled-components';


export const HeaderWrapper = styled.div`
	position: relative;
	height: 52px;
	background-color: #1E90FF;
`;

export const Nav = styled.div`
	width: 1140px;
	height: 100%;
	margin: 0 auto;
	padding: 0 15px;
`;

export const NavItem = styled.div`
	color: #fff;
	padding: 0 15px;
	line-height: 52px;
	text-decoration: none;
	&.title {
		float: left;
		font-size: 18px;
		cursor: pointer;
		padding-left: 0;
		.logo{
			width: 180px;
			height: 40px;
			margin-top: 5px;
		}
	}
	&.search {
		float: left;
		font-size: 15px;
		cursor: pointer;
		height: 52px;
	}
	&.search:hover {
		background-color: #00BFFF;
	}
	&.login {
		float: right;
		height: 52px;
		font-size: 15px;
		cursor: pointer;
		padding: 0 0;
	}
	&.login:hover {
		background-color: #00BFFF;
	}
	&.login_search {
		float: right;
		font-size: 15px;
		cursor: pointer;
		height: 52px;
	}
	&.login_search:hover {
		background-color: #00BFFF;
	}

`;