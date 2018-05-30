import React, { Component } from 'react';
import './../../../public/css/main.css';
import actions from '../../actions/actions.js';
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => ({
	register: (t) => {
		dispatch
	}
})

class RegistrationContent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      eth_address: ''
    }

    this.handleUserData = this.handleUserData.bind(this);
  }

  handleUserData(e, el) {
    this.setState(el);
  }

  render() {
    return (
      <div className="content">
        <h2>Registration</h2>
        <div className="grey-box">
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
            <input type="text" name="password" id="password" value={this.state.password} onChange={ (e) => this.handleUserData(e, {password: e.target.value}) } />
          </div>
          <div className="form-control">
            <label for="eth_address">Eth address:</label>
            <input type="text" name="eth_address" id="eth_address" value={this.state.eth_address} onChange={ (e) => this.handleUserData(e, {eth_address: e.target.value}) } />
          </div>
          <br />
          <button className="standart-btn" onClick={ this.props.register(this.state) }>Register</button>
        </div>

      </div>
    )
  }
}

// export default RegistrationContent;

export default connect(
  mapDispatchToProps
)(RegistrationContent);
