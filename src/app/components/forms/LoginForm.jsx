import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => {
	return {
		userStatus: state.userStatus,
		userData: state.userData
	}
}

const mapDispatchToProps = (dispatch) => ({
	onChangeLogStatus: (t) => {
		dispatch({type: t})
	},
	changeUserData: (t, id, email, username, ethaddress) => {
		dispatch({type: t, id: id, email: email, username: username, ethaddress: ethaddress})
	}
})

class LoginForm extends Component {
	constructor(props) {
  	super(props);
		this.state = {
      email: '',
      password: '',
    }
    this.handleUserData = this.handleUserData.bind(this);
	}

	handleUserData(e, el) {
    this.setState(el);
  }

	changeUserStatus = (res) => {
		this.props.onChangeLogStatus(res)
	}

	login = (data) => {
		var formData = new FormData();
		formData.append('email', data.email);
		formData.append('password', data.password);

		fetch('http://localhost:8000/customlogin', {
      method: 'POST',
			body: formData
    })
    .then(response => {
			return response.json();
    })
		.then(json => {
			let res = json.response;
			if (res.status === 200) {
				this.changeUserStatus(true);
				this.getUserData(res.userid);
			} else {
				return res;
			}
		})
    .catch(err => {
      console.log('Login request failed', err);
    })
	}

	getUserData = (userid) => {
			fetch('http://localhost:8000/getuserdata?userid=' + userid)
	    .then(response => {
				return response.json();
	    })
			.then(json => {
				var user = json.user;
				this.props.changeUserData(true, user.id, user.email, user.username, user.ethAddress);
				console.log(this.props.userData);
			})
	    .catch(err => {
	      console.log('getUserData request failed', err);
	    });
	}

	render() {
		return (
      <div className="form-content">
        <h2>Login</h2>
        <div className="form-control">
          <label for="email">Email:</label>
          <input type="email" name="email" id="email" value={this.state.email} onChange={ (e) => this.handleUserData(e, {email: e.target.value}) }/>
        </div>
        <div className="form-control">
          <label for="password">Password:</label>
          <input type="password" name="password" id="password" value={this.state.password} onChange={ (e) => this.handleUserData(e, {password: e.target.value}) } />
        </div>
        <div className="form-control">
          <label for="remember-me"><span style={{color: '#000'}}>Remember:</span>
            <input type="checkbox" name="remember-me" id="remember-me"/>
          </label>
        </div>
        <div className="form-control">
          <button type="submit" name="submit" onClick={ () => this.login(this.state) }>Submit</button>
        </div>
      </div>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LoginForm)
