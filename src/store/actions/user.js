import * as user from '../../api/user';

export const SIGN_IN = 'SIGN_IN';
export const SET_USER = 'SET_USER';
export const UNSET_USER = 'UNSET_USER';

function setUser (user = {}) {
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
	if (response.status === 200 && response.bodyJson.token) {
		return dispatch(signIn({ token: response.bodyJson.token }));
	}
}

export function calllLogOut(payload) {
	return dispatch => {
		dispatch(unsetUser());
	};
}


export function callSignIn(payload) {
	return dispatch => {
		dispatch(setUser());
		return user.signIn(payload)
			.then(response => {
				validateSignInResponse(response, dispatch);
				return response
			});
	};
}
