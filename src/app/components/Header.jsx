import React, { Component } from 'react';
import './../../public/css/main.css';
import { connect } from 'react-redux';

import actions from '../actions/actions.js';

const mapStateToProps = (state, ownProps) => {
	return {
		formState: state.formState,
		userStatus: state.userStatus
	}
}

const mapDispatchToProps = (dispatch) => ({
	formControl: (action) => {
		dispatch(action);
	}
});

class Header extends Component {
	constructor(props) {
  	super(props);
	}

	formControl = (action) => {
		this.props.formControl(action);
	}

	getFormState = (form) => {
		if (this.props.formState.state === 'closed') {
			switch(form) {
				case 'login':
					return actions.openLoginForm();
				case 'register':
					return actions.openRegisterForm();
			}
		} else if (this.props.formState.state === 'open') {
			switch(form) {
				case 'login':
					return actions.closeLoginForm();
				case 'register':
					return actions.closeRegisterForm();
			}
		}
	}

	btnsStyle = (formBtn) => {
		let form = this.props.formState.form;
		let fState = this.props.formState.state;
		if (formBtn !== form && fState !== 'closed') {
			return { visibility: 'hidden', opacity: 0  };
		} else {
			return { visibility: 'visible', opacity: 1 };
		}
	}

	closeBtnStye = (formBtn) => {
		let form = this.props.formState.form;
		let fState = this.props.formState.state;
		if (formBtn === form && fState === 'open') {
			return { visibility: 'visible', opacity: 1  };
		} else {
			return { visibility: 'hidden', opacity: 0  };
		}
	}

	changeLogButton = (btn) => {
		let loggedIn = this.props.userStatus.loggedIn;
		if (loggedIn === false) {
			if (btn === 'login') {
				return { display: 'block'};
			} else if (btn === 'logout') {
				return { display: 'none'};
			}
		} else if (loggedIn === true) {
			if (btn === 'login') {
				return { display: 'none'};
			} else {
				return { display: 'block'};
			}
		}
	}

	render() {
		return (
			<header className="header">

				<div className="logo">
					<a href="">
						<img src="../public/images/artradeio.svg" />
					</a>
				</div>

				<div className="navigation">

					<a href="javascript:;"
						style={this.btnsStyle('login')}
						className="form-btn login-form-btn"
						onClick={ () => this.formControl(this.getFormState('login')) }>Login <span style={this.closeBtnStye('login')}>X</span> </a>

					<a href="javascript:;"
						style={this.btnsStyle('register')}
						className="form-btn register-form-btn"
						onClick={ () => this.formControl(this.getFormState('register')) }>Sign up <span style={this.closeBtnStye('register')}>X</span> </a>

					<a href="javascript:;"
						style={this.changeLogButton('logout')}
						className="form-btn logout-form-btn">Logout</a>

				</div>

			</header>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Header)
