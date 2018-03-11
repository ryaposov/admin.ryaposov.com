import { h, Component } from 'preact';
import { debounce } from 'lodash';
import style from './style.scss';
import { connect } from 'preact-redux';
import { Container, Image, Menu, Search } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';
import MenuLink from './link';
import menuLinks from './menuLinks';
import { calllLogOut } from '../../store/actions/user';
import * as crud from '../../api/crud';

class Header extends Component {
	state = {
		links: menuLinks,
		isLoading: false,
		searchString: '',
		searchResults: []
	}

  resetSearch = () => this.setState({ isLoading: false, searchResults: [], searchString: '' })

  handleResultSelect = (e, { result }) => {
		this.props.history.push(`/${result.collection}/${result._id}/`)
	}

	handleSearchChange = (e, { value }) => {
		this.setState({ isLoading: true, searchString: value });
		this.search();
	}

	search = debounce(async () => {
		if (this.state.searchString.length < 1) return this.resetSearch();
		let response = await crud.search(false, this.state.searchString);
		if (response.bodyJson && Object.keys(response.bodyJson).length) {
			Object.keys(response.bodyJson).forEach(model => {
				response.bodyJson[model].map(item => item.collection = model);
			}, )
			let results = Object.keys(response.bodyJson).reduce((a, b) => {
				return a.concat(response.bodyJson[b]);
			}, [])
			this.setState({ searchResults: results });
		}
		this.setState({ isLoading: false });
	}, 1000)

	logOut = async () => {
		await this.props.dispatch(calllLogOut());
		this.props.history.replace('/login/');
	}

	componentWillMount() {
		this.resetSearch();
	}

	render ({ history, user }, { links, isLoading, searchString, searchResults }) {
		return (
			<Menu fixed="top" inverted className={style.header}>
				<Container>
					<Menu.Item as={Link} to="/" className={style.header__logo} header>
						<Image
							size="mini"
							src="/assets/img/logo-white.svg"
						/>
					</Menu.Item>
					{ user.user.token &&
						links.map((link, i) => <MenuLink key={'header-' + i} link={link} />)
					}
					{ user.user.token &&
						<Menu.Item position="right" className={style.header__search}>
							<Search
								inverted
								className={style.header__input}
								loading={isLoading}
								onResultSelect={this.handleResultSelect}
								onSearchChange={this.handleSearchChange}
								results={searchResults}
								value={searchString}
								placeholder="Search..."
								{...this.props}
							/>
						</Menu.Item>
					}
					{ user.user.token &&
						<Menu.Item as="a" onClick={this.logOut}>Logout</Menu.Item>
					}
				</Container>
			</Menu>
		);
	}
}


const mapStateToProps = (state) => ({ user: state.user });

export default withRouter(connect(mapStateToProps)(Header));
