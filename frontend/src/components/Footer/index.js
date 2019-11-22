import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FooterWrapper, Nav, NavItem } from './style';

class Footer extends Component {
	
	handleScrollTop() {
		window.scrollTo(0, 0);
	}

	footer(){
		return (
            <FooterWrapper>
				<Nav>
					<NavItem className="footer">
                        This page is powered by UniLearn!
                    </NavItem>
					<NavItem className="backToTop" onClick={this.handleScrollTop}>
						Back to top
                        <span className="iconfont backIcon">&#xe62d;</span>
					</NavItem>
				</Nav>
			</FooterWrapper>
		)
	}


	render() {

		return this.footer()
	
	}
}

const mapState = (state) => {
	return {
		whichMore: state.getIn(["detail", "whichMore"])
	}
};


export default connect(mapState, null)(Footer);





