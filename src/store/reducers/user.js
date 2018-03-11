import {
	SIGN_IN,
	SET_USER,
	UNSET_USER
} from './../actions/user';

let defaultState = {
	isFetching: false,
	didInvalidate: false,
	user: {
		token: false
	}
};

function user (state = defaultState, action) {
	switch (action.type) {
		case SET_USER:
			return Object.assign({}, state, {
				isFetching: false,
				didInvalidate: false,
				user: action.user
			});
		case UNSET_USER:
			return defaultState;
		case SIGN_IN:
			return Object.assign({}, state, {
				isFetching: true,
				didInvalidate: false,
				user: action.user
			});
		default:
			return state;
	}
}

export default user;
