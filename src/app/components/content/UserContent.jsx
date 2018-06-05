import React, { Component } from 'react';
import './../../../public/css/main.css';
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => {
	return {
		userData: state.userData
	}
}

class UserContent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      ethaddress: ''
    }
  }

  returnEl(e) {
    var el;
    if (this.props.userData.id !== '') {
      if (e == 'email') {
        var el = <p>Email: <strong>{ this.props.userData.email }</strong></p>;
      }
      if (e == 'username') {
        var el = <p>Username: <strong>{ this.props.userData.username }</strong></p>;
      }
      if (e == 'ethaddress') {
        var el = <p>Ethaddress: <strong>{ this.props.userData.ethaddress }</strong></p>;
      }
    }
    return el;
  }

  render() {
    return (
      <div className="content">
        <h2>User</h2>
        <div className="grey-box">
          { this.returnEl('email') }
          { this.returnEl('username') }
          { this.returnEl('ethaddress') }
        </div>
      </div>
    )
  }
}

export default connect(
  mapStateToProps
)(UserContent);
