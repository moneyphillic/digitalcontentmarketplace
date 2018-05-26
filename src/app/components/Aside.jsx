import React, { Component } from 'react';
import { connect } from 'react-redux';

import actions from '../actions/actions.js';
import reducers from '../reducers/reducers.js';
import './../../public/css/main.css';

const mapStateToProps = (state, ownProps) => {
	return {
		page: state.page
	}
}

const mapDispatchToProps = (dispatch) => ({
	onChangePage: (t) => {
		dispatch({type: t})
	}
})

class Aside extends Component {
	constructor(props) {
  	super(props);
	}

	changePage(page) {
		this.props.onChangePage(page);
	}

	render() {
		return (
			<aside className="aside-menu">
				<div className="menu-bar">
					<p onClick={ () => this.changePage('intro_page') } >Intro</p>
					<p onClick={ () => this.changePage('contract_page') } >Contract</p>
					<p onClick={ () => this.changePage('product_page') } >Product page</p>
					<p onClick={ () => this.changePage('shareholder_page') } >Shareholder</p>
					<p onClick={ () => this.changePage('registration_page') }>Registration</p>
					<p onClick={ () => this.changePage('login_page') }>Login</p>
					<p onClick={ () => this.changePage('user_page') }>User</p>
					<p onClick={ () => this.changePage('products_page') }>Products</p>
					<p onClick={ () => {console.log(this.props.page)} } >Show state</p>
				</div>
			</aside>
		);
	}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Aside)
