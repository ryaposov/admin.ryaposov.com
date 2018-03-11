import style from './style.scss';
import { connect } from 'preact-redux';
import { Component } from 'preact';
import {
	Container,
	Header,
	Grid,
	Button,
	Image,
	Form,
	Message
} from 'semantic-ui-react';
import { callSignIn } from '../../store/actions/user';

class LoginForm extends Component {
	state = {
		form: {
			email: '',
			password: ''
		},
		loading: false,
		validation: {
			header: '',
			msg: ''
		}
	}

	submit = async (e) => {
		if (e.target.checkValidity()) {
			this.setState({ loading: true });
			let response = await this.props.dispatch(callSignIn(this.state.form));
			if (response.status === 403) {
				this.setState({
					validation: {
						header: 'Wrong credentials',
						msg: 'Try again with different email and password'
					}
				});
				this.setState({ loading: false });
			} else if (response.status === 200) {
				if (this.props.user.user.token) {
					setTimeout(() => {
						this.setState({ loading: true });
						this.props.history.push('/');
					}, 1000);
				} else {
					this.setState({ loading: false });
				}
			}

		}
	}

	updateForm = (e) => {
		this.setState({ form: Object.assign(this.state.form, { [e.target.name]: e.target.value }) });
	}

	render(props, { form, validation, loading }) {
		return (
			<Container className={style.loginform}>
				<Grid textAlign="center" verticalAlign="middle">
					<Grid.Column computer={5}>
						<Header as="h2" textAlign="center" style={{ marginBottom: '40px' }}>
							<Image src="/assets/img/logo-black.svg" />
							<p>Log-in</p>
						</Header>
						<Form autocomplete="on" size="large" onSubmit={this.submit}>
							<Form.Input
								fluid
								required
								name="email"
								value={form.email}
								onInput={this.updateForm}
								placeholder="E-mail address"
							/>
							<Form.Input
								fluid
								required
								value={form.password}
								onInput={this.updateForm}
								name="password"
								placeholder="Password"
								type="password"
							/>
							{ validation.header &&
								<Message
									size="small"
									color="orange"
							    header={validation.header}
							    content={validation.msg}
							  />
							}
							<Button
								disabled={loading}
								loading={loading}
								type="submit"
								color="black"
								fluid
								size="large"
							>
								Login
							</Button>
						</Form>
					</Grid.Column>
				</Grid>
			</Container>
		);
	}
}


const mapStateToProps = (state) => ({ user: state.user });

export default connect(mapStateToProps)(LoginForm);
