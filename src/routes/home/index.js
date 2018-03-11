import { Component } from 'preact';
import { connect } from 'preact-redux';
import style from './style.scss';
import { Link } from 'preact-router/match';
import {
	Container,
	Header,
	Divider,
	Grid,
	Segment,
	List,
	Button,
	Statistic,
	Image,
	Icon
} from 'semantic-ui-react';

class Home extends Component {
	render() {
		return (
			<Container>
				<Header as="h1">Dashboard</Header>
				<Divider />
				<Statistic.Group widths="four" style={{ margin: '40px 0 20px' }}>
			    <Statistic>
			      <Statistic.Value>22</Statistic.Value>
			      <Statistic.Label>Saves</Statistic.Label>
			    </Statistic>

			    <Statistic>
			      <Statistic.Value text>
			        Three
			        <br />Thousand
			      </Statistic.Value>
			      <Statistic.Label>Signups</Statistic.Label>
			    </Statistic>

			    <Statistic>
			      <Statistic.Value>
			        <Icon name="plane" />
			        5
			      </Statistic.Value>
			      <Statistic.Label>Flights</Statistic.Label>
			    </Statistic>

			    <Statistic>
			      <Statistic.Value>42</Statistic.Value>
			      <Statistic.Label>Team Members</Statistic.Label>
			    </Statistic>
			  </Statistic.Group>
				<Grid columns="equal">
			    <Grid.Row>
			      <Grid.Column>
							<Segment>
								<Header as="h3">Recent Projects</Header>
								<List divided relaxed>
									{
										[0,1,2,3,4,5,6,7].map(item => (
											<List.Item key={'projects' + item}>
												<List.Content>
													<List.Header as="span">
														<Link href={`/projects/${item}`}>Semantic-Org/Semantic-UI</Link>
													</List.Header>
													<List.Description as="span">Updated 10 mins ago</List.Description>
												</List.Content>
											</List.Item>
										))
									}
								</List>
								<Button basic fluid>Show all</Button>
							</Segment>
						</Grid.Column>
						<Grid.Column computer={6}>
							<Segment>
								<Header as="h3">Recent Posts</Header>
								<List divided relaxed>
									{
										[0,1,2,3,4,5,6,7].map(item => (
											<List.Item key={'posts' + item}>
												<List.Content>
													<List.Header as="span">
														<Link href={`/projects/${item}`}>Semantic-Org/Semantic-UI</Link>
													</List.Header>
													<List.Description as="span">Updated 10 mins ago</List.Description>
												</List.Content>
											</List.Item>
										))
									}
								</List>
								<Button basic fluid>Show all</Button>
							</Segment>
						</Grid.Column>
			    </Grid.Row>
			  </Grid>
			</Container>
		);
	}
}


const mapStateToProps = (state) => ({ projects: state.projects });

export default connect(mapStateToProps)(Home);
