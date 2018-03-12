import { Component } from 'preact';
import { connect } from 'preact-redux';
import {
	List,
	Header,
	Grid,
	Button,
	Icon,
	Label
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import {
	deleteProject,
	fetchProjects
} from '../../store/actions/projects';

class Projects extends Component {
	delete = async () => {
		await deleteProject(this.props.project._id);
		await this.props.dispatch(fetchProjects());
	}

	render ({ project }) {
		return (
			<List.Item>
				<List.Content>
					<Grid columns="equal" verticalAlign="middle">
						<Grid.Row>
							<Grid.Column>
								<List.Header as="span">
									<Link to={`/projects/${project._id}`}>{project.title}</Link>
								</List.Header>
								{project.text && <List.Description as="span">{project.text.substring(0, 30)}...</List.Description>}
							</Grid.Column>
							<Grid.Column computer={3} textAlign="right">
								<Header as="span" size="tiny" disabled>{project.year}</Header>
							</Grid.Column>
							<Grid.Column computer={3} textAlign="left">
								{project.category.length && project.category.map((category, i) => (
									<Label as="span" key={project._id + 'category' + i} content={category} />
								))}
							</Grid.Column>
							<Grid.Column computer={3} textAlign="right">
								<Button as={Link} to={`/projects/${project._id}`} basic size="small">Edit</Button>
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

export default connect(mapStateToProps)(Projects);
