import * as user from '../../api/user';
import store from '../../store';

export const SIGN_IN = 'SIGN_IN';
export const SET_USER = 'SET_USER';
export const UNSET_USER = 'UNSET_USER';

export function setUser (user = {}) {
	return {
		type: SET_USER,
		user
	};
}

function unsetUser (user = { token: false }) {
	return {
		type: UNSET_USER,
		user
	};
}

function signIn(response) {
	return {
		type: SIGN_IN,
		receivedAt: Date.now(),
		user: response
	};
}

function validateSignInResponse (response, dispatch) {
	return response.status === 200 && response.bodyJson.token;
}

export function calllLogOut(payload) {
	localStorage.setItem('token', false);
	return store.dispatch(unsetUser());
}

export function callSignIn(payload) {
	store.dispatch(setUser());
	return user.signIn(payload)
		.then(response => {
			if (validateSignInResponse(response)) {
				store.dispatch(signIn({ token: response.bodyJson.token }));
			}
			return response;
		});
}
