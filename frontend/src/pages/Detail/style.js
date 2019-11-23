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
	.wholeLectureFile{
		margin-top: 10px;
	}
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
    width: 120px;
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
`;

export const StaffTable = styled.table`
	border-collapse: collapse;
	margin: 0 auto;
	text-align: center;
	width: 1000px;
	margin-top: 30px;
	line-height: 30px;
	thead{
		th{
			background-color: #CCE8EB;
			width: 100px;
		}
	} 
	td, th{
		border: 1px solid #cad9ea;
		color: #666;
		height: 30px;
	}
	tbody{
		tr:nth-child(odd){
			background: #fff;
		}
		tr:nth-child(even){
			background: #F5FAFA;
		}
	}
`;

export const ShowChatPage = styled.div`
	width: 1140px;
	height: 600px;
	margin-top: 30px;
	margin-bottom: 50px;

	.chatPageLeft{
		float: left;
		width: 100%;
	}
	.chatPageMiddle{
		float: left;
		width: 40px;
		height: 550px;
		background-color: #1890ff;
	}
	.chatPageRight{
		float: right;
		width: 100%;
	}
	.chatHeader{
		height: 40px;
		line-height: 40px;
		font-size: 18px;
		font-weight: bold;
		text-align: center;
		color: #fff;
		background-color: #000;
		&.Group{
			color: #000;
			background-color: #13c2c2;
		}
		.searchIcon{
			float: right;
			margin-right: 20px;
		}
		.switchChannel{
			width: 38px;
			height: 38px;
			border-radius: 19px;
			color: #fff;
			float: left;
			font-size: 12px;
			font-weight: normal;
			margin-top: 1px;
			margin-left: 2px;
			&.public{
				background-color: #1d39c4;
			}
			&.group{
				color: #fff;
				background-color: #000;
			}
		}
	}
	.chatRoom{
		height: 510px;
		background-color: #eee;
		box-sizing: border-box;
		padding: 20px 15px;
		overflow: auto;
	}
	input{
		width: 990px;
		height: 40px;
		padding: 5px 10px;
		box-sizing: border-box;
		margin-top: 10px;
		margin-right: 20px;
		line-height: 28px;
		font-size: 14px;
		border: 1px solid #ddd;
		border-radius: 5px;
	}
	button{
		width: 128px;
		height: 40px;
		padding: 5px 0;
		box-sizing: border-box;
		color: #000;
		font-size: 18px;
		font-weight: bold;
		margin-top: 10px;
		line-height: 30px;
		border-radius: 8px;
		background-color: #13c2c2;
		&.publicButton{
			color: #fff;
			background-color: #000;
		}
	}

	.myMessage{
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: flex-end;
		.myName{
			color: #8c8c8c;
			font-size: 11px;
			height: 15px;
			line-height: 15px;
			margin-top: 5px;
			padding: 0 5px;
		}
		.myMessageContent{
			font-size: 14px;
			height: 25px;
			line-height: 25px;
			margin-bottom: 5px;
			padding: 3px 10px;
			background-color: #a2e563;
			border-radius: 10px;
			box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.117647);
		}
	}
	.othersMessage{
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		.othersName{
			color: #8c8c8c;
			font-size: 11px;
			height: 15px;
			line-height: 15px;
			margin-top: 5px;
			padding: 0 5px;
		}
		.othersMessageContent{
			font-size: 14px;
			height: 25px;
			line-height: 25px;
			margin-bottom: 5px;
			padding: 3px 10px;
			background-color: #f1f1f1;
			border-radius: 10px;
			box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.117647);
		}

	}
`;


export const AssignmentType = styled.div`
	width: 1140px;
	height: 35px;
	line-height: 35px;
	color: #fff;
	font-weight: bold;
	margin-top: 30px;
	background: #595959;

	.eachAssignmentType{
		text-align: center;
		width: 150px;
		display: inline-block;
		border-right: 2px solid #fff;
		list-style: none;
		float: left;
	}
	.eachAssignmentType:hover{
		background: #13c2c2;
	}
