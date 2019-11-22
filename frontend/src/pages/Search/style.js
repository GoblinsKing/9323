import styled from 'styled-components';


export const ContentWrapper = styled.div`
    min-height: 100%;
    overflow: auto;
	position: relative;
	margin-top: 20px;
	background-color: #fff;
    font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
`;

export const WelcomeBorder = styled.div`
    width: 1140px;
	height: 100%;
    color: #000;
    padding: 15px 0px;
    margin: 0 auto;
    margin-top: 20px;
    margin-bottom: 10px;
	border-bottom: 1px solid #eee;
`;

export const Welcome = styled.div`
	font-color: #000;
	font-size: 36px;
	font-weight: 500;
	margin-bottom: 10px;
`;

export const Nav = styled.div`
    display: block;
    height: 80px;
    width: 1140px;
    padding: 0px 15px;
    margin: 30px auto;
`;

export const NavItem = styled.div`
    float: left; 
`;

export const Label = styled.div`
    float: top;
    color: #000;
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 5px;
    display: inline-block;
`;

export const Input = styled.input`
    color: #555;
    width: 434px;
    height: 20px;
    padding: 6px 12px;
    margin-right: 35px;
    margin-bottom: 20px;
    font-size: 14px;
    text-rendering: auto;
    display: block;
    border: 1px solid #ccc;
    background-color: rgb(232, 240, 254);
    box-shadow: inset 0 1px 1px rgba(0,0,0,0.075);
`;

export const Button = styled.button`
    color: #fff;
    font-size: 14px;
    text-align: center;
    width: 150px;
    height: 34px;
    margin-top: 20px;
    padding-right: 0px;
    cursor: pointer;
    background-color: #4169E1;
    border-color: #4169E1;
    border: 1px solid transparent;
    border-radius: 5px;
`;
export const BaseLine = styled.div`
    float: left;
    color: #000;
    font-size: 20px;
    width: 1140px;
    height: 30px;
    margin-top: 20px;
    border-bottom: 1px solid #eee;
`;

export const ItemHead = styled.div`
    float: left;
    width: 1140px;
    color: #000;
    font-size: 15px;
    font-weight: 500;
    border-bottom: 1px solid #bfbfbf;
    padding: 10px 0;
    .courseCode{
        float: left;
        width: 420px;
        text-align: left;
        padding-left: 20px;
    }
    .courseName{
        float: left;
        width: 290px;
        text-align: left;
        padding-left: 40px;
    }
    .courseSemester{
        float: right;
        width: 330px;
        text-align: right;
        padding-right: 30px;
    }
`;

export const ItemAll = styled.div`
    float: left;
    margin-bottom: 100px;
`

export const ItemList = styled.div`
    float: left;
    color: #000;
    font-size: 13px;
    font-weight: 400;
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #eee;
    padding: 10px 0;
    width: 1140px;
    .courseCode{
        float: left;
        width: 420px;
        color: #597ef7;
        text-align: left;
        padding-left: 20px;
    }
    .courseName{
        float: left;
        width: 320px;
        text-align: left;
    }
    .courseSemester{
        float: right;
        width: 330px;
        text-align: right;
        padding-right: 50px;
    }
`;





