import { Component } from 'preact';
import * as posts from '../../api/crud';
import {
	Container,
	Breadcrumb,
	Divider,
	Header,
	Grid,
	Button,
	Form,
	Loader,
	Confirm,
	Message
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { deletePost } from '../../store/actions/posts';

const options = [
	{ key: 'development', text: 'Development', value: 'Development' },
	{ key: 'design', text: 'Design', value: 'Design' }
];

class Post extends Component { // eslint-disable-line react-prefer-stateless-function

	state = {
		options,
		links: [],
		loading: false,
		submitLoading: false,
		confirmOpen: false,
		message: {
			state: false,
			header: ''
		},
		post: {}
	}

	sections = [
		{
			key: 'Dashboard',
			content: (<Link to={'/'}>Dashboard</Link>)
		},
		{
			key: 'Posts',
			content: (<Link to={'/posts/'}>Posts</Link>)
		},
		{
			key: 'Post',
			content: 'Post',
			link: false,
			active: true
		}
	];

	addTag = (e, { value }) => {
		this.setState({
			tags: [{ text: value, value }, ...this.state.tags]
		});
	}

	contentLoaded = () => !this.state.loading &&
		('_id' in this.state.post && this.state.post._id === this.props.match.params.id)

	updateForm = (e, data) => {
		if (!data) data = e.target;

		let name = data.name;
		let value = data.value;

		if (name && (value !== undefined || data.type === 'checkbox' )) {
			if (name.indexOf('colors') > -1) {
				let colorField = data.name.split('.')[1];
				name = 'colors';
				value = Object.assign(this.state.post.colors, {
					[colorField]: value
				});
			}

			this.setState({ post: Object.assign(this.state.post, {
				[name]: data.type === 'checkbox' ? data.checked : value })
			});
		}
	}

	init = async () => {
		this.setState({ loading: true });
		posts.getOne('posts', this.props.match.params.id)
			.then(response => {
				this.setState({ post: response.bodyJson });
				this.setState({
					tags: response.bodyJson.tags.map(tag => (
						{ text: tag, value: tag }
					), [])
				});
			});
		this.setState({ loading: false });
	}

	submit = () => {
		this.setState({ submitLoading: true });
		let payload = { ...this.state.post };
		delete payload._id;
		posts.editOne('posts', this.props.match.params.id, payload)
			.then(response => {
				this.setState({ submitLoading: false, message: { state: true, header: 'Successfully saved.' } });
				setTimeout(() => this.setState({ message: { state: false, header: '' } }), 5000);
			});
	}

	delete = async () => {
		await deletePost(this.state.post._id);
		this.hideConfirm();
		this.props.history.push('/posts/');
	}

	showConfirm = () => this.setState({ confirmOpen: true })
	hideConfirm = () => this.setState({ confirmOpen: false })

	async componentDidMount () {
		this.init();
	}

	render (props, { post, options, tags, loading, submitLoading, confirmOpen, message }) {
		return (
			<Container>
				<Grid columns="equal" verticalAlign="middle">
			    <Grid.Row>
			      <Grid.Column>
							<Header as="span" size="huge">Post</Header>
							<Button
								size="small"
								compact
								color="green"
								loading={submitLoading}
								disabled={submitLoading}
								onClick={this.submit}
								style={{ marginLeft: '20px', verticalAlign: '5px' }}
							>
								Save
							</Button>
						</Grid.Column>
						<Grid.Column computer={6} textAlign="right">
							<Breadcrumb sections={this.sections} />
						</Grid.Column>
			    </Grid.Row>
			  </Grid>
				<Divider />
				<Form style={{ minHeight: '500px' }}>
					{ message.state &&
						<Message
							icon="checkmark"
							size="small"
							color="green"
							header={message.header}
						/>
					}
					<Loader active={!this.contentLoaded()} />
					{ this.contentLoaded() &&
						<Grid columns="equal">
					    <Grid.Row>
					      <Grid.Column computer={4}>
									<Form.Select multiple selection allowAdditions search value={post.tags} options={tags}
										name="tags" onChange={this.updateForm} onAddItem={this.addTag} label="Tags" placeholder="Tags"
									/>
									<Form.TextArea label="Subtitle" placeholder="Post subtitle..." value={post.subtitle} name="subtitle" onInput={this.updateForm} rows={8} />
									<Grid columns="equal" verticalAlign="middle">
										<Grid.Row>
											<Grid.Column computer={8}>
												<Form.Checkbox label="Published" onChange={this.updateForm} name="published" checked={post.published} />
											</Grid.Column>
											<Grid.Column computer={8} textAlign="right">
												<Button color="red" basic compact size="mini" onClick={this.showConfirm}>Delete</Button>
											</Grid.Column>
										</Grid.Row>
									</Grid>
								</Grid.Column>
								<Grid.Column>
									<Form.Input size="big" placeholder="Title" name="title" onInput={this.updateForm} value={post.title} />
									<Form.TextArea placeholder="Intro text..." name="text" onInput={this.updateForm} value={post.text} rows={35} />
								</Grid.Column>
					    </Grid.Row>
					  </Grid>
					}
				</Form>
				<Confirm
					size="tiny"
					open={confirmOpen}
					onCancel={this.hideConfirm}
					onConfirm={this.delete}
				/>
			</Container>
		);
	}
}

export default Post;
