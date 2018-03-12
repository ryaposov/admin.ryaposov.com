import {
	RECEIVE_PROJECTS
} from './../actions/projects';

let defaultState = {
	isFetching: false,
	didInvalidate: false,
	items: []
};

function projects(state = defaultState, action) {
	switch (action.type) {
		case RECEIVE_PROJECTS:
		console.log(action)
			return Object.assign({}, state, {
				isFetching: false,
				didInvalidate: false,
				items: action.projects,
				lastUpdated: action.receivedAt
			});
		default:
			return state;
	}
}

export default projects;
