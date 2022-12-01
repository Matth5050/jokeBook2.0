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
            <p className="title navbar-brand">JokeBook</p>
            <div class="navbar-nav">
              <a href="https://chrome.google.com/webstore/detail/jokebook/nlhdhpfhfopniaajbgfichnlpbnndhfk"><button className=" border border-0 nav-item btn btn-outline-primary">Get the Chrome extension here!</button></a>
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
            <p className="title navbar-brand">JokeBook</p>
            <div class="navbar-nav mb-3">
              <a href="https://chrome.google.com/webstore/detail/jokebook/nlhdhpfhfopniaajbgfichnlpbnndhfk"><button className=" border border-0 nav-item btn btn-outline-primary">Get the Chrome extension here!</button></a>
              <button class="nav-item btn btn-outline-primary border border-0"><strong>{auth.currentUser.displayName}</strong></button>
              <button type="click" onClick={() => doSignOut()} className="btn btn-outline-primary mx-2 border border-0">sign out</button>
            </div>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}