`
export const ShowGroupPage = styled.div`
	width: 1140px;
	height: 600px;
	margin-top: 20px;
	margin-bottom: 50px;
	.groupInfoTitle{
		color: #000;
		font-size: 16px;
		font-weight: 500;
		padding: 5px 0;
		margin-top: 40px;
		border-bottom: 1px solid #bfbfbf;
		.groupInfoName{
			width: 120px;
			margin-right: 50px;
			text-align: center;
			display: inline-block;
		}
		.groupInfoType{
			width: 120px;
			text-align: center;
			display: inline-block;
		}
		.groupInfoTopic{
			width: 380px;
			text-align: center;
			display: inline-block;
		}
		.groupInfoMember{
			width: 120px;
			margin-right: 50px;
			text-align: center;
			display: inline-block;
		}	
	}
	.groupCreateOrMatch{
		margin-top: 30px;
	}
	.groupCreate{
		width: 880px;
		height: 530px;
		background-color: #fafafa;
		margin-left: auto;
		margin-right: auto;
	}
	.navHead{
		color: #fff;
		font-size: 18px;
		font-weight: 600;
		height: 35px;
		line-height: 35px;
		text-align: center;
		background-color: #9254de;
		&.right{
			background-color: #d4b106;
		}
	}
	.navAllContent{
		margin-top: 50px;
		margin-bottom: 20px;
	}
	.navContent{
		font-size: 14px;
		font-weight: bold;
		margin-left: auto;
		margin-right: auto;
		.groupMenu{
			width: 150px;
			height: 30px;
			line-height: 30px;
			padding: 5px 0;
			margin-left: 120px;
			box-sizing: border-box;
		}
		.groupInput{
			width: 600px;
			height: 35px;
			padding: 5px 10px;
			margin-left: 120px;
			box-sizing: border-box;
			line-height: 20px;
			font-size: 14px;
			border: 1px solid #ddd;
			border-radius: 5px;
		}
	}
`;

export const SelectGroupType = styled.div`
	margin-top: 30px;
	.selectWords{
		margin-right: 10px;
	}
	.select{
		width: 300px;
		height: 35px;
		padding: 5px 10px;
		box-sizing: border-box;
		line-height: 20px;
		font-size: 14px;
		border: 1px solid #ddd;
		border-radius: 5px;
	}
`


export const GroupContent = styled.div`
	width: 100%;
	height: 50px;
	line-height: 50px;
	background: #eee;
	margin-top: 20px;
	.groupInfoName{
		height: 50px;
		line-height: 50px;
		width: 120px;
		margin-right: 50px;
		text-align: center;
		display: inline-block;
	}
	.groupInfoType{
		height: 50px;
		line-height: 50px;
		width: 120px;
		text-align: center;
		display: inline-block;
	}
	.groupInfoTopic{
		box-sizing: border-box;
		height: 50px;
		line-height: 50px;
		width: 380px;
		text-align: center;
		display: inline-block;
	}
	.groupInfoMember{
		height: 50px;
		line-height: 50px;
		width: 120px;
		margin-right: 50px;
		text-align: center;
		display: inline-block;
	}

	.joinIcon{
		// display: inline-block;
		// background: yellow;
		height: 50px;
		color: #d48806;
		font-size: 20px;
		cursor: pointer;
		margin-right: 20px;
	}
	.leaveIcon{
		font-size: 20px;
		cursor: pointer;
	}
`;


export const CreateButton = styled.button`
    color: #fff;
    font-size: 16px;
    font-weight: 500;
    text-align: center;
    cursor: pointer;
	padding: 6px 12px;
	border-radius: 5px;
	margin-right: 20px;
	background-color: #4169E1;
	border: 1px solid transparent; 
	&.confirm{
		margin-top: 20px;
		margin-left: 360px;
		width: 120px;
		height: 40px;
		font-weight: bold;
		background-color: #000;
	}
}
`;

export const LectureInfo = styled.div`
	float: left;
	margin: 10px 25px;
	min-height: 1s00px;
	width: 520px;
	border-radius: 5px;
	.time{
		border-radius: 5px;
		color: #fff;
		text-align: center;
		height: 30px;
		line-height: 30px;
		background: #2f54eb;
	}
	.fileBlock{
		height: 30px;
		background: #eee;
		margin: 5px 0;
		padding: 0 10px;
		box-sizing: border-box;
		line-height: 30px;
	}
	.file{
		width: 200px;
		height: 30px;	
	}
	.downloadIcon{
		float: right;
		margin-right: 15px;
		cursor: pointer;
		color: #d48806;
	}
	.link{
		text-decoration: none;
	}
