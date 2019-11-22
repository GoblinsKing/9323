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
	.error{
		background: #eee;
		width: 1140px;
		height: 300px;
		margin-top: 50px;
		border-radius: 10px;
		text-align: center;
		line-height: 200px;
		font-size: 50px;
	}
`;

export const NavItem = styled.div`
	margin-top: 20px;
	font-size: 14px;
`;

export const ContentHeader = styled.div`
	width: 100%;
	height: 40px;
	margin-top: 10px;
	border-bottom: 1px solid #eee;
	.courseInfo{
		float: right;
		margin-top: 10px;
		.courseTitle{
			font-weight: 500;
			font-size: 24px;
			margin-right: 20px;
		}
		.courseName{
			font-size: 16px;
			color: #8c8c8c;
			margin-right: 10px;
		}
		.courseTerm{
			font-size: 16px;
			color: #8c8c8c;
		}
	}

`;

export const MenuButton = styled.button`
	float: left;
    color: #fff;
    width: 100px;
    font-size: 16px;
    background-color: #000;
    border-color: #4169E1;
    font-weight: 500;
    text-align: center;
    vertical-align: middle;
    touch-action: manipulation;
    cursor: pointer;
    padding: 6px 12px;
    border: 1px solid transparent; 
	border-radius: 5px;
	margin-top: 2px;
}
`;
export const ContentMenu = styled.div`
	height: 120px;
	margin-top: 20px;
	padding-bottom: 10px;
	border-bottom: 1px solid #eee;
	.imgWord{
		font-size: 15px;
		color: #000;
		width: 100px;
		text-align: center;
	}
	.menuImg{
		width: 100px;
		height: 100px;
		box-sizing: border-box;
	}
	.menuBlock{
		float: left;
		margin-right: 108px;	
	}
	.menuBlockRight{
		float: right;	
	}
`
export const ContentNotice = styled.div`
	float: left;
	width: 800px;
	min-height: 300px;
	margin-top: 10px;
	border: 1px solid #eee;
	.noticeBlock{
		height: 35px;
		line-height: 35px;
		font-size: 16px;
		font-weight: bold;
		background: #69c0ff;
		text-align: center;
	}
	.noticeInfo{
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
	.poster{
		color: #4d606a;
		margin-left: 5px;
		margin-right: 10px;
	}
`

export const ContentDue = styled.div`
	float: right;
	width: 300px;
	min-height: 300px;
	border: 1px solid #eee;
	margin-top: 10px;
	.noticeBlock{
		height: 35px;
		line-height: 35px;
		font-size: 16px;
		font-weight: bold;
		background: #69c0ff;
		text-align: center;
	}
	.dueBlock{
		height: 30px;
		margin: 10px 10px;
	}
	.base{
		height: 30px;
		width: 230px;
		background:#eee;
		border-radius: 10px;
		display: inline-block;
	}
	.value{
		height: 30px;
		width: 50%;
		background: #1890ff;
		border-radius: 10px;
		display: inline-block;
	}
	.num{
		float: right;
		color: #fff;
		font-size: 12px;
		text-align: center;
		background: #000;
		width: 40px;
		height: 30px;
		line-height: 30px;
		border-radius: 10px;

	}
	.sixty{

		float: left;
		height: 30px;
		line-height: 30px;
		text-align: center;
		width: 60%;
		background: #f5222d;
		border-radius: 10px;
		display: inline-block;
	}
	.hundred{
		line-height: 30px;
		text-align: center;
		float: left;
		height: 30px;
		width: 100%;
		background: #52c41a;
		border-radius: 10px;
		display: inline-block;
	}
`

export const PostButton = styled.button`
	float: left;
    color: #fff;
    background-color: #4169E1;
    border-color: #4169E1;
    font-weight: bold;
    text-align: center;
    touch-action: manipulation;
    cursor: pointer;
	padding: 6px 12px;
	margin-top:10px;
	margin-right: 900px;
    border: 1px solid transparent; 
    border-radius: 5px;
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
		font-weight: bold;
		margin: 30px 50px;
		.title{
			height: 25px;
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