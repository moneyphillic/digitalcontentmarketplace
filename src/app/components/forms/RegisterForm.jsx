import React, { Component } from 'react';

class RegisterForm extends Component {
	constructor(props) {
  	super(props);
	}

	render() {
		return (
      <div className="form-content">
        <h2>Sign Up</h2>
        <div className="form-control">
          <label for="email">Email:</label>
          <input type="email" name="email" id="email"/>
        </div>
        <div className="form-control">
          <label for="ethaddress">Ethereum address</label>
          <input type="text" name="ethaddress" id="ethaddress"/>
        </div>
        <div className="form-control">
          <label for="password">Password</label>
          <input type="password" name="password" id="password"/>
        </div>
        <div className="form-control">
          <label for="password_conf">Confirm password</label>
          <input type="password" name="password_conf" id="password_conf"/>
        </div>
        <div className="form-control">
          <label for="remember-me"><span style={{color: '#000'}}>Remember:</span>
            <input type="checkbox" name="remember-me" id="remember-me"/>
          </label>
        </div>
        <div className="form-control">
          <button type="submit" name="submit">Submit</button>
        </div>
      </div>
		);
	}
}

export default RegisterForm;
