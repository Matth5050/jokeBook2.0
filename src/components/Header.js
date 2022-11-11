import React, { useState, useEffect} from "react";
import PropTypes from 'prop-types';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export default function Header() {

  
  
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
 
 

  if (auth.currentUser == null) {
    return (
      <React.Fragment>
        <nav class="navbar navbar-expand-lg bg-light">
          <div class="container-fluid">
            <a class="navbar-brand" href="#">JokeBook</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="navbar-nav">
              <a class="nav-link active" aria-current="page" href="#">Home</a>
              <a class="nav-link" href="#">Hello</a>
            </div>
          </div>
        </nav>
      </React.Fragment>
    )
  } else {
    return (
    <React.Fragment>
        <nav class="navbar navbar-expand-lg bg-light">
          <div class="container-fluid">
            <a class="navbar-brand" href="#">JokeBook</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="navbar-nav">
              <a class="nav-link active" aria-current="page" href="#">logged</a>
              <a class="nav-link" href="#">test</a>
            </div>
          </div>
        </nav>
      </React.Fragment>
    );
  }
 
}

// Header.propTypes = {
//   ticket: PropTypes.object,
//   onEditTicket: PropTypes.func
// };