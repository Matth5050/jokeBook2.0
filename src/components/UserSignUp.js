import React, { useState } from "react";
import { auth } from "../firebase.js";
import { collection, setDoc, doc, addDoc } from 'firebase/firestore';
import  { db } from './../firebase';
import { v4 } from 'uuid';
import { signOut } from "firebase/auth";
import { getAuth, setPersistence, signInWithEmailAndPassword, browserSessionPersistence, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import LogHeader from "./LogHeader";

export default function UserSignUpIn() {  

  const cardWidth = {
    width: "18rem",
    marginTop: "120px",
  }
  
  const navigate = useNavigate();

  function navToHome() {
    navigate('/');
  }

  function submitUserInfo(event) {
  setDoc(doc(db, 'users', event.target.email.value),{
    email: event.target.email.value,
    user: event.target.userName.value,
    voteCount: 0,
    id: v4()
  })
}

  function doSignUp(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const userName = event.target.userName.value;
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then( async (userCredential) => {
        await console.log(email, password, userName);
        await submitUserInfo(event);
        updateProfile(auth.currentUser, {
          displayName: userName
        });
        navToHome();
        
      }).catch((error) => {

      });
  }

  return (
    <React.Fragment>
      <LogHeader />
        <div className="card text-center mx-auto p-3 bg-transparent border-0" style={cardWidth}>
          <div>
            <h3 className="mb-3 card-title headings fs-1">Sign-Up</h3>
            <form className="form" onSubmit={doSignUp}>
                <div className="mb-3">
                  <input 
                    type="text" 
                    className="form-control col-xs-3" 
                    id="exampleInputUserName" size="50"
                    name="userName" 
                    aria-describedby="userNameHelp" 
                    placeholder="User name"
                    required>
                  </input>
                </div>
                <div className="mb-3">
                  <input 
                    type="text" 
                    className="form-control col-xs-3" 
                    id="exampleInputEmail1" size="50"
                    name="email" 
                    aria-describedby="emailHelp" 
                    placeholder="Email"
                    required>
                  </input>
                </div>
                <div className="mb-3">
                  <input 
                    type="password" 
                    className="form-control" 
                    name="password"
                    id="exampleInputPassword1" 
                    placeholder="Password"
                    required>
                  </input>
                </div>
                <div className="mb-3">
                  <input 
                    type="password" 
                    className="form-control" 
                    name="password2"
                    id="exampleInputPassword2" 
                    placeholder="Confirm password"
                    required>
                  </input>
                </div>
              <button type="submit" className="btn btn-outline-primary border-white bodyText">Register</button>
              </form>
          </div>
        </div>
        <p className="text-center mt-3 color-style smallText">Already have an account? <Link className="linkText" to="/login">Login here</Link></p>
    </React.Fragment>
  );
}
