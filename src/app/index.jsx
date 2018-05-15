import React from 'react';
import ReactDOM from 'react-dom';
import Web3 from 'web3';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';

import './../public/css/main.css';

import App from './components/app.jsx';

import actions from './actions/actions.js';
import reducers from './reducers/reducers.js';

const store = createStore(reducers);

ReactDOM.render(
	<Provider store={store}>
		<App/>
	</Provider>,
	document.getElementById('app')
)
