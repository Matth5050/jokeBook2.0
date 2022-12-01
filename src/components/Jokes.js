import React, { useState, useRef, useContext } from "react";
import { collection, setDoc, doc, addDoc } from 'firebase/firestore';
import  { db } from './../firebase';
import jokes from '../data/cleanJokes.json';
import { v4 } from 'uuid';
import { UserContext } from "./UserContext";
import  UserJokes  from "./UserJokes"
import { auth } from "../firebase.js";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import { getAuth, setPersistence, signInWithEmailAndPassword, browserSessionPersistence, createUserWithEmailAndPassword } from "firebase/auth";
import Leaderboard from "./Leaderboard";


export default function Jokes(props) {

  const submitStyle = {
    marginTop: 120
  }
  const inputStyle = {
    marginTop: 210
  }

  const authCheck = props.authCheck;
  const jokeRef = useRef();
  const [displayJoke, setDisplayJoke] = useState('Click for a joke!');
  const [submitIsVisible, setSubmitIsVisible] = useState(false);
  const [logIsVisible, setlogIsVisible] = useState(false);

  function getRandomInt() {
    const min = Math.ceil(0);
    const max = Math.floor(1622);
    const randomNum = Math.floor(Math.random() * (max - min) + min);
    return randomNum;
  }

  function getJoke() {
    const num = getRandomInt();
    const joke = jokes.jokes[num].Joke;
    setDisplayJoke(joke);
  }

  function changeView() {
    setSubmitIsVisible(!submitIsVisible);
  }

  //adds joke to db
  const ref = collection(db, "userJokes")
  const handleSave = async (e) => {
    e.preventDefault();
    
    let data = {
      joke: jokeRef.current.value,
      user: auth.currentUser.email,
      userName: auth.currentUser.displayName,
      id: v4()
    };

    try{
      addDoc(ref, data);
      document.getElementById("jokeForm").reset();
    } catch (e) {
      console.log(e);
    }
  }

const submitOptions = () => {
  if (authCheck) {
    return (
      <>
        <p>
          Think you're funny? Submit you're own jokes here and see how the crowd feels!
        </p>
        <button type="click" onClick={() => changeView()} className="btn btn-primary">Submit Joke</button>
      </>
      )
  } else {
    return (
    <>
      <p>
        Login or Signup to share your jokes 😊
      </p>
      <Link to="/login"><button type="click"  className="btn btn-primary">Login</button></Link>
      <Link to="/signup"><button type="click"  className="btn btn-primary">Signup</button></Link>
    </>
    )
  }
}

  if (submitIsVisible === false) {
    return (
      <React.Fragment>
        {/* <div className="container"> */}
          <div className="row rowStyle">
            <div className="col-2">
              <UserJokes />
            </div>
            <div className="col-8 text-center">
              <div>
                <p className="output" onClick={() => {navigator.clipboard.writeText(displayJoke)}}>
                  {displayJoke}
                </p>
              </div>
              <button type="click" onClick={() => getJoke()} className="btn btn-primary mt-2">Get Joke</button>
              <div style={submitStyle}>
                {submitOptions()}
              </div>
            </div>
            <div className="col-2 yut">
              <Leaderboard />
            </div>
          </div>
        {/* </div> */}
      </React.Fragment>
    )
  } else {
    return (
      <React.Fragment>
        {/* <div className="container"> */}
          <div className="full-screen d-flex align-items-center justify-content-center align-content-center text-center flex-column" style={inputStyle}>
            <div>
              <form id="jokeForm" onSubmit={handleSave}>
                <input type="text" ref={jokeRef} placeholder="Enter your joke!" required/>
                <button className="btn btn-primary" type="submit">submit</button>
              </form>
            </div>
            <button type="click" onClick={() => changeView()} className="btn btn-primary">Back to laughing!</button>
          </div>
        {/* </div> */}
      </React.Fragment>
    )
  }

}