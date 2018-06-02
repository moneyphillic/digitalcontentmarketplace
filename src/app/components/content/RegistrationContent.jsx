import React, { Component } from 'react';
import './../../../public/css/main.css';
import actions from '../../actions/actions.js';
import { connect } from 'react-redux';

class RegistrationContent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      eth_address: '',
      message: '',
      message_class: ''
    }

    this.handleUserData = this.handleUserData.bind(this);
  }

  handleUserData(e, el) {
    this.setState(el);
    this.setState({message: '', message_class: ''})
  }

  register = (userData) => {
    this.setState({message: '', message_class: ''});

    var error;
    if (userData.email === '' || userData.username === '' || userData.password === '' || userData.eth_address === '') {
        error = 'Please fill all the fields'
    }

    if (typeof error === 'undefined') {
      fetch('http://localhost:8000/register', {
        mode: 'no-cors',
        headers: {
          'Accept': 'application/json'
        },
        method: 'POST',
  			body: JSON.stringify({
  				email: userData.email,
          username: userData.username,
  				password: userData.password,
          ethaddress: userData.eth_address
  			})
  		})
  		.then(response => {
        this.setState({message: 'Your registration was successfull!', message_class: 'scs-txt'});
  		})
  		.catch(err => {
        console.log('request failed', err);
      })
    } else {
      this.setState({message: error, message_class: 'err-txt'});
    }
  }

  render() {
    return (
      <div className="content">
        <h2>Registration</h2>
        <div className="grey-box">
          <p className={ this.state.message_class }>{ this.state.message }</p>
          <div className="form-control">
            <label for="email">Email:</label>
            <input type="text" name="email" id="email" value={this.state.email} onChange={ (e) => this.handleUserData(e, {email: e.target.value}) } />
          </div>
          <div className="form-control">
            <label for="email">Username:</label>
            <input type="text" name="username" id="username" value={this.state.username} onChange={ (e) => this.handleUserData(e, {username: e.target.value}) } />
          </div>
          <div className="form-control">
            <label for="password">Password:</label>
            <input type="password" name="password" id="password" value={this.state.password} onChange={ (e) => this.handleUserData(e, {password: e.target.value}) } />
          </div>
          <div className="form-control">
            <label for="eth_address">Eth address:</label>
            <input type="text" name="eth_address" id="eth_address" value={this.state.eth_address} onChange={ (e) => this.handleUserData(e, {eth_address: e.target.value}) } />
          </div>
          <br />
          <button className="standart-btn" onClick={ () => { this.register(this.state) } }>Register</button>
        </div>
      </div>
    )
  }
}

export default RegistrationContent;
