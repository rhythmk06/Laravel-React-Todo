import React, { Component } from 'react';
import 'react-toastify/dist/ReactToastify.css';

import LoginForm from './LoginForm';

class Index extends Component {

	state = {
		email: '',
		password: '',
		isLoggedIn: false,
		form: [],
		showLoginForm: true,
		showLogoutButton: false,
		validationError: false,
	};
	
	
	handleLoginFormSubmitAction = (event) => {
        event.preventDefault();

		let {email,password} = this.state;
        let data = {email: email, password: password};
        
        const uri = '/api/login'
		axios.post(uri, data).then((response) => {
			if (response.status === 200) {
				localStorage.removeItem('token');
				localStorage.setItem('token', response.data.token)
				this.props.eventChangeAuthentication(response.data.status)
				this.props.history.push('/dashboard')
			}
			if (response.status === 401) {
				localStorage.removeItem('token');
				this.props.eventChangeAuthentication(!response.data.status)
			}
        }).catch((error) => {
			if(error.response.status == 400) {
				this.setState({
					validationError: true,
				})
			}
		});
	}

	getLoginData = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	render() {
		const {showLoginForm, validationError } = this.state
		return (
			<div className="container">
				<div className="col-md-12 my-5">
						<LoginForm
							eventHandleLogin = {(event) => this.handleLoginFormSubmitAction(event)}
							eventGetLoginData = {(event) => this.getLoginData(event)}
							showLoginForm = {showLoginForm}
							validationError = {validationError}
						/>
				</div>
			</div>
		);
	}
}

export default Index;


