import React from 'react';

const LoginForm  = ({eventHandleLogin, eventGetLoginData, showLoginForm, validationError}) => {
    return (
        <div className="container" style={ showLoginForm ? {display: 'block'} : {display: 'none'}}>
            <div className="offset-md-3 col-md-6">
            <h1 className="my-3 text-center">Login Form</h1>
            <form onSubmit = {(event) => eventHandleLogin(event)} method="post">
                <div className="form-group">
                    <input 
                        className="form-control border-dark my-2" 
                        type="text" name="email" 
                        placeholder = "E-mail" 
                        id="email" 
                        onChange = {(event) => eventGetLoginData(event)}
                    />
                    <input 
                        className="form-control border-dark my-2" 
                        type="text" name="password"
                        placeholder = "Password" 
                        id="password" 
                        onChange = {(event) => eventGetLoginData(event)}
                    />
                </div>
                <div className="form-group text-center">
                    <input className="btn btn-dark" type="submit" name="submit"/>
                </div>
            </form>
            <p className="text-center text-danger" style={validationError == true ? {display: 'block'} : {display: 'none'}}>Validation Error! Please Check Your Credentials</p>
            </div>
        </div>
    );
}

export default LoginForm;


