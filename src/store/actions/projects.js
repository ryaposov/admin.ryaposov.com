import * as projects from '../../api/crud';
import store from '../../store';

export const RECEIVE_PROJECTS = 'RECEIVE_PROJECTS';

function receiveProjects(response) {
	return {
		type: RECEIVE_PROJECTS,
		receivedAt: Date.now(),
		projects: response
	};
}

export function fetchProjects(category = false) {
	return projects.getAll('projects')
		.then(response => store.dispatch(receiveProjects(response.bodyJson)));
}

export function deleteProject (id) {
	return projects.deleteOne('projects', id)
		.then(response => response);
}

export function createProject (payload) {
	return projects.create('projects', payload)
		.then(response => response);
}
