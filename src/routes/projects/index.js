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
import { fetchProjectsIfNeeded, createProject, fetchProjects } from '../../store/actions/projects';
import Project from '../../components/projectItem';

class Projects extends Component {
	sections = [
		{
			key: 'Dashboard',
			content: (<Link to="/">Dashboard</Link>)
		},
		{
			key: 'Projects',
			content: 'Projects',
			active: true
		}
	];

	state = {
		createLoading: false
	}

	createProject = async () => {
		this.setState({ createLoading: true });
		let response = await createProject({ title: 'New Project' });
		await this.props.dispatch(fetchProjects());
		if (response.bodyJson && '_id' in response.bodyJson) {
			this.setState({ createLoading: false });
			this.props.history.push(`/projects/${response.bodyJson._id}/`);
		}
	}

	async componentDidMount () {
		const { dispatch } = this.props;
		await dispatch(fetchProjectsIfNeeded());
	}

	render({ projects }, { createLoading }) {
		return (
			<Container>
				<Grid columns="equal" verticalAlign="middle">
			    <Grid.Row>
			      <Grid.Column>
							<Header as="span" size="huge">Projects</Header>
							<Button basic size="small" compact loading={createLoading} disabled={createLoading} style={{ marginLeft: '20px', verticalAlign: '5px' }} onClick={this.createProject}>New</Button>
						</Grid.Column>
						<Grid.Column computer={6} textAlign="right">
							<Breadcrumb sections={this.sections} />
						</Grid.Column>
			    </Grid.Row>
			  </Grid>
				<Divider />
				<List divided relaxed="very">
					{ projects.items && projects.items.map(project => (
						<Project key={project._id} project={project} />
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


const mapStateToProps = (state) => ({ projects: state.projects });

export default connect(mapStateToProps)(Projects);
