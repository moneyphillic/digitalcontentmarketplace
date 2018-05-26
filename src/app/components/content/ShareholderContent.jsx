import React, { Component } from 'react';
import './../../../public/css/main.css';
import Web3 from 'web3';

class ShareholderContent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      share: '',
      vote: '',
      transfer_to: '',
      transfer_amount: '',
      allocating_agreement_percent: ''
    }

    this.handleTransferTo = this.handleTransferTo.bind(this);
    this.handleTransferAmount = this.handleTransferAmount.bind(this);

    if (web3.isConnected()) {
      if (typeof(web3) != 'undefined') {
        console.log("Using web3 detected from external source like Metamask")
        this.web3 = new Web3(web3.currentProvider)
      }
      else {
        console.log("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask")
        this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
      }
    } else {
      console.log('Error: Not connected');
    }

    let Contract =    web3.eth.contract([{"constant":true,"inputs":[],"name":"shares","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address"},{"name":"amount","type":"uint256"}],"name":"transferShare","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"addr","type":"address"}],"name":"checkShareExist","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"fundsAllocation","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"shareholderInfo","outputs":[{"name":"share","type":"uint256"},{"name":"vote","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"agreement","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_seller","type":"address"},{"name":"_stock","type":"uint256"}],"name":"purchase","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[],"name":"allocationVote","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"shareholders","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"balance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"checkSharelodersInfo","outputs":[{"name":"","type":"uint256"},{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"buyer","type":"address"},{"indexed":true,"name":"seller","type":"address"},{"indexed":true,"name":"stock","type":"uint256"}],"name":"StockPurchase","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"shareholdera","type":"address"},{"indexed":true,"name":"shareholderb","type":"address"},{"indexed":true,"name":"share","type":"uint256"}],"name":"ShareTransfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"cbalance","type":"uint256"}],"name":"AllocateBalance","type":"event"}]);

    this.state.contractInstance = Contract.at('0xd0F964fb2f2648fa6bD646bc3564844B01C46acb');

    this.state.contractInstance.checkSharelodersInfo({
      from: this.web3.eth.accounts[0]
    }, (err, res) => {
      this.setState({share: res[0]['c'][0], vote: res[1].toString()})
    });

    this.state.contractInstance.agreement.call((err, res) => {
      this.setState({allocating_agreement_percent: res['c'][0]})
    })
  }

  handleTransferTo(e) {
    this.setState({transfer_to: e.target.value})
  }

  handleTransferAmount(e) {
    this.setState({transfer_amount: e.target.value})
  }

  transferTo(to, amount) {
    this.state.contractInstance.transferShare(to, parseInt(amount), {
      gasPrice: 300000,
      from: this.web3.eth.accounts[0],
      to: to
    }, (err, res) => {
      console.log(res)
    })
    this.setState({
      transfer_to: '',
      transfer_amount: ''
    })
  }

  voteForAllocate() {
    this.state.contractInstance.allocationVote({
      from: this.web3.eth.accounts[0]
    }, (err, res) => {
      console.log(res);
    });
  }

  voteButton() {
    if (this.state.vote === 'false') {
      return <button className="standart-btn" onClick={ () => this.voteForAllocate() }>Vote</button>
    } else {
      return <button className="standart-btn">Voted</button>
    }
  }

  render() {
    return (
      <div className="content">
        <h2>Shareholder</h2>
        <p>
          Shares: {this.state.share} <br />
          Voted: {this.state.vote} <br />
          Allocating agreement percent: {this.state.allocating_agreement_percent}%
        </p>
        <div className="grey-box">
          <h4>Transfer share</h4>
          <div className="form-control">
            <label for="transfer_to">To:</label>
            <input type="text" name="transfer_to" id="transfer_to" value={this.state.transfer_to} onChange={this.handleTransferTo} />
          </div>
          <div className="form-control">
            <label for="transfer_amount">Amount</label>
            <input type="number" name="transfer_amount" id="transfer_amount" value={this.state.transfer_amount} onChange={this.handleTransferAmount}/>
          </div>
          <br />
          <button className="standart-btn" onClick={ () => this.transferTo(this.state.transfer_to, this.state.transfer_amount) }>Transfer</button>
        </div>
        <br />
        <div className="grey-box">
          {this.voteButton()}
        </div>
      </div>
    )
  }
}

export default ShareholderContent;
