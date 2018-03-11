import { Component } from 'preact';
import { BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';
// import Router from 'preact-router';

import Header from './components/header';
import Footer from './components/footer';
import Home from './routes/home';
import Projects from './routes/projects';
import Project from './routes/project';
import Posts from './routes/posts';
import Post from './routes/post';
import Login from './routes/login';
import AppRouter from './components/appRouter';

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
		// console.log(props)
		return (
			<Router>
				<div className={'wrapper'}>
					<Header />
					<AppRouter>
						<Switch>
							<Route exact path="/" component={Home} />
							<Route path="/projects/:id" component={Project} />
							<Route path="/projects/" component={Projects} />
							<Route path="/posts/:id" component={Post} />
							<Route path="/posts/" component={Posts} />
							<Route path="/login/" component={Login} />
						</Switch>
					</AppRouter>
					<Footer />
				</div>
			</Router>
		);
	}
}

export default Routes;
