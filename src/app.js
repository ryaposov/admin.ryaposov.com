import { Component } from 'preact';
import { Provider } from 'preact-redux';
import store from './store';
import Router from './router.js';
import { setUser } from './store/actions/user';
if (module.hot) require('preact/debug');

store.dispatch(setUser({ token: localStorage.getItem('token') || false }));

export class App extends Component {
	render () {
		return (
			<div class="app">
				<Provider store={store}>
					<Router />
				</Provider>
			</div>
		);
	}
}

export default App;
