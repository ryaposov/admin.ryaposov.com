import { Component } from 'preact';
// import { BrowserRouter as Router,
// 	Route,
// 	Switch
// } from 'react-router-dom';
import Router from 'preact-router';

import Header from './components/header';
import Home from './routes/home';
import Projects from './routes/projects';
import Project from './routes/project';
import Posts from './routes/posts';
import Post from './routes/post';

class Routes extends Component {
	state = {
		sidebarOpened: false
	};

	toggleSidebar = () => {
		this.setState((prevState, props) => ({
			sidebarOpened: !prevState.sidebarOpened
		}));
	};

	render(props, { sidebarOpened }) {
		return (
			<div className={'wrapper'}>
				<Header />
				<div className={'wrapper__content'}>
					<Router>
						<Home path="/" />
						<Project path="/projects/:id" />
						<Projects path="/projects/" />
						<Post path="/posts/:id" />
						<Posts path="/posts/" />
					</Router>
				</div>
			</div>
		);
	}
}

export default Routes;
