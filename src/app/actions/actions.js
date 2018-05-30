// let CONTRACT_PAGE = {
// 	type: 'contract_page'
// }
//
// let PRODUCT_PAGE = {
// 	type: 'product_page'
// }
//
// let INTRO_PAGE = {
// 	type: 'intro_page'
// }
//
// let SHAREHOLDER_PAGE = {
// 	type: 'shareholder_page'
// }
//
// let SHAREHOLDER_INFO = {
// 	type: 'shareholder_page'
// }
//
// let REGISTRATION_PAGE = {
// 	type: 'registration_page'
// }
//
// const actions = {
// 	CONTRACT_PAGE: CONTRACT_PAGE,
// 	PRODUCT_PAGE: PRODUCT_PAGE,
// 	INTRO_PAGE: INTRO_PAGE,
// 	SHAREHOLDER_PAGE: SHAREHOLDER_PAGE,
// 	REGISTRATION_PAGE: REGISTRATION_PAGE
// }
//
// export default actions;

// --- Registration actions --- //

export function registerError(error) {
	return { error, type: REG_FAILED }
}

export function registerSuccess(response) {
	return dispatch => {
		dispatch({ response, type: REG_SUCCESS});
		// router.transitionTo('/login')
	}
}

export function register(userData) {
	return dispatch => {
		fetch('http://localhost:8000/register', {
			method: post,
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: userData.email,
				password: userData.password
			})
		})
		.then(response => {
			if (response.status >= 200 && response.status < 300) {
				console.log(response);
				dispatch(registerSuccess);
			} else {
				const error = new Error(response.statusText);
				error.response = response;
				dispatch(registerError);
				throw error;
			}
		})
		.catch(error => { console.log('request failed', error); })
	}
}
