import styled from 'styled-components';


export const ContentWrapper = styled.div`
    min-height: 100%;
    overflow: auto;
	position: relative;
	margin-top: 20px;
	background-color: #fff;
    font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
`;

export const Nav = styled.div`
    display: block;
    min-height: 600px;
    width: 1140px;
    padding: 0px 15px;
	margin: 30px auto;
	.moreTitle{
		height: 80px;
		line-height: 80px;
		margin: 30px 0;
		font-size: 30px;
		font-weight: bold;
		text-align: center;

	}
	.moreContent{
		min-height: 50px;
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

