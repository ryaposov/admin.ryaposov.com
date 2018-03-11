import { Component } from 'preact';
import { connect } from 'preact-redux';
import {
	List,
	Grid,
	Button,
	Icon,
	Label
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import {
	deletePost,
	fetchPosts
} from '../../store/actions/posts';

class Posts extends Component {
	delete = async () => {
		await deletePost(this.props.post._id);
		await this.props.dispatch(fetchPosts());
	}

	render ({ post }) {
		return (
			<List.Item>
				<List.Content>
					<Grid columns="equal" verticalAlign="middle">
						<Grid.Row>
							<Grid.Column>
								<List.Header as="span">
									<Link to={`/posts/${post._id}`}>{post.title}</Link>
								</List.Header>
								{post.text && <List.Description as="span">{post.text.substring(0, 30)}...</List.Description>}
							</Grid.Column>
							<Grid.Column computer={3} textAlign="left">
								{post.tags.map((tag, i) => (
									<Label as="span" key={post._id + 'tag' + i} content={tag} />
								))}
							</Grid.Column>
							<Grid.Column computer={3} textAlign="right">
								<Button as={Link} to={`/posts/${post._id}`} basic size="small">Edit</Button>
								<Button basic icon color="red" style={{ marginLeft: '10px' }} size="small" onClick={this.delete}>
									<Icon name="trash" />
								</Button>
								<Icon name="bars" color="grey" style={{ marginLeft: '10px' }} />
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</List.Content>
			</List.Item>
		);
	}
}

const mapStateToProps = (state) => ({ user: state.user });

export default connect(mapStateToProps)(Posts);
