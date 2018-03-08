import { h, Component } from 'preact';
import style from './style.scss';
import { Container, Image, Menu, Input } from 'semantic-ui-react';
import MenuLink from './link.js';

class Header extends Component {
	state = {
		links: [
			{
				title: 'Dashboard',
				link: '/'
			},
			{
				title: 'Projects',
				link: '/projects/'
			},
			{
				title: 'Posts',
				link: '/posts/'
			}
		]
	}

	goHome = (link) => this.props.history.push('/');

	render ({ history }, { links }) {
		return (
			<Menu fixed="top" inverted className={style.header}>
				<Container>
					<Menu.Item as="a" className={style.header__logo} header href="/">
						<Image
							size="mini"
							src="/assets/icons/apple-touch-icon.png"
						/>
					</Menu.Item>
					{links.map(link => <MenuLink link={link} />)}
					<Menu.Item position="right" className={style.header__search}>
						<Input
							inverted
							className={style.header__input}
							icon="search"
							placeholder="Search..."
						/>
					</Menu.Item>
				</Container>
			</Menu>
		);
	}
}

export default Header;
