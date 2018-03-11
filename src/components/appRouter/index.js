import { Component } from 'preact';
import { withRouter } from 'react-router-dom';
import { connect } from 'preact-redux';

class AppRouter extends Component {
	routeChange = (location) => {
		if (!this.props.user.user.token && location.pathname.indexOf('login') < 0) {
			this.props.history.replace('/login/');
		}
	}

	componentWillMount() {
		this.unlisten = this.props.history.listen(this.routeChange);
		this.routeChange(this.props.location);
	}

	componentWillUnmount () {
		this.unlisten();
	}

	render() {
		return (
			<div class="wrapper__content">{this.props.children}</div>
		);
	}
}

const mapStateToProps = (state) => ({ user: state.user });

export default withRouter(connect(mapStateToProps)(AppRouter));
