import React, { useState, useRef, useContext } from "react";
import { collection, setDoc, doc, addDoc } from 'firebase/firestore';
import  { db } from './../firebase';
import jokes from '../data/cleanJokes.json';
import { v4 } from 'uuid';
import { UserContext } from "./UserContext";


export default function Jokes() {

  const { userName, setUserName} = useContext(UserContext);
  const jokeRef = useRef();
  // const [joke, setJoke] = useState();

  // useEffect(() => { 
  //   const unSubscribe = onSnapshot(
  //     collection(db, "jokes"),
  //     (collectionSnapshot) => {
  //       const jokes = [];
  //       collectionSnapshot.forEach((doc) => {
  //         jokes.push({
  //           id: doc.data().ID,
  //           joke: doc.data().Joke,
  //         });
  //       });
  //       setJoke(jokes);
  //     },
  //     (error) => {
  //       console.log("error with the jokes!")
  //     }
  //   );
  //   return () => unSubscribe();
  // }, []);

  // console.log(joke);

  const submitStyle = {
    marginTop: 120
  }
  const inputStyle = {
    marginTop: 210
  }

  const [displayJoke, setDisplayJoke] = useState('Click for a joke!');
  const [submitIsVisible, setSubmitIsVisible] = useState(false);

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

  function clearField() {
    document.getElementById("jokeForm").reset();
  }

  //adds joke to db

  const ref = collection(db, "userJokes")

  const handleSave = async (e) => {
    e.preventDefault();
    
    let data = {
      joke: jokeRef.current.value,
      user: userName,
      id: v4()
    };

    try{
      addDoc(ref, data);
      document.getElementById("jokeForm").reset();
    } catch (e) {
      console.log(e);
    }
  }


function submitJoke() {
  setDoc(doc(db, 'userJokes', userName),{
    joke: jokeRef.current.value,
    user: userName,
    id: v4()
  })
}

  if (submitIsVisible === false) {
    return (
      <React.Fragment>
        <div className="full-screen d-flex align-items-center justify-content-center align-content-center text-center flex-column">
          <div>
            <p>
              {displayJoke}
            </p>
          </div>
          <button type="click" onClick={() => getJoke()} className="btn btn-primary">Get Joke</button>
          <div style={submitStyle}>
            <p>
              Think you're funny? Submit you're own jokes here and see how the crowd feels!
            </p>
            <button type="click" onClick={() => changeView()} className="btn btn-primary">Submit Joke</button>
          </div>
        </div>
      </React.Fragment>
    )
  } else {
    return (
      <React.Fragment>
        <div className="full-screen d-flex align-items-center justify-content-center align-content-center text-center flex-column" style={inputStyle}>
          <div>
            <form id="jokeForm" onSubmit={handleSave}>
              <input type="text" ref={jokeRef} placeholder="Enter your joke!"/>
              <button className="btn btn-primary" type="submit">submit</button>
            </form>
          </div>
          <button type="click" onClick={() => changeView()} className="btn btn-primary">Back to laughing!</button>
        </div>
      </React.Fragment>
    )
  }

}