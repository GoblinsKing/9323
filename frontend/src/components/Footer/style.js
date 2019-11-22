import styled from 'styled-components';


export const FooterWrapper = styled.div`
	height: 60px;
	margin-top: 30px;
	background-color: #fff;
	font-family: Arial;
`;

export const Nav = styled.div`
	display: block;
	width: 1140px;
	height: 100%;
	color: #000;
	margin: 0 auto;
	padding-top: 5px;
	border-top: 1px solid #f0f0f0;
`;

export const NavItem = styled.div`
	line-height: 40px;
	display: block;
	&.footer {
		float: left;
		font-size: 14px;
	}
	&.backToTop {
		float: right;
		font-size: 14px;
		cursor: pointer;
	}
	&.backToTop:hover {
		background-color: #eee;
		border-radius: 5px;
		padding: 0 10px;
	}
	.backIcon{
		color: #7d94a0;
	}
`;


