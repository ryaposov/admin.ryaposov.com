import { h, Component } from 'preact';
import style from './style.scss';
import { connect } from 'preact-redux';
import { Container, Image, Menu, Input } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import MenuLink from './link';
import menuLinks from './menuLinks';
import { calllLogOut } from '../../store/actions/user';

class Header extends Component {
	state = {
		links: menuLinks
	}

	logOut = async () => {
		await this.props.dispatch(calllLogOut());
		console.log(this.props)
		this.props.history.replace('/login/');
	}

	render ({ history }, { links }) {
		return (
			<Menu fixed="top" inverted className={style.header}>
				<Container>
					<Menu.Item as={Link} to="/" className={style.header__logo} header>
						<Image
							size="mini"
							src="/assets/img/logo-white.svg"
						/>
					</Menu.Item>
					{links.map((link, i) => <MenuLink key={'header-' + i} link={link} />)}
					<Menu.Item position="right" className={style.header__search}>
						<Input
							inverted
							className={style.header__input}
							icon="search"
							placeholder="Search..."
						/>
					</Menu.Item>
					<Menu.Item as="a" onClick={this.logOut}>Logout</Menu.Item>
				</Container>
			</Menu>
		);
	}
}


const mapStateToProps = (state) => ({ user: state.user });

export default withRouter(connect(mapStateToProps)(Header));