`;

export const AssignmentBlock = styled.div`
	width: 1140px;
	min-height: 300px;
	margin-top: 20px;
	.progressTask{
		color: #fff;
		height: 40px;
		width: 200px;
		text-align: center;
		line-height: 40px;
		font-weight: bold;
		background: #2f54eb;
		border-radius: 10px;
	}
	.taskBlock{
		padding-bottom: 30px;
		margin-bottom: 50px;
		border-bottom: 1px solid #8c8c8c;
	}
	.phaseDoing{
		height: 40px;
		line-height: 40px;
		border: 1px solid #ddd;
		border-radius: 10px;
		margin-top: 15px;
		padding: 0 10px;
		.assnTitle{
			text-decoration: none;
			under-line: none;
		}
	}
	.assButton{
		font-size: 16px;
		font-weight: 500;
		text-align: center;
		cursor: pointer;
		padding: 6px 12px;
		border-radius: 5px;
		background-color: #4169E1;
		border: 1px solid transparent; 
		margin-left: 40px;
		float: right;
		height: 80%;
		margin-top: 4px;
	}
	.doing{
		color: #d48806;
		background: #000;
		width: 120px;
	}
	.submit{
		color: #fff;
		width: 100px;
		background: #096dd9;
	}
	.download{
		color: #000;
		width: 100px;
		background: #ccc;
	}
	.generalInfo{
		margin: 30px 20px;
		padding: 5px 20px;
		box-sizing: border-box;
		background: #f5f5f5;
		border-bottom: 1px solid #ddd;

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
		margin-bottom: 10px;
	}
	.commentTitle{
		font-size: 18px;
		text-align: justify;
		height: 25px;
		line-height: 25px;
		margin-bottom: 10px;
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
		.actionset{
			
		}
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
	.allComments{
		border: 1px solid #ddd;
	}
	.commentHeader{
		height: 40px;
		background: #eee;
		font-size: 20px;
		font-weight: bold;
		padding: 10px 20px;
		box-sizing: border-box;
	}
`

export const InputWindow = styled.textarea`
	margin: 5px 0;
	width: 100%;
	height: 60px;
	padding: 3px 12px;
	font-size: 14px;
	box-sizing: border-box;
	border: 1px solid #ccc;
	background-color: #eee;
`;

export const Comment = styled.div`
	background: #eee;
	margin: 10px 0;
	padding: 5px;
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
	border-radius: 5px;
	background-color: #4169E1;
}
`;

export const PostResourceButton = styled.button`
    color: #fff;
    background-color: #4169E1;
    border-color: #4169E1;
    font-weight: 500;
    text-align: center;
    vertical-align: middle;
    touch-action: manipulation;
    cursor: pointer;
	padding: 6px 12px;
	margin-top: 10px;
    border: 1px solid transparent; 
    border-radius: 5px;
}
`;

export const PostComment = styled.button`
    color: #fff;
	background-color: #000;
	font-size: 20px;
    font-weight: bold;
    text-align: center;
    cursor: pointer;
	border-radius: 5px;
	width: 1100px;
	margin: 10px 19px;
	height: 40px;
}
`;

export const ModalWrapper = styled.div`
	.modal {
		position: fixed;
		width: 400px;
		height: 200px;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: 100px auto;
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
		margin: 20px 50px;
		.title{
			height: 25px;
			line-height: 25px;	
		}

	}
	
	.modal-content {
		font-size: 14px;
		margin: 0 50px;
		margin-bottom: 20px;
		.content{
			margin-right: 10px;
			font-weight: bold;
			height: 25px;
			line-height: 25px;
		}
		.frontend{
			margin-right: 20px;
		}
	}
	
	.modal-operator {
		margin-top: 20px;
		width: 100%;
		height: 40px;
		text-align: center
	}
	
	.modal-operator-button{
		// width: 60px;
		border: none;
		outline: none;
		height: 30px;
		line-height: 30px;
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

export const PostResourceWrapper = styled.div`
	.modal {
		position: fixed;
		width: 600px;
		height: 460px;
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
		margin: 20px 50px;
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
		margin-bottom: 20px;
		.content{
			height: 25px;
			line-height: 25px;
		}
		.content-input{
			width: 500px;
			height: 110px;
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

export const PostThreadWrapper = styled.div`
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
			font-size: 14px;
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
			height: 100px;
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
export const SearchModalWrapper = styled.div`
	.pmodal {
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
		z-index: 9997;
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
	.pmodal-title {
		margin: 30px 50px;
		height: 35px;
		line-height: 35px;
		.publicSearch{
			padding: 0;
			color: #fff;
			background: #000;
			display: inline-block;
			width: 100px;
			height: 34px;
			float: right;
		}
		.ptitle-input{
			padding: 0 0 0 5px;
			width: 380px;
			height: 35px;
			font-weight: normal;
			box-sizing: border-box;
			line-height: 35px;
			border-radius: 5px;
		}
	}
	.search-result {
		height: 180px;
		border: 1px solid #bfbfbf;
		width: 500px;
		background: #fff;
		font-size: 14px;
		margin: 0 50px;
		margin-bottom: 10px;
		padding-left: 20px; 
		box-sizing: border-box;
		overflow: auto;
		color: black;
	}

	.search-confirm{
		opacity: 1;
		min-width: 100px;
		color: #fff;
		font-size: 14px;
		font-weight: bold;
		background: #000;
		cursor: pointer;
		border-radius: 10px;
		margin-top: 10px;
		margin-left: 240px;

	}
	.mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: #000;
		opacity: .6;
		z-index: 9996;
	}
`


export const MatchGroupHint = styled.div`
	.modal {
		position: fixed;
		width: 400px;
		height: 200px;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: 100px auto;
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
		margin: 20px 50px;
		.title{
			height: 25px;
			line-height: 25px;	
		}

	}
	
	.modal-operator {
		margin-top: 50px;
		width: 100%;
		height: 40px;
		text-align: center
	}
	
	.modal-operator-button{
		border: none;
		outline: none;
		height: 30px;
		line-height: 30px;
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
