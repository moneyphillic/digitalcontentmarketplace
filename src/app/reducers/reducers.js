import { combineReducers } from "redux";
// import IntroContent from '../components/content/IntroContent.jsx';

const initialUserStatus = {
	loggedIn: false,
	email: '',
	role: ''
}

const changeLogStatus = (userStatus = initialUserStatus, action) => {
	switch(action.type) {
		case true:
			userStatus = {loggedIn: true, email: '', role: ''};
			break;
		case false:
			userStatus = {loggedIn: false, email: '', role: ''};
			break;
	}
	return userStatus;
}

const changePage = (page = 'Intro', action) => {
	switch(action.type) {
		case 'contract_page':
			page = 'Contract';
			break;
		case 'product_page':
			page = 'Product page';
			break;
		case 'intro_page':
			page = 'Intro';
			break;
		case 'shareholder_page':
			page = 'Shareholder';
			break;
		case 'registration_page':
			page = 'Registration';
			break;
		case 'login_page':
			page = 'Login';
			break;
		case 'user_page':
			page = 'User';
			break;
		case 'products_page':
			page = 'Products';
			break;
	}
	return page;
}

const reducers = combineReducers({
	page: changePage,
	userStatus: changeLogStatus
})

export default reducers;
