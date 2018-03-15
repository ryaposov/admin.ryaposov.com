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
	Message,
	Label
} from 'semantic-ui-react';
import { route } from 'preact-router';
import { config } from '../../api';
import * as files from '../../api/file';
import FileInput from 'react-fine-uploader/file-input';
import UploadedImage from '../../components/uploadedImage';
import FineUploaderTraditional from 'fine-uploader-wrappers';
import { deletePost } from '../../store/actions/posts';

class Post extends Component { // eslint-disable-line react-prefer-stateless-function

	state = {
		links: [],
		loading: false,
		submitLoading: false,
		confirmOpen: false,
		textLength: 0,
		message: {
			state: false,
			header: ''
		},
		post: {}
	}

	sections = [
		{
			key: 'Dashboard',
			content: 'Dashboard',
			href: '/'
		},
		{
			key: 'Posts',
			content: 'Posts',
			href: '/posts/'
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
		('_id' in this.state.post && this.state.post._id === this.props.id)

	updateForm = (e, data) => {
		if (!data) data = e.target;

		let name = data.name;
		let value = data.value;

		if (name === 'text') {
			this.setState({ textLength: value.length });
		}

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

	uploader = () => (
		new FineUploaderTraditional({
			options: {
				debug: false,
				expected: true,
				request: {
					customHeaders: {
						authorization: localStorage.getItem('token')
					},
					endpoint: `${config().base}/secure/posts/${this.props.id}/upload`
				},
				callbacks: {
					onAllComplete: this.getFiles
				}
			}
		})
	)

	init = async () => {
		this.setState({ loading: true });
		posts.getOne('posts', this.props.id)
			.then(response => {
				this.setState({
					post: response.bodyJson,
					tags: response.bodyJson.tags.map(tag => (
						{ text: tag, value: tag }
					), [])
				});
			});
		await this.getFiles();
		this.setState({ loading: false });
	}

	getFiles = async () => {
		let response = await files.getAll(this.props.id);
		if (response) this.setState({ files: response.bodyJson });
	}

	submit = () => {
		this.setState({ submitLoading: true });
		let payload = { ...this.state.post };
		delete payload._id;
		posts.editOne('posts', this.props.id, payload)
			.then(response => {
				this.setState({ submitLoading: false, message: { state: true, header: 'Successfully saved.' } });
				setTimeout(() => this.setState({ message: { state: false, header: '' } }), 5000);
			});
	}

	delete = async () => {
		await deletePost(this.state.post._id);
		this.hideConfirm();
		route('/posts/', false);
	}

	showConfirm = () => this.setState({ confirmOpen: true })
	hideConfirm = () => this.setState({ confirmOpen: false })

	async componentDidMount () {
		this.init();
	}

	render (
		{
			id
		},
		{
			post,
			tags,
			loading,
			submitLoading,
			confirmOpen,
			message,
			textLength,
			files
		}
	) {
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
									<Form.TextArea placeholder="Post introtext..." value={post.introtext} name="introtext" onInput={this.updateForm} rows={8} />
									<Form.TextArea placeholder="Intro text..." name="text" onInput={this.updateForm} value={post.text} rows={35} />
									<Label>{textLength}</Label>
									<Grid padded={false} verticalAlign="middle" style={{ marginTop: '20px' }}>
										<Grid.Column computer={8}>
											<Header as="h3">Images</Header>
										</Grid.Column>
										<Grid.Column computer={8} textAlign="right">
											<FileInput multiple accept="image/*" uploader={this.uploader()}>
												<Button>Choose Files</Button>
											</FileInput>
										</Grid.Column>
										{
											!files.length ? (
												<Header as="h4">No images yet</Header>
											) : (
												files.map(file => (
													<Grid.Column key={file} computer={4}>
														<UploadedImage file={file} baseUrl={config().base} id={id} removeHandler={this.getFiles} />
													</Grid.Column>
												))
											)
										}
									</Grid>
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
