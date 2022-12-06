import React, { useState } from "react";
import { getAuth, setPersistence, signInWithEmailAndPassword, browserSessionPersistence } from "firebase/auth";
import { BrowserRouter as Router, Link, useNavigate } from "react-router-dom";
import LogHeader from "./LogHeader";

export default function UserSignUpIn() {  

  const cardWidth = {
    width: "18rem",
    marginTop: "120px",
  }
  
  const [signUpSuccess, setSignUpSuccess] = useState(null);
  const [signInSuccess, setSignInSuccess] = useState(null);
  const [signOutSuccess, setSignOutSuccess] = useState(null);
  const navigate = useNavigate();

  function navToHome() {
    navigate('/');
  }

  function doSignIn(event) {
    event.preventDefault();
    const email = event.target.signinEmail.value;
    const password = event.target.signinPassword.value;

    const auth = getAuth();
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setSignInSuccess(`You've successfully signed in as ${userCredential.user.email}!`)
        navToHome();
    })
    .catch((error) => {
      setSignInSuccess(`There was an error signing in: ${error.message}!`);
    });
  })
  }

  return (
    <React.Fragment>
      <LogHeader />
      <div>
        <div className="card text-center mx-auto p-3 bg-transparent border-0" style={cardWidth}>
          <div>
            <h3 className="mb-3 card-title bodyText fs-1">Login</h3>
            <form className="form" onSubmit={doSignIn}>
              <div className="mb-3">
                <input 
                type="email" 
                className="form-control col-xs-3"
                name="signinEmail" 
                id="exampleInputEmail1" 
                size="50" 
                aria-describedby="emailHelp" 
                placeholder="email"></input>
              </div>
              <div className="mb-3">
                <input 
                type="password" 
                name="signinPassword"
                className="form-control" 
                id="exampleInputPassword1" 
                placeholder="password"></input>
                
              </div>
              <button type="submit" className="btn btn-outline-primary border-white bodyText">Login</button>
            </form>
          </div>
        </div>
        <p className="text-center mt-3 color-style smallText">New to JokeBook? <Link to="/signup" className="linkText">Register an account here!</Link></p>
      </div>
    </React.Fragment>
  );
}

