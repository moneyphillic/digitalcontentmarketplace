import React, { Component } from 'react';
import './../../../public/css/main.css';
import Web3 from 'web3';

class ProductContent extends Component {

  constructor(props){
    super(props);
    this.state = {
      price: 0.01,
      seller: '0x7879b5Ea19ae83ee62C9dFA0978198499151a29c',
      stock: 10000000
    }

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

    let Contract =    web3.eth.contract([{"constant":true,"inputs":[],"name":"shares","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address"},{"name":"amount","type":"uint256"}],"name":"transferShare","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"addr","type":"address"}],"name":"checkShareExist","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"fundsAllocation","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"shareholderInfo","outputs":[{"name":"share","type":"uint256"},{"name":"vote","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"agreement","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_seller","type":"address"},{"name":"_stock","type":"uint256"}],"name":"purchase","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[],"name":"allocationVote","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"shareholders","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"balance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"buyer","type":"address"},{"indexed":true,"name":"seller","type":"address"},{"indexed":true,"name":"stock","type":"uint256"}],"name":"StockPurchase","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"shareholdera","type":"address"},{"indexed":true,"name":"shareholderb","type":"address"},{"indexed":true,"name":"share","type":"uint256"}],"name":"ShareTransfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"cbalance","type":"uint256"}],"name":"AllocateBalance","type":"event"}]);

    this.state.contractInstance = Contract.at('0x14EFb4030bd40ec4bBfEa63537d609dEfC05E085');
  }


  buy(seller, stock) {
    this.state.contractInstance.purchase(seller, stock, {
      gasPrice: 300000,
      from: this.web3.eth.accounts[0],
      value: web3.toWei(0.1, 'ether')
    }, (err, result) => {
      if (err) {
        console.log('Error: ' + err)
      }
      console.log(result)
    })
  }

  render() {
    return (
      <div className="content">
        <h2>Product page</h2>
        <div className="product-preview">
          <div className="grey-box">
            <img src="../../public/images/artwork2.jpg" />
          </div>
        </div>
        <p>
        Creator: User <br />
        Price: 0.1 ETH <br />
        </p>
        <p>
        <button className="standart-btn orange-btn" onClick={ () => this.buy(this.state.seller, this.state.stock) }>BUY</button>
        </p>
      </div>
    )
  }
}

export default ProductContent;
