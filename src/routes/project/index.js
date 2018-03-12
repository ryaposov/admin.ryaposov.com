import { Component } from 'preact';
import { route } from 'preact-router';
import * as projects from '../../api/crud';
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
import { deleteProject } from '../../store/actions/projects';

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
		project: {},
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

	addLink = (e, { value }) => {
		this.setState({
			links: [{ text: value, value }, ...this.state.links]
		});
	}

	contentLoaded = () => {
		return !this.state.loading &&
		('_id' in this.state.project && this.state.project._id === this.props.id);
	}

	updateForm = (e, data) => {
		if (!data) data = e.target;

		let name = data.name;
		let value = data.value;

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
		projects.getOne('projects', this.props.id)
			.then(response => {
				this.setState({ project: response.bodyJson });
				this.setState({
					links: response.bodyJson.links.map(link => (
						{ text: link, value: link }
					), [])
				});
			});
		this.setState({ loading: false });
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

	showConfirm = () => this.setState({ confirmOpen: true })
	hideConfirm = () => this.setState({ confirmOpen: false })

	async componentDidMount () {
		this.init();
	}

	render (props, { project, options, links, loading, submitLoading, confirmOpen, message }) {
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
									<Form.Input label="Year" value={project.year} placeholder="Year" name="year" onInput={this.updateForm} />
									<Form.Select multiple selection options={options} value={project.category} label="Category" name="category" onChange={this.updateForm} placeholder="Type" />
									<Form.Select multiple selection allowAdditions search value={project.links} options={links} name="links" onChange={this.updateForm} onAddItem={this.addLink} label="Links" placeholder="Links" />
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
									<Form.TextArea placeholder="Intro text..." name="text" onInput={this.updateForm} value={project.text} rows={35} />
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
