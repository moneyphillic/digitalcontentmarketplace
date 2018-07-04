import React from 'react';
import ReactDOM from 'react-dom';
import Web3 from 'web3';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import $ from 'jquery';
// import { composeWithDevTools } from 'redux-devtools-extension';
// import thunk from 'redux-thunk';

import './../public/css/main.css';
import './../public/js/custom.js';

import App from './components/app.jsx';

import actions from './actions/actions.js';
import reducers from './reducers/reducers.js';

// const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));
const store = createStore(reducers);

ReactDOM.render(
	<Provider store={store}>
		<App/>
	</Provider>,
	document.getElementById('app')
)
