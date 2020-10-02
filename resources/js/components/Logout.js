import React, { Component } from 'react'
import { css } from "@emotion/core";
import ScaleLoader from "react-spinners/ScaleLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  z-index: 100000;
  margin-top: 50vh;
`;

class Logout extends Component {
    
    state = {
        loading: true
    }

    componentDidMount = () => {
        this.handleLogout();
    }
    
    handleLogout = () => {
        let token = localStorage.getItem('token');

		const uri = '/api/logout'
		axios.post(uri, {'token': token}).then((response) => {
            this.setState = {
                loading: false
            }
            localStorage.setItem('token', '');
			this.props.eventChangeAuthentication(false);
            this.props.history.push('/login');
		}).catch((error) => {
			console.log(error);
		});
    }

    render() {
        return (
            <div style={{ display: 'flex', alignItems: 'ClientRect', justifyContent: 'center', zIndex: "100000"}}>
                <ScaleLoader
                    css={override}
                    marginTop={150}
                    size={150}
                    color={"#707070"}
                    loading={this.state.loading}
                />
            </div>
        )
    }
}

export default Logout
