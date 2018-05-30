import React, { Component } from 'react';
import { createStore } from 'redux';
import './../../public/css/main.css';
import { connect } from 'react-redux';

import IntroContent from './content/IntroContent.jsx';
import ContractContent from './content/ContractContent.jsx';
import ProductContent from './content/ProductContent.jsx';
import ShareholderContent from './content/ShareholderContent.jsx';
import RegistrationContent from './content/RegistrationContent.jsx';
import LoginContent from './content/LoginContent.jsx';
import UserContent from './content/UserContent.jsx';
import ProductsContent from './content/ProductsContent.jsx';

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
			case 'Shareholder':
				return <ShareholderContent />
				break;
			case 'Registration':
				return <RegistrationContent />
				break;
			case 'Login':
				return <LoginContent />
				break;
			case 'User':
				return <UserContent />
				break;
			case 'Products':
				return <ProductsContent />
				break;
			default:
				return <IntroContent />
				break;
		}
		return <IntroContent />
	}

	render() {
		console.log(this.props.page);
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
