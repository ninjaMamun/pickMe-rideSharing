import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { userContext } from '../../App';
import './Header.css';
import logo from '../../../src/images/pickme.png';


const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    let email = loggedInUser.email;
    if (email) {
        var name = email.substring(0, email.lastIndexOf("@"));
    }


    return (
        <div className="menu-area">
            <nav className="navbar navbar-expand-lg navbar-light nav-spacing">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand">
                        <img className="navimg" src={logo} alt="" />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link to="/home" className="nav-link active nav-a" aria-current="page">Home</Link>
                            <Link  className="nav-link nav-a" >Destination</Link>
                            <Link className="nav-link nav-a" >Blog</Link>
                            <Link className="nav-link nav-a" >Contact</Link>
                            {
                                (loggedInUser.displayName) ? <p className="nav-link nav-a" >{loggedInUser.displayName}</p> : (email) ? <p className="nav-link nav-a" >{name}</p> :  <Link to="/login"><button className="btn-toogle">Log In</button></Link>
                            }
                            
                            
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;