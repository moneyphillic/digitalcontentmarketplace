import React, { Component } from 'react';
import { createStore } from 'redux';
import './../../public/css/main.css';
import { connect } from 'react-redux';

import IntroContent from './content/IntroContent.jsx';
import ContractContent from './content/ContractContent.jsx';
import ProductContent from './content/ProductContent.jsx';

const mapStateToProps = (state, ownProps) => {
	return {
		page: state.page
	}
}

class Wrapper extends Component {
	constructor(props) {
  	super(props);
	}

	showContent = (c) => {
		console.log(c);

		switch (c) {
			case 'Contract':
				return <ContractContent />
				break;
			case 'Product page':
				return <ProductContent />
				break;
			case 'Intro':
				return <IntroContent />
				break;
			default:
				return <IntroContent />
				break;
		}
		return <IntroContent />
	}

	render() {
		return (
			<div className="wrapper">
				<h4> / {this.props.page}</h4>
				{this.showContent(this.props.page)}
			</div>
		);
	}
}

export default connect(
  mapStateToProps
)(Wrapper)
