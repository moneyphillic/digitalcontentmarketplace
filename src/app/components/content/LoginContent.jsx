import React, { Component } from 'react';
import './../../../public/css/main.css';

class LoginContent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    }
  }

  render() {
    return (
      <div className="content">
        <h2>Login</h2>
        <div className="grey-box">
          <div className="form-control">
            <label for="email">Email:</label>
            <input type="text" name="email" id="email" value={this.state.email} onChange={ () => {} } />
          </div>
          <div className="form-control">
            <label for="password">Password:</label>
            <input type="text" name="password" id="password" value={this.state.password} onChange={ () => {} } />
          </div>
          <br />
          <button className="standart-btn" onClick={ () => {} }>Login</button>
        </div>
      </div>
    )
  }
}

export default LoginContent;
