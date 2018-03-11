import { h, Component } from 'preact';
import style from './style.scss';
import { Container, Image, Menu } from 'semantic-ui-react';
import MenuLink from '../header/link';
import { Link } from 'react-router-dom';
import menuLinks from '../header/menuLinks';

class Header extends Component {
	state = {
		links: menuLinks
	}

	render ({ history }, { links }) {
		return (
			<Menu className={style.footer}>
				<Container>
					<Menu.Item as={Link}  className={style.footer__logo} header to="/">
						<Image
							size="mini"
							src="/assets/img/logo-black.svg"
						/>
					</Menu.Item>
					{links.map((link, i) => <MenuLink key={'footer-' + i} link={link} />)}
					<Menu.Item position="right" className={style.footer__search}>
						<span>Pavel Ryaposov. {new Date().getFullYear()}</span>
					</Menu.Item>
				</Container>
			</Menu>
		);
	}
}

export default Header;
