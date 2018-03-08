import { Component } from 'preact';
import { connect } from 'preact-redux';
import style from './style.scss';
import { Link } from 'preact-router/match';
import {
	Container,
	List,
	Breadcrumb,
	Divider,
	Header,
	Grid,
	Button,
	Icon,
	Label,
	Pagination
} from 'semantic-ui-react';

class Projects extends Component {
	sections = [
		{
			key: 'Dashboard',
			content: 'Dashboard',
			href: '/'
		},
		{
			key: 'Projects',
			content: 'Projects',
			active: true
		}
	];

	render() {
		return (
			<Container>
				<Grid columns="equal" verticalAlign="middle">
			    <Grid.Row>
			      <Grid.Column>
							<Header as="span" size="huge">Projects</Header>
							<Button basic size="small" compact style={{ marginLeft: '20px', verticalAlign: '5px' }}>New</Button>
						</Grid.Column>
						<Grid.Column computer={6} textAlign="right">
							<Breadcrumb sections={this.sections} />
						</Grid.Column>
			    </Grid.Row>
			  </Grid>
				<Divider />
				<List divided relaxed="very">
					{
						[0,1,2,3,4,5,6,7].map(item => (
							<List.Item>
								<List.Content>
									<Grid columns="equal" verticalAlign="middle">
										<Grid.Row>
											<Grid.Column>
												<List.Header as="span">
													<Link href={`/projects/${item}`}>Semantic-Org/Semantic-UI</Link>
												</List.Header>
												<List.Description as="span">Updated 10 mins ago</List.Description>
											</Grid.Column>
											<Grid.Column computer={3} textAlign="right">
												<Header as="span" size="tiny" disabled>2015</Header>
											</Grid.Column>
											<Grid.Column computer={3} textAlign="right">
												<Label as="span" content="Design" />
												<Label as="span" content="Development" />
											</Grid.Column>
											<Grid.Column computer={3} textAlign="right">
												<Button basic size="small">Edit</Button>
												<Button basic icon color="red" style={{ marginLeft: 'a10px' }} size="small">
									        <Icon name="trash" />
									      </Button>
												<Icon name="bars" color="grey" style={{ marginLeft: '10px' }} />
											</Grid.Column>
										</Grid.Row>
									</Grid>
								</List.Content>
							</List.Item>
						))
					}
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
