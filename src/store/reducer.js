import { combineReducers } from 'redux';
import projects from './reducers/projects';
import posts from './reducers/posts';
import user from './reducers/user';

export default combineReducers({
	projects,
	posts,
	user
});
