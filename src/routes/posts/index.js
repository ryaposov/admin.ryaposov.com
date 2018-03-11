import { Component } from 'preact';
import { connect } from 'preact-redux';
import {
	Container,
	List,
	Breadcrumb,
	Divider,
	Header,
	Grid,
	Button,
	Pagination
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { fetchPostsIfNeeded, createPost, fetchPosts } from '../../store/actions/posts';
import Post from '../../components/postItem';

class Posts extends Component {
	sections = [
		{
			key: 'Dashboard',
			content: (<Link to="/">Dashboard</Link>)
		},
		{
			key: 'Posts',
			content: 'Posts',
			active: true
		}
	];

	state = {
		createLoading: false
	}

	createPost = async () => {
		this.setState({ createLoading: true });
		let response = await createPost({ title: 'New Post' });
		await this.props.dispatch(fetchPosts());
		if (response.bodyJson && '_id' in response.bodyJson) {
			this.setState({ createLoading: false });
			this.props.history.push(`/posts/${response.bodyJson._id}/`);
		}
	}

	async componentDidMount () {
		const { dispatch } = this.props;
		await dispatch(fetchPostsIfNeeded());
	}

	render({ posts }, { createLoading }) {
		return (
			<Container>
				<Grid columns="equal" verticalAlign="middle">
			    <Grid.Row>
			      <Grid.Column>
							<Header as="span" size="huge">Posts</Header>
							<Button basic size="small" compact loading={createLoading} disabled={createLoading} style={{ marginLeft: '20px', verticalAlign: '5px' }} onClick={this.createPost}>New</Button>
						</Grid.Column>
						<Grid.Column computer={6} textAlign="right">
							<Breadcrumb sections={this.sections} />
						</Grid.Column>
			    </Grid.Row>
			  </Grid>
				<Divider />
				<List divided relaxed="very">
					{ posts.items && posts.items.map(post => (
						<Post key={post._id} post={post} />
					)) }
					<Divider />
					<Grid columns="equal" verticalAlign="middle">
						<Grid.Row>
							<Grid.Column />
							<Grid.Column computer={6} textAlign="right">
								<Pagination
									defaultActivePage={1}
									firstItem={null}
									lastItem={null}
									pointing
									secondary
									size="mini"
									totalPages={3}
								/>
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</List>
			</Container>
		);
	}
}


const mapStateToProps = (state) => ({ posts: state.posts });

export default connect(mapStateToProps)(Posts);
