import React, { Component } from 'react';
import './../../../public/css/main.css';

class RegistrationContent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      eth_address: ''
    }
  }

  render() {
    return (
      <div className="content">

        <h2>Registration</h2>
        <div className="grey-box">
          <div className="form-control">
            <label for="email">Email:</label>
            <input type="text" name="email" id="email" value={this.state.email} onChange={ () => {} } />
          </div>
          <div className="form-control">
            <label for="email">Username:</label>
            <input type="text" name="username" id="username" value={this.state.username} onChange={ () => {} } />
          </div>
          <div className="form-control">
            <label for="password">Password:</label>
            <input type="text" name="password" id="password" value={this.state.password} onChange={ () => {} } />
          </div>
          <div className="form-control">
            <label for="eth_address">Eth address:</label>
            <input type="text" name="eth_address" id="eth_address" value={this.state.eth} onChange={ () => {} } />
          </div>
          <br />
          <button className="standart-btn" onClick={ () => {} }>Register</button>
        </div>

      </div>
    )
  }
}

export default RegistrationContent;
