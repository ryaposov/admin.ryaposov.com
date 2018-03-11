import {
	RECEIVE_PROJECT
} from './../actions/project';

let defaultState = {
	isFetching: false,
	didInvalidate: false,
	project: {
		notLoaded: true
	}
};

function project (state = defaultState, action) {
	switch (action.type) {
		case RECEIVE_PROJECT:
			return Object.assign({}, state, {
				isFetching: false,
				didInvalidate: false,
				project: action.project,
				lastUpdated: action.receivedAt
			});
		default:
			return state;
	}
}

export default project;
