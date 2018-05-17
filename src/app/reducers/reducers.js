import { combineReducers } from "redux";
// import IntroContent from '../components/content/IntroContent.jsx';

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
		default:
			page = 'Intro';
			break;
	}
	return page;
}

const reducers = combineReducers({
	page: changePage
})

export default reducers;
