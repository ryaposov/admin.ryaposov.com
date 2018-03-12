import { Component } from 'preact';
import { Provider } from 'preact-redux';
import store from './store';
import Router from './router.js';
if (module.hot) require('preact/debug');

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
