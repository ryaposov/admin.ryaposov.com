import { Component } from 'preact';
import { connect } from 'preact-redux';
import style from './style.scss';
import {
	Container,
	Breadcrumb,
	Divider,
	Header,
	Grid,
	Button,
	Label,
	Form
} from 'semantic-ui-react';

const options = [
	{ key: 'development', text: 'Development', value: 'Development' },
	{ key: 'design', text: 'Design', value: 'Design' }
]

class Project extends Component { // eslint-disable-line react-prefer-stateless-function

	state = {
		options,
		links: []
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

	render ({ projects }, { options, links }) {
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
				<Form>
					<Grid columns="equal">
				    <Grid.Row>
				      <Grid.Column computer={4}>
								<Form.Input label='Client' placeholder="Client" />
								<Form.Input label='Year' placeholder="Year" />
								<Form.Select multiple selection options={options} label='Type' placeholder="Type" />
								<Form.Select multiple selection allowAdditions search options={links} label='Links' placeholder="Links" onAddItem={this.addLink} />
								<Form.TextArea label='Goal' placeholder='Project goal...' rows={8} />
								<Grid columns="equal" verticalAlign="middle">
									<Grid.Row>
										<Grid.Column computer={8}>
											<Form.Checkbox label="Published" />
										</Grid.Column>
										<Grid.Column computer={8} textAlign="right">
											<Button color="red" basic compact size="mini">Delete</Button>
										 </Grid.Column>
									</Grid.Row>
								</Grid>
							</Grid.Column>
							<Grid.Column>
								<Form.Input size="big" placeholder="Title" />
								<Form.TextArea placeholder='Intro text...' rows={35} />
							</Grid.Column>
				    </Grid.Row>
				  </Grid>
				</Form>
			</Container>
		);
	}
}

const mapStateToProps = (state) => ({ projects: state.projects });

export default connect(mapStateToProps)(Project);
