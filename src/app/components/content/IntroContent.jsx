import React, { Component } from 'react';
import './../../../public/css/main.css';

class IntroContent extends Component {

  render() {
    return (
      <div className="content">
        <h2>Digital Content Marketplace</h2>
        <br />
        <p>
        Digital content market place will connect createros of digital content arround the world, where every single user
        will be able to upload products, set prices and manage his sells. Marketplace will work with cryptocurrencies to achieve
        transparency, fast transactions and freedom for everyone to sell by his own rules.
        </p>
        <p>
        Ownership of the platform will be distributed between few shareholders using Ethereum based smart contract. Every sale on
        marketplace will go through contract, where income value will be distributed between contract and seller.
        Shareholders will be able to trace balance of the contract, watch every other shareholders shares,
        transfer their shares to another shareholders and vote when to allocate collected funds. Allocating funds will be possible
        after > 50 votes have been collected.
        </p>
      </div>
    )
  }
}

export default IntroContent;
