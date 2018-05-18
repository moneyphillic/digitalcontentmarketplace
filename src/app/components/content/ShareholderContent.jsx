import React, { Component } from 'react';
import './../../../public/css/main.css';

class ShareholderContent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      share: '',
      vote: ''
    };
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
  }

  componentDidMount() {
    this.state.contractInstance.checkSharelodersInfo({
      from: '0x7879b5Ea19ae83ee62C9dFA0978198499151a29c'
    }, (err, res) => {
      console.log(res[0]['c'][0]);
      console.log(res[1]);
    })
  }

  render() {
    return (
      <div className="content">
        <h2>Shareholder</h2>
        <p>
          Shares:
        </p>
        <p>
          Voted:
        </p>
      </div>
    )
  }
}

export default ShareholderContent;
