import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { userContext } from '../../App';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import './LogIn.css'
import { createUserWithEmailAndPassword, handleFbSignIn, handleGoogleSingIn, initializeLoginFramework, signInWithEmailAndPassword } from './loginManager';
import ParticleBackground from '../ParticleBackground/ParticleBackground';




const LogIn = () => {
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        photo: '',
        error: '',
        success: false
    })
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");


    initializeLoginFramework();
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };



    const handleBlur = (event) => {
        let isFieldValid = true;
        if (event.target.name === 'email') {
            if (/\S+@\S+\.\S+/.test(event.target.value)) {
                isFieldValid = true;
                setError("");
            } else {
                isFieldValid = false;
                setError("Format: something@mail.com");
            }

        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[event.target.name] = event.target.value;
            setUser(newUserInfo);
        }
    }

    // Password CHeck && Validation 
    const checkPassword = (e) => {
        const confPass = e.target.value;
        setConfirmPassword(confPass);
        if (password != confPass) {
            setError("Password did not match");
        } else {
            if (password.length > 6 && /\d{1}/.test(password)) {
                const newUserInfo = { ...user };
                newUserInfo.password = password;
                setUser(newUserInfo);
                setError("");
            } else {
                setError("6 digit & Minimum one number");
            }

        }
    }




    const handleSubmit = (e) => {
        console.log(user);
        //sign up
        if (newUser && user.email && user.password) {
            createUserWithEmailAndPassword(user.name, user.email, user.password)
                .then(res => {
                    setUser(res);
                    setLoggedInUser(res);
                    history.replace(from);
                    console.log(res);
                })
        }
        //sign in
        if (!newUser && user.email) {

            signInWithEmailAndPassword(user.email, password + "")
                .then(res => {
                    setUser(res);
                    setLoggedInUser(res);
                    history.replace(from);
                    console.log(res);
                })
        }

        e.preventDefault();
    }

    const googleSignIn = () => {
        handleGoogleSingIn()
            .then(res => {
                setUser(res);
                setLoggedInUser(res);
                history.replace(from);
            })

    }

    const fbSignIn = () => {
        handleFbSignIn()
            .then(res => {
                setUser(res);
                setLoggedInUser(res);
                history.replace(from);
            })
    }



    return (
        <div className="row d-flex justify-content-center">

            <div className="col-md-6 col-lg-3 col-sm-12 login-form">
                <form onSubmit={handleSubmit}>
                    <h2 className="text-center">{newUser ? "Create Your Account" : "Please Sign In"}</h2>
                    <div className="text-center social-btn">
                        <button onClick={fbSignIn} className="btn btn-primary btn-block"><FontAwesomeIcon icon={faFacebook} /> Sign {newUser ? "up" : "in"} with <b>Facebook</b></button>
                        <button onClick={googleSignIn} className="btn btn-danger btn-block"><FontAwesomeIcon icon={faGoogle} /> Sign {newUser ? "up" : "in"} with <b>Google</b></button>
                    </div>
                    <div className="or-seperator"><i>or</i></div>
                    {
                        newUser &&
                        <div className="form-group">
                            <div className="input-group">

                                <input onBlur={handleBlur} type="text" className="form-control" name="name" placeholder="Username" required="required" />
                            </div>
                        </div>
                    }
                    <div className="form-group">
                        <div className="input-group">

                            <input type="text" onBlur={handleBlur} className="form-control" name="email" placeholder="Email" required="required" />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group">

                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" name="password" placeholder="Password" required="required" />
                        </div>
                    </div>
                    {
                        newUser &&
                        <div className="form-group">
                            <div className="input-group">

                                <input value={confirmPassword} type="password" onChange={(e) => checkPassword(e)} className="form-control" name="confirmPassword" placeholder="Confirm Password" required="required" />
                            </div>
                        </div>
                    }
                    <p className="text-danger">{error}</p>
                    <div className="form-group">
                        <button type="submit" className="btn btn-success btn-block login-btn">Sign {newUser ? "Up" : "In"}</button>
                    </div>
                    <div class="hint-text small">{newUser ? "Already a member? " : "Don't have a account?"} <button onClick={() => setNewUser(!newUser)} className="btn-toogle">{newUser ? "Sign in" : "Sign Up"}</button></div>

                </form>

            </div>

        </div>
    );


};

export default LogIn;