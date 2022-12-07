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
    marginTop: 120,
  }
  const inputStyle = {
    marginTop: 210
  }

  const authCheck = props.authCheck;
  const jokeRef = useRef();
  const [displayJoke, setDisplayJoke] = useState('Click for a joke!');
  const { submitIsVisible, setSubmitIsVisible } = useContext(UserContext);

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

    try{
      setDoc(doc(db, "userJokes", auth.currentUser.email), {
        joke: jokeRef.current.value,
        user: auth.currentUser.email,
        userName: auth.currentUser.displayName,
        voteTally: 0,
        id: v4()
      })
      document.getElementById("jokeForm").reset();
    } catch (e) {
      console.log(e);
    }
  }

const submitOptions = () => {
  if (authCheck) {
    return (
      <>
        <p className="text-center smallText">
          Think you're funny? Submit you're own jokes here and see how the crowd feels!
        </p>
        <div className="text-center">
          <button type="click" onClick={() => changeView()} className="btn btn-outline-primary border-white bodyText">Submit Joke</button>
        </div>
      </>
      )
  } else {
    return (
    <>
      <p className="text-center smallText">
        Think you're funnier then these 🤡s? Sign-up to post your own jokes and see how funny you really are
      </p>
      <div className="text-center">
        <div className="d-flex justify-content-evenly">
          <Link to="/login" className=""><button type="click"  className="btn btn-outline-primary bodyText border-white">Login</button></Link>
          <Link to="/signup"><button type="click"  className="btn btn-outline-primary bodyText border-white">Signup</button></Link>
        </div>
      </div>
    </>
    )
  }
}

  if (submitIsVisible === false) {
    return (
      <React.Fragment>
        {/* <div className="container"> */}
          <div className="row rowStyle ">
            <div className="col-3 tut">
              <UserJokes />
              <div style={submitStyle}>
                {submitOptions()}
              </div>
            </div>
            <div className="col-6 text-center">
              <div>
                <p className="output" onClick={() => {navigator.clipboard.writeText(displayJoke)}}>
                  {displayJoke}
                </p>
              </div>
              <button type="click" onClick={() => getJoke()} className="btn btn-lg btn-outline-primary mt-2 bodyText border-white">Get Joke</button>
              
            </div>
            <div className="col-3 d-flex  justify-content-center  ">
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
              <form  id="jokeForm" onSubmit={handleSave}>
                <textarea type="text" ref={jokeRef} placeholder="Enter your joke!" className="form-control" required/>
                <button className="btn btn-outline-primary bodyText border-white mt-5" type="submit">submit</button>
              </form>
            </div>
            <button type="click" onClick={() => changeView()} className="btn btn-outline-primary bodyText border-white mt-5">Back to laughing!</button>
          </div>
        {/* </div> */}
      </React.Fragment>
    )
  }

}