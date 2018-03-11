import { Component } from 'preact';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class MenuLink extends Component {
	render ({ link }) {
		return (
			<Menu.Item as={Link} to={link.link}>{link.title}</Menu.Item>
		);
	}
}

export default MenuLink;
