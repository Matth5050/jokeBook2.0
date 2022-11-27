import React, { useState } from "react";
import { auth } from "../firebase.js";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import { getAuth, setPersistence, signInWithEmailAndPassword, browserSessionPersistence, createUserWithEmailAndPassword } from "firebase/auth";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function UserSignUpIn() {  

  const cardWidth = {
    width: "18rem",
    marginTop: "250px",
  }
  
  const [signUpSuccess, setSignUpSuccess] = useState(null);
  const [signInSuccess, setSignInSuccess] = useState(null);
  const [signOutSuccess, setSignOutSuccess] = useState(null);

  function doSignUp(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setSignUpSuccess(`You've successfully signed up, ${userCredential.user.email}!`)
      })
      .catch((error) => {
        setSignUpSuccess(`There was an error signing up: ${error.message}!`)
      });
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
    })
    .catch((error) => {
      setSignInSuccess(`There was an error signing in: ${error.message}!`);
    });
  })
  }

  function doSignOut() {
    signOut(auth)
      .then(function() {
        setSignOutSuccess("You have successfully signed out!");
      }).catch(function(error) {
        setSignOutSuccess(`There was an error signing out: ${error.message}!`);
      });
  }



  // return (
  //   <React.Fragment>
  //     <h1>Sign up</h1>
  //     {signUpSuccess}
  //     <form onSubmit={doSignUp}>
  //       <input
  //         type='text'
  //         name='email'
  //         placeholder='email' />
  //       <input
  //         type='password'
  //         name='password'
  //         placeholder='Password' />
  //       <button type='submit'>Sign up</button>
  //     </form>
  //   </React.Fragment>
  // );


  return (
    <React.Fragment>
      ...

      <h1>Sign In</h1>
      <div>
        <div className="card text-center mx-auto p-3 login-card" style={cardWidth}>
          <div>
            <h3 className="mb-3 card-title">Login</h3>
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
                <p className="small">forgot password?</p>
              </div>
              <button type="submit" className="sports btn">Login</button>
            </form>
          </div>
        </div>
        <p className="text-center mt-3 color-style">New to LeaderBet? <Link to="/register">Register an account here!</Link></p>
      </div>
    </React.Fragment>
  );
}

