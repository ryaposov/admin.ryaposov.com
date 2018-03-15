import { Component } from 'preact';
import { route } from 'preact-router';
import * as projects from '../../api/crud';
import * as files from '../../api/file';
import { config } from '../../api';
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
import { deleteProject } from '../../store/actions/projects';
import FileInput from 'react-fine-uploader/file-input';
import UploadedImage from '../../components/uploadedImage';
import FineUploaderTraditional from 'fine-uploader-wrappers';

const options = [
	{ key: 'development', text: 'Development', value: 'Development' },
	{ key: 'design', text: 'Design', value: 'Design' }
];

class Project extends Component { // eslint-disable-line react-prefer-stateless-function

	state = {
		options,
		links: [],
		loading: false,
		submitLoading: false,
		confirmOpen: false,
		textLength: 0,
		project: {},
		files: [],
		message: {
			state: false,
			header: ''
		}
	}

	sections = [
		{
			key: 'Dashboard',
			content: 'Dashboard',
			href: '/'
		},
		{
			key: 'Projects',
			content: 'Projects',
			href: '/projects/'
		},
		{
			key: 'Project',
			content: 'Project',
			link: false,
			active: true
		}
	];

	sizes = [
		{
			value: '',
			text: 'No value'
		},
		{
			value: '1-5',
			text: '1-5'
		},
		{
			value: '2-5',
			text: '2-5'
		},
		{
			value: '3-5',
			text: '3-5'
		},
		{
			value: '5-5',
			text: '5-5'
		}
	]

	addLink = (e, { value }) => {
		this.setState({
			links: [{ text: value, value }, ...this.state.links]
		});
	}

	contentLoaded = () => !this.state.loading &&
		('_id' in this.state.project && this.state.project._id === this.props.id)

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
				value = Object.assign(this.state.project.colors, {
					[colorField]: value
				});
			}

			this.setState({ project: Object.assign(this.state.project, {
				[name]: data.type === 'checkbox' ? data.checked : value })
			});
		}
	}

	init = async () => {
		this.setState({ loading: true });

		// Get project
		let response = await projects.getOne('projects', this.props.id);
		if (response) {
			this.setState({
				project: response.bodyJson,
				textLength: response.bodyJson.text.length,
				links: response.bodyJson.links.map(link => ({ text: link, value: link }), [])
			});
		}
		await this.getFiles();
		this.setState({ loading: false });
	}

	getFiles = async () => {
		let response = await files.getAll(this.props.id);
		if (response) this.setState({ files: response.bodyJson });
	}

	submit = () => {
		this.setState({ submitLoading: true });
		let payload = { ...this.state.project };
		delete payload._id;
		projects.editOne('projects', this.props.id, payload)
			.then(response => {
				this.setState({ submitLoading: false, message: { state: true, header: 'Successfully saved.' } });
				setTimeout(() => this.setState({ message: { state: false, header: '' } }), 5000);
			});
	}

	delete = async () => {
		await deleteProject(this.state.project._id);
		this.hideConfirm();
		route('/projects/', false);
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
					endpoint: `${config().base}/secure/projects/${this.props.id}/upload`
				},
				callbacks: {
					onAllComplete: this.getFiles
				}
			}
		})
	)

	showConfirm = () => this.setState({ confirmOpen: true })
	hideConfirm = () => this.setState({ confirmOpen: false })

	async componentDidMount () {
		this.init();
	}

	render (
		{ id },
		{
			project,
			options,
			links,
			loading,
			submitLoading,
			confirmOpen,
			message,
			files,
			textLength
		}
	) {
		return (
			<Container>
				<Grid columns="equal" verticalAlign="middle">
			    <Grid.Row>
			      <Grid.Column>
							<Header as="span" size="huge">Project</Header>
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
									<Form.Input label="Client" value={project.client} placeholder="Client" name="client" onInput={this.updateForm} />
									<Form.Input label="Date" value={project.date} placeholder="2016-03-12" name="date" onInput={this.updateForm} />
									<Form.Select multiple selection options={options} value={project.category} label="Category" name="category"
										onChange={this.updateForm} placeholder="Type"
									/>
									<Form.Select multiple selection allowAdditions search value={project.links} options={links}
										name="links" onChange={this.updateForm} onAddItem={this.addLink} label="Links" placeholder="Links"
									/>
									<Form.Select selection value={project.size} options={this.sizes}
										name="size" onChange={this.updateForm} label="Size" placeholder="Size"
									/>
									<Form.Input label="Image" value={project.image} placeholder="image.jpg" name="image" onInput={this.updateForm} />
									<Form.Input label="Thumbnail" value={project.thumbnail} placeholder="image.jpg" name="thumbnail" onInput={this.updateForm} />
									<Form.Input label="Main color" value={project.colors.main} placeholder="#000000" name="colors.main" onInput={this.updateForm} />
									<Form.Input label="Second color" value={project.colors.second} placeholder="#000000" name="colors.second" onInput={this.updateForm} />
									<Form.TextArea label="Goal" placeholder="Project goal..." value={project.goal} name="goal" onInput={this.updateForm} rows={8} />
									<Grid columns="equal" verticalAlign="middle">
										<Grid.Row>
											<Grid.Column computer={8}>
												<Form.Checkbox label="Published" onChange={this.updateForm} name="published" checked={project.published} />
											</Grid.Column>
											<Grid.Column computer={8} textAlign="right">
												<Button color="red" basic compact size="mini" onClick={this.showConfirm}>Delete</Button>
											</Grid.Column>
										</Grid.Row>
									</Grid>
								</Grid.Column>
								<Grid.Column>
									<Form.Input size="big" placeholder="Title" name="title" onInput={this.updateForm} value={project.title} />
									<Form.TextArea placeholder="Intro text..." name="text" onInput={this.updateForm} value={project.text} rows={20} />
									<Label>{textLength} - avegare 270</Label>
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

export default Project;
