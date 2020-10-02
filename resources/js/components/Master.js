import React, { Component } from 'react';
import { withRouter } from "react-router";
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import Index from './Index';
import Header from './Header';
import Home from './Home';
import Contact from './Contact';
import Dashboard from './Dashboard';
import Logout from './Logout';
import PrivateRoute from './PrivateRoute';
import GuestRoute from './GuestRoute';

class Master extends Component {
    
    state = {
        authenticated: localStorage.getItem('token')
    };
    
    changeAuthentication = (value) => {
        this.setState({
            authenticated: value
        })
    }
    
    render() {
    return(
        <BrowserRouter>
            <div>
                <Header history={this.props.history} verify = {this.state.authenticated} eventChangeAuthentication = {(value) => this.changeAuthentication(value)} />
                <Switch>
                    <Route exact path='/'  component={Home} />

                    <GuestRoute 
                        exact 
                        path='/login' 
                        authenticated={this.state.authenticated} 
                        component={Index} 
                        eventChangeAuthentication = {(value) => this.changeAuthentication(value)} 
                    />

                    <PrivateRoute 
                        exact 
                        path='/dashboard' 
                        authenticated={this.state.authenticated} 
                        component={Dashboard} 
                        eventChangeAuthentication = {(value) => this.changeAuthentication(value)} 
                    />

                    <PrivateRoute 
                        exact 
                        path='/contact' 
                        authenticated={this.state.authenticated} 
                        component={Contact} 
                    />

                    <PrivateRoute 
                        exact 
                        path='/logout' 
                        authenticated={this.state.authenticated} 
                        component={Logout} 
                        eventChangeAuthentication = {(value) => this.changeAuthentication(value)}
                    />
                </Switch>
            </div>
        </BrowserRouter>
    )
}
}

export default Master;


