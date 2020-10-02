import React, {Component} from 'react'
import { Link } from 'react-router-dom'

class Header extends Component {
 
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <Link className="navbar-brand" to='/'>TODO Application</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="nav-item">
                            <Link className='nav-link' to='/'>Home</Link>
                        </li>
                        {
                            this.props.verify 
                            ?
                            <>
                                <li className="nav-item">
                                    <Link className='nav-link' to='/dashboard'>Dashboard</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className='nav-link' to='/contact'>Contact</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className='nav-link' to='/logout'>Logout</Link>
                                </li>
                            </>
                            : null
                        }
                        
                        {
                            this.props.verify 
                            ?
                            null
                            : 
                            <>
                            <li className="nav-item">
                                    <Link className='nav-link' to='/login'>Login</Link>
                            </li>
                            </>
                        }
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Header
