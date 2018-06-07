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
      ethaddress: '',
      price: '',
      selectedFile: null
    }
    this.handleArtworkFile = this.handleArtworkFile.bind(this);
    this.handleArtworkPrice = this.handleArtworkPrice.bind(this);
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
      // Show upload box only for loggedI users
    }
    return el;
  }

  handleArtworkPrice(e) {
    this.setState({price: e.target.value})
  }

  handleArtworkFile(e) {
    this.setState({selectedFile: e.target.files[0]});
  }

  uploadFile = () => {
    const data = new FormData();
    data.append('file', this.state.selectedFile);
    data.append('user', this.props.userData.id);
    data.append('price' this.state.price);

    fetch('http://localhost:8000/uploadartwork', {
      mode: 'no-cors',
      method: 'POST',
      body: data
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('Error: ' + err);
    })
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
        <br />
        <div className="grey-box">
          <div className="form-control">
            <label for="artwork">Upload an artwork:</label>
            <input type="file"  onChange={ this.handleArtworkFile } />
          </div>
          <div className="form-control">
            <label for="price">Set price to your artwork:</label>
            <input type="number" name="price" id="price" value={ this.state.price } onChange={ this.handleArtworkPrice } />
          </div>
          <br />
          <button className="standart-btn" onClick={ () => { this.uploadFile() } }>Upload</button>
        </div>
      </div>
    )
  }
}

export default connect(
  mapStateToProps
)(UserContent);
