import { Component } from 'preact';
import { Menu } from 'semantic-ui-react';

class MenuLink extends Component {
	render ({ link }) {
		return (
			<Menu.Item as="a" href={link.link}>{link.title}</Menu.Item>
		);
	}
}

export default MenuLink;
