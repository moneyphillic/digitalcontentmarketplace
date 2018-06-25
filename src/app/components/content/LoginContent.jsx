import React, { Component } from 'react';
import './../../../public/css/main.css';
import { connect } from 'react-redux';
import actions from '../../actions/actions.js';
import reducers from '../../reducers/reducers.js';

const mapStateToProps = (state, ownProps) => {
	return {
		page: state.page,
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

class LoginContent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    }
    this.handleUserData = this.handleUserData.bind(this);
  }

	componentDidMount() {
		// this.getUserData();
	}

  handleUserData(e, el) {
    this.setState(el);
  }

  login = (userData) => {
		var data = new FormData();
		data.append('_username', userData.email);
		data.append('_password', userData.password);

    fetch('http://localhost:8000/customlogin', {
      method: 'POST',
			body: data
    })
    .then(response => {
			// On successfull login execute this.getUserData
			return response.json();
    })
		.then(json => {
			var userid = json.response.userid;
			this.getUserData(userid);
		})
    .catch(err => {
      console.log('Login request failed', err);
    })
  }

  changeLogStatus(userStatus) {
    this.props.onChangeLogStatus(true);
  }

	getUserData = (userid) => {

			fetch('http://localhost:8000/getuserdata?userid=' + userid)
	    .then(response => {
				return response.json();
	    })
			.then(json => {
				console.log(json.user)
				var user = json.user;
				this.props.changeUserData(true, user.id, user.email, user.username, user.ethAddress);
			})
	    .catch(err => {
	      console.log('getUserData request failed', err);
	    });
	}

  render() {
    return (
      <div className="content">
        <h2>Login</h2>
        <div className="grey-box">
          <div className="form-control">
            <label for="email">Email:</label>
            <input type="text" name="email" id="email" value={this.state.email} onChange={ (e) => this.handleUserData(e, {email: e.target.value}) } />
          </div>
          <div className="form-control">
            <label for="password">Password:</label>
            <input type="text" name="password" id="password" value={this.state.password} onChange={ (e) => this.handleUserData(e, {password: e.target.value}) } />
          </div>
          <br />
          <button className="standart-btn" onClick={ () => this.login(this.state) }>Login</button>
        </div>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContent);
