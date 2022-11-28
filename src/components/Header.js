import React, { useState, useEffect} from "react";
import PropTypes from 'prop-types';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { Link} from "react-router-dom";
import { auth } from "../firebase";

export default function Header() {

  const usernameButton = {
    border: 'none'
  }
  
  // function decider() {
  //   if (isAuthenticated == false) {
  //     setTest('not logged');
  //   } else {
  //     setTest('logged');
  //   }
  // }

// useEffect(() => {
//   decider();
// }, [firebase.auth().currentUser] )
function doSignOut() {
  signOut(auth)
    .then(function() {
     
    }).catch(function(error) {
      
    });
}

  if (auth.currentUser == null) {
    return (
      <React.Fragment>
        <nav class="navbar navbar-expand-lg header">
          <div class="container-fluid">
            <a class="navbar-brand" href="#">JokeBook</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="navbar-nav">
              <Link className="header" to="/signup"><button className="nav-item btn btn-outline-primary mx-2">Signup</button></Link>
              <Link className="header" to="/login"><button className="nav-item btn btn-outline-primary">Login</button></Link>
            </div>
          </div>
        </nav>
      </React.Fragment>
    )
  } else {
    return (
    <React.Fragment>
        <nav class="navbar navbar-expand-lg">
          <div class="container-fluid">
            <a class="navbar-brand" href="#">JokeBook</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="navbar-nav">
            <button class="nav-item btn btn-outline-primary border border-0"><strong>test</strong></button>
            <button type="click" onClick={() => doSignOut()} className="btn btn-outline-primary mx-2 border border-0">sign out</button>
            </div>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}
