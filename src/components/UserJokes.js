import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';
import  { auth, db } from './../firebase.js';
import SubmittedJokes from './SubmittedJokes.js';

function UserJokes() {

  const [userJokesList, setUserJokesList] = useState();
  const [jokesLoaded, setJokesLoaded] = useState(false);

  //gets jokes from db
  useEffect(() => { 
    const unSubscribe = onSnapshot(
      collection(db, "userJokes"),
      (collectionSnapshot) => {
        const jokes = [];
        collectionSnapshot.forEach((doc) => {
          jokes.push({
            joke: doc.data().joke,
            userName: doc.data().userName,
            user: doc.data().user,
            voteTally: doc.data().voteTally,
            id: doc.data().id,
          });
        });
        setUserJokesList(jokes);
        setJokesLoaded(true);
      },
      (error) => {
        console.log("error")
      }
    );
    return () => unSubscribe();
  }, []);

 
let test;
if (userJokesList) {

  test = <>
          {Object.values(userJokesList).map((entry) => (
          <SubmittedJokes
            joke = {entry.joke}
            userName = {entry.userName}
            user = {entry.user}
            voteTally = {entry.voteTally}
            id = {entry.id}
          />
        ))}
        </>
}

  return (
    <React.Fragment>
    <div className=" ml-5 bg-transparent">
      <table className="scrollable">
        <thead className='border-bottom border-white bodyText fs-4 text-center'>Recent Jokes</thead>
        <tbody>
          {jokesLoaded ? test : null}
        </tbody>
      </table>
    </div>
  </React.Fragment>
  );
}

export default UserJokes;
