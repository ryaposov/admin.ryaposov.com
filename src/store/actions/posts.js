import * as posts from '../../api/crud';
import store from '../../store';

export const RECEIVE_POSTS = 'RECEIVE_POSTS';

function receivePosts(response) {
	return {
		type: RECEIVE_POSTS,
		receivedAt: Date.now(),
		posts: response
	};
}

export function fetchPosts(category = false) {
	return posts.getAll('posts')
		.then(response => store.dispatch(receivePosts(response.bodyJson)));
}

export function deletePost (id) {
	return posts.deleteOne('posts', id)
		.then(response => response);
}

export function createPost (payload) {
	return posts.create('posts', payload)
		.then(response => response);
}
