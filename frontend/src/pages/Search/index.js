import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import { ContentWrapper, Nav, NavItem,
	WelcomeBorder, Welcome, Label, Input, Button, ItemHead, ItemList, ItemAll } from './style';


class Search extends Component {

	constructor(props){
		super(props);
		this.state = {
			checkSearch: false
		}
	}
	
	handleBeforeSearch(){
		if (this.props.courseList) {
			return this.props.courseList.map((item) => {
				return (
					<ItemList key={item.get('id')}>
						<p>
							<a href={`https://webcms3.cse.unsw.edu.au/${item.get('code')}/${item.get('term')}`} 
								target="_blank"
								rel="noopener noreferrer">
								<span className="courseCode">{item.get('code')}</span>
							</a>									
							<span className="courseName">{item.get('title')}</span>
							<span className="courseSemester">{item.get('term')}</span>
						</p>
					</ItemList>
				)
			})
		}
	}

	handleAfterSearch(){
		if (this.props.searchResult) {
			return this.props.searchResult.map((item) => {
				return (
					<ItemList key={item.get('id')}>
						<p>
							<a href={`https://webcms3.cse.unsw.edu.au/${item.get('code')}/${item.get('term')}`} 
								target="_blank"
								rel="noopener noreferrer">
								<span className="courseCode">{item.get('code')}</span>
							</a>									
							<span className="courseName">{item.get('title')}</span>
							<span className="courseSemester">{item.get('term')}</span>
						</p>
					</ItemList>
				)
			})
		}
	}

	render() {
		return (
			<ContentWrapper>
				<WelcomeBorder>
					<Welcome>Course Search</Welcome>
				</WelcomeBorder>
				<Nav>
					<NavItem>
						<Label>Search Term</Label>
						<Input placeholder="Course Code" ref={(input) => { this.courseCode = input }}></Input>
					</NavItem>
					<NavItem>
						<Label>Semester</Label>
						<Input placeholder="Which Semester" ref={(input) => { this.courseSemester = input }}></Input>
					</NavItem>
					<NavItem>
						<Button onClick={ () => { this.props.search(this.courseCode, this.courseSemester);
												  this.setState({ checkSearch: true }) }}>
							Search
						</Button>
					</NavItem>
					
					<ItemHead>
						<p>
							<span className="courseCode">Course Code</span>
							<span className="courseName">Course Name</span>
							<span className="courseSemester">Semester</span>
						</p>
					</ItemHead>
					<ItemAll>
						{ 	this.state.checkSearch ? 
							this.handleAfterSearch() :
							this.handleBeforeSearch() 
						}
					</ItemAll>
				</Nav>
			</ContentWrapper>
		)
	}

}

const mapState = (state) => {
	return {
		courseList: state.getIn(["home", "courseList"]),
		searchResult: state.getIn(["search", "searchResult"])
	}
}

const mapDispatch = (dispatch) => ({
	search(courseCode, courseSemester) {
		dispatch(actionCreators.searchData(courseCode.value, courseSemester.value))
	}
});

export default connect(mapState, mapDispatch)(Search);
