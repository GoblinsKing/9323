import styled from 'styled-components';


export const ContentWrapper = styled.div`
	min-height: 620px;
	overflow: auto;
	margin-top: 20px;
	box-sizing: border-box;
	background-color: #fff;
	font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
`;

export const Nav = styled.div`
	display: block;
	width: 1140px;
	color: #000;
	margin: 0 auto;
	padding: 0 15px;
`;

export const WelcomeBorder = styled.div`
	padding-bottom: 9px;
	margin-top: 40px;
	margin-bottom: 30px;
	border-bottom: 1px solid #eee;
`;

export const Welcome = styled.div`
	font-color: #000;
	font-size: 36px;
	font-weight: 500;
	margin: 10px 0;
`;

export const NavItem = styled.div`
	margin-top: 20px;
	font-size: 14px;
`;

export const NavTempItem = styled.div`
	img{
		width: 190px;
		height: 190px;
	}
	.info-left{
		float: left;
		img{
			float: left;
		}
		
	}
	.imgContent{
		background: #eee;
		float: left;
		width: 190px;
		height: 190px;
		h1{
			font-size: 20px;
			margin: 15px 10px;
		}
		.explanation{
			font-size: 11px;
			margin: 20px 10px;
			text-align: justify;
		}
		
	}
	.info-right{
		img{float: right;}
		float: left;
	}
`;

export const NavLeft = styled.div`
	float: left;
	width: 300px;
	height: 700px;
	margin-right: 15px;
	margin-bottom: 30px;
	overflow: auto;
	table{
		border: 1px solid red;
		cellspacing: 0;
		width: 300px;
		tr{
			height: 50px;
			line-height: 25px;
		}
		td{
			border: 1px solid #e8e8e8;
			text-align: center;
			color: #876800;
		}
		a{
			text-decoration: none;
			color: #614700;
		}
		.courseCode{
			text-align: center;
			font-weight: bold;
		}
	}
`;

export const NavRight = styled.div`
	float: right;
	width: 70%;
	border: 1px solid #eee;
	margin-left: 15px;
	.createGeneralInfo{
		margin: 10px 15px;
		color: #fff;
		width: 770px;
		background-color: #000;
		font-weight: bold;
		font-size: 20px;
		height: 35px;
		line-height: 35px;
		text-align: center;
		cursor: pointer;
		border-radius: 5px;
	}
	.generalHead {
		width: 100%;
		height: 40px;
		line-height: 40px;
		text-align: center;
		color: #000;
		font-size: 20px;
		font-weight: bold;
		background-color: #bfbfbf;
	}
	.generalInfo{
		margin: 15px;
		border-bottom: 1px solid #eee;
	}
	.title{
		font-size: 18px;
		font-weight: bold;
		margin-bottom: 10px;
	}
	.content{
		font-size: 14px;
		text-align: justify;
		line-height: 18px;
	}
	.poster_time{
		margin: 10px 0;
		font-size: 12px;
		font-weight: normal;
		line-height: 1;
		color: #777;
	}
	.actionAndIcon{
		margin: 10px 0;
		font-size: 12px;
		font-weight: normal;
		line-height: 1;
		color: #777;
		.action{
			font-size: 14px;
			color: #1890ff;
			margin-right: 20px;
		}
	}
	.poster{
		color: #4d606a;
		margin-left: 5px;
		margin-right: 10px;
	}
	.iconSet{
		float: right;
		margin-right: 30px;
		font-size: 14px;
		color: #40a9ff;
		.iconColor:hover{
			color: #1d39c4;
			cursor: pointer;
		}
	}
	.num{
		margin-left: 5px;
		color: #bfbfbf
	}
`;

export const Comment = styled.div`
	background: #eee;
	margin: 10px 5px;
	padding: 5px;
`;

export const InputWindow = styled.textarea`
	width: 100%;
	height: 60px;
	padding: 3px 10px;
	font-size: 14px;
	box-sizing: border-box;
	border: 1px solid #ccc;
	background-color: #eee;
`;

export const PostButton = styled.button`
	color: #fff;
	width: 80px;
	background-color: #4169E1;
	font-size: 16px;
	font-weight: 500;
	text-align: center;
	cursor: pointer;
	padding: 6px 12px;
	margin: 5px 0;
	border-radius: 5px;
	background-color: #4169E1;
}
`;

export const ModalWrapper = styled.div`
	.modal {
		position: fixed;
		width: 600px;
		height: 400px;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		border-radius: 5px;
		background: #f5f5f5;
		overflow: hidden;
		z-index: 9999;
		box-shadow: inset 0 0 1px 0 #000;
	}
	.modal-post-notice{
		background: #1890ff;
		width: 100%;
		height: 40px;
		line-height: 40px;
		text-align: center;
		font-weight: bold;
	}
	.modal-title {
		font-size: 14px;
		margin: 30px 50px;
		.title{
			margin-bottom: 0px;
			height: 25px;
			font-size: 14px;
			line-height: 25px;	
		}
		.title-input{
			width: 500px;
			height: 35px;
			padding: 5px 10px;
			font-weight: normal;
			box-sizing: border-box;
			line-height: 20px;
			border: 1px solid #ddd;
			border-radius: 5px;
		}

	}
	
	.modal-content {
		font-size: 14px;
		font-weight: bold;
		margin: 0 50px;
		margin-bottom: 30px;
		.content{
			height: 25px;
			line-height: 25px;
		}
		.content-input{
			width: 500px;
			height: 120px;
			font-weight: normal;
			padding: 5px 10px;
			box-sizing: border-box;
			border: 1px solid #ddd;
			border-radius: 5px;
		}
	}
	
	.modal-operator {
		margin-top: 30px;
		width: 100%;
		height: 40px;
		text-align: center
	}
	
	.modal-operator-button{
		width: 100px;
		border: none;
		outline: none;
		height: 40px;
		line-height: 40px;
		opacity: 1;
		color: #fff;
		font-size: 14px;
		font-weight: bold;
		background: #000;
		cursor: pointer;
		border-radius: 5px;
	}
	.close{
		margin-right: 80px;
	}
	.confirm{

	}
	
	.modal-operator-close:active, .modal-operator-confirm:active {
		opacity: .6;
		transition: opacity .3s;
	}
	
	.mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: #000;
		opacity: .6;
		z-index: 9998;
	}
`