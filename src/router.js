import { Component } from 'preact';
import { Router, route } from 'preact-router';

import Header from './components/header';
import Footer from './components/footer';
import Home from './routes/home';
import Projects from './routes/projects';
import Project from './routes/project';
import Posts from './routes/posts';
import Post from './routes/post';
import Login from './routes/login';
import Page404 from './routes/404';

class Routes extends Component {
	handleRoute = e => {
		let token = localStorage.getItem('token');
		if (!token && e.url.indexOf('login') < 0) {
			route('/login/', false);
		}
	};

	render () {
		return (
			<div class="wrapper">
				<Header />
				<div class="wrapper__content">
					<Router onChange={this.handleRoute}>
						<Home path="/" />
						<Project path="/projects/:id/" />
						<Projects path="/projects/" />
						<Post path="/posts/:id/" />
						<Posts path="/posts/" />
						<Login path="/login/" />
						<Page404 default path="*" />
					</Router>
				</div>
				<Footer />
			</div>
		);
	}
}

export default Routes;
