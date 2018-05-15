import React, { Component } from 'react';
import { createStore } from 'redux';
import './../../public/css/main.css';

import Header from './Header.jsx';
import Aside from './Aside.jsx';
import Wrapper from './Wrapper.jsx';

class App extends Component {
	constructor(props) {
    	super(props);
  	}

	render() {
		return (
			<div className="home">
				<Header />
				<div className="main-container">
					<Aside />
					<Wrapper />
				</div>
			</div>
		);
	}
}

export default App;
