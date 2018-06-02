import React, { Component } from 'react';
import './../../../public/css/main.css';
import { connect } from 'react-redux';
import actions from '../../actions/actions.js';
import reducers from '../../reducers/reducers.js';

const mapStateToProps = (state, ownProps) => {
	return {
		page: state.page,
		userStatus: state.userStatus
	}
}

const mapDispatchToProps = (dispatch) => ({
	onChangeLogStatus: (t) => {
		dispatch({type: t})
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

  handleUserData(e, el) {
    this.setState(el);
  }

  login = (userData) => {
    fetch('http://localhost:8000/login', {
      mode: 'no-cors',
      headers: {
        'Accept': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        email: userData.email,
        password: userData.password
      })
    })
    .then(response => {
      console.log(response);
    })
    .catch(err => {
      console.log('request failed', err);
    })
  }

  changeLogStatus(userStatus) {
    this.props.onChangeLogStatus(true);
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
          <button className="standart-btn" onClick={ () => this.changeLogStatus(true) }>Login</button>
        </div>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContent);
