import styled from 'styled-components';


export const ContentWrapper = styled.div`
    min-height: 600px;
    overflow: auto;
	position: relative;
    margin-top: 20px;
    margin-bottom: 60px;
	background-color: #fff;
	font-family: Helvetica;
`;

export const WelcomeBorder = styled.div`
    display: block;
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
	width: 555px;
    height: 212px;
    padding: 19px;
	margin: 20px auto;
    border: 1px solid #e3e3e3;
    border-radius: 0;
    background-color: #f5f5f5;
    box-shadow: inset 0 1px 1px rgba(0,0,0,0.05);
`;

export const PP = styled.div`
    color: #000;
    font-size: 14px;
    margin-bottom: 10px;
`;

export const Label = styled.div`
    color: #000;
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 5px;
    display: inline-block;
`;

export const Input = styled.input`
    width: 100%;
    height: 34px;
    padding: 6px 12px;
    margin-bottom: 20px;
    font-size: 14px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    background-color: rgb(232, 240, 254) !important;
    transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
}
`;

export const Button = styled.button`
    color: #fff;
    width: 100px;
    font: normal normal normal 16px/1 FontAwesome;
    background-color: #4169E1;
    border-color: #4169E1;
    font-weight: 500;
    text-align: center;
    vertical-align: middle;
    touch-action: manipulation;
    cursor: pointer;
    padding: 6px 12px;
    border: 1px solid transparent; 
    border-radius: 5px;
}
`;





