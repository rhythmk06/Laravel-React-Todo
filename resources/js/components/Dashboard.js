import React, { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from "@emotion/core";
import ScaleLoader from "react-spinners/ScaleLoader";

import TodoList from './TodoList';
import Form from './Form';

toast.configure({
	autoClose: 3000,
  	draggable: false,
})

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  z-index: 100000;
`;

class Dashboard extends Component {

	state = {
		loading: false,
		title: 'Todo Application (Laravel+React)',
		todoItemsCount: null,
		todos: [],
		name: '',
		updatedName: '',
		getTodoId: '',
		error: { status: 'false', msg : ''},
		username: ''
	};

	notifyInsert = () => toast.success("Todo created successfully!");
	notifyDelete = () => toast.error("Todo Deleted successfully!");
	notifyUpdate = () => toast.info("Todo Updated successfully!");

	componentDidMount = () => {
        this.getAllData();
	}

	getAllData = () => {
		const uri = 'api/todos';
		let token = localStorage.getItem('token')
		const headers = { Authorization: `Bearer ${token}` }

		axios.get(uri, {headers}).then(response => { 
			console.log(response.data);
			if(response.data.status === false) {
				localStorage.setItem('token', '');
				this.props.eventChangeAuthentication(false)
			}else{
				this.setState({ 
					todos: response.data.todos,
					todoItemsCount: response.data.length,
					loading: false,
					validationError: false,
					username: response.data.user
                });
                this.props.eventChangeAuthentication(true)
			}
		}).catch((error) => {
			console.log(error);
		})
	}

	handleInsertAction = (event) => {
		event.preventDefault();
		let {name} = this.state;

		if(name === "" || name === "undefined" ) {
			this.setState({
				error: {status: 'true', msg: "Field should not be empty!"}
			})
			return false;
		}else {
			let newTodo = {name: name};
			
			const uri = 'api/todos';
    		axios.post(uri, newTodo).then((response) => {
				this.notifyInsert();
				this.setState({
					todos: response.data,
					error: {status: 'false', msg: ""},
					name: '',
					todoItemsCount: response.data.length,
				})
			}).catch((error) => {
				console.log(error);
			});
		}
	}
	
	handleDeleteAction = (event, todo) => {
		this.notifyDelete();
		const uri = `api/todos/${todo.id}`;
		axios.delete(uri).then((response) => {
			this.setState({
				todos: response.data,
				todoItemsCount: response.data.length
			})
		}).catch((error) => {
			console.log(error);
		});
	}

	handleUpdateAction = (event, todo) => {
		let {updatedName} = this.state;
		let editedTodoName = {name: updatedName};
		
		const uri = `api/todos/${todo.id}`;
    	axios.patch(uri, editedTodoName).then((response) => {
			this.notifyUpdate();
			this.setState({
				todos: response.data,
				getTodoId: '',
				updatedName: ''
			})
		}).catch((error) => {
			console.log(error);
		});
	}

	handleShowEditForm = (todo) => {
		this.setState({
			getTodoId : todo.id
		})
	}

	handleCancelEdit = () => {
		this.setState({
			getTodoId: '',
			updatedName: ''
		})
	}

	getInputValue = (event) => {
		this.setState({
			name : event.target.value
		})
	}

	getUpdatedName = (event) => {
		this.setState({
			updatedName : event.target.value
		})
	}

	render() {
		const token = localStorage.getItem('token');
		const {title, todoItemsCount, todos, name, updatedName, getTodoId, error} = this.state
		return (
			<div className="container">
				<h1 className="my-3 text-center">{title}</h1>
				<div className="offset-md-3 col-md-6 text-center my-5	">
					{/* <Form 
						name={name}
						todos = {todos}  
						todoItemsCount = {todoItemsCount}
						eventGetInputValue = {(event) => this.getInputValue(event)} 
						eventInsert = {(event) => this.handleInsertAction(event)} 
						error = {error}
					/> */}
				</div>
				<div className="col-md-12 my-5">
                    <TodoList 
                        todos = {todos} 
                        todoItemsCount = {todoItemsCount}
                        updatedName = {updatedName}
                        getTodoId = {getTodoId} 
                        eventShowEditForm = {(id) => this.handleShowEditForm(id)}
                        eventUpdate = {(event, id) => this.handleUpdateAction(event, id)}
                        eventUpdatedName = {(event) => this.getUpdatedName(event)}
                        eventCancelEdit = {(event) => this.handleCancelEdit(event)}
                        eventDelete = {(event, id) => this.handleDeleteAction(event, id)} 
                    />  
                    <div style={{ display: 'flex', alignItems: 'ClientRect', justifyContent: 'center', zIndex: "100000"}}>
                        <ScaleLoader
                            css={override}
                            size={150}
                            color={"#707070"}
                            loading={this.state.loading}
                        />
                    </div>
				</div>
			</div>
		);
	}
}

export default Dashboard
