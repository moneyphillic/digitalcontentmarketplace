import React, { Component } from 'react';
import { createStore } from 'redux';
import './../../public/css/main.css';
import { connect } from 'react-redux';

import Header from './Header.jsx';
import Aside from './Aside.jsx';
import Wrapper from './Wrapper.jsx';
import FormContainer from './FormContainer.jsx';

const mapStateToProps = (state, ownProps) => {
	return {
		userStatus: state.userStatus
	}
}

class App extends Component {
	constructor(props) {
  	super(props);
	}

	render() {
		return (
			<div className="home">
				<Header />
				<FormContainer />
				{/*<div className="main-container">
					<Aside />
					<Wrapper />
				</div>*/}
			</div>
		);
	}
}

export default connect(
	mapStateToProps
)(App);
