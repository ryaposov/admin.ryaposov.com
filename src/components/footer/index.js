import { h, Component } from 'preact';
import style from './style.scss';
import { Container, Image, Menu } from 'semantic-ui-react';
import { connect } from 'preact-redux';
import MenuLink from '../header/link';
import { Link } from 'react-router-dom';
import menuLinks from '../header/menuLinks';

class Footer extends Component {
	state = {
		links: menuLinks
	}

	render ({ history, user }, { links }) {
		return (
			<Menu className={style.footer}>
				<Container>
					<Menu.Item as={Link}  className={style.footer__logo} header to="/">
						<Image
							size="mini"
							src="/assets/img/logo-black.svg"
						/>
					</Menu.Item>
					{ user.user.token &&
						links.map((link, i) => <MenuLink key={'footer-' + i} link={link} />)
					}
					{ user.user.token &&
						<Menu.Item position="right" className={style.footer__search}>
							<span>Pavel Ryaposov. {new Date().getFullYear()}</span>
						</Menu.Item>
					}
				</Container>
			</Menu>
		);
	}
}


const mapStateToProps = (state) => ({ user: state.user });

export default connect(mapStateToProps)(Footer);
