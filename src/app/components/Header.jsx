import React, { Component } from 'react';
import './../../public/css/main.css';


class Header extends Component {
	constructor(props) {
    	super(props);
  	}

	render() {
		return (
			<div className="header">
				<h3>Demo project</h3>
			</div>
		);
	}
}

export default Header;
