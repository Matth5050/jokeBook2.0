import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import  { auth, db } from './../firebase.js';
import SubmittedJokes from './SubmittedJokes.js';

function UserJokes() {

  const [userJokesList, setUserJokesList] = useState(null);
  const [jokesLoaded, setJokesLoaded] = useState(false);
  const [karmaList, setKarmaList] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const grabObject = window.sessionStorage.getItem(sessionStorage.key(auth.currentUser));
  const parseObject = JSON.parse(grabObject);

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

  // gets jokes the current user has liked
  useEffect(() => {
    const auth = getAuth();
    const listener = onAuthStateChanged(auth, async (user) => {
      const jokeKarma = [];
        async function getEmail() {
          const collectionRef = collection(db, "users", user.email, "karma");
          const unSubscribe = onSnapshot(collectionRef, (querySnapshot) => {
          querySnapshot.forEach((doc) => {
            jokeKarma.push({
              id: doc.data().id,
              jokeId: doc.data().jokeId,
              karma: doc.data().karma,
              votedUser: doc.data().votedUser,
            })
          });
        })
          return () => unSubscribe();
        }
        getEmail();
        setKarmaList(jokeKarma);
        setIsLoaded(true);
    });
    return () => {
      listener();
    };
  }, [auth.currentUser]);

  let test;       
  if (userJokesList && karmaList) {
    test = <>
            {Object.values(userJokesList).map((entry) => (
            <SubmittedJokes
              joke = {entry.joke}
              userName = {entry.userName}
              user = {entry.user}
              voteTally = {entry.voteTally}
              id = {entry.id}
              karmaList = {karmaList}
            />
          ))}
          </>
        }

  return (
    <React.Fragment>
    <div className=" ml-5 bg-transparent">
      <table className="scrollable">
        <thead className='border-bottom border-white bodyText fs-4 text-center'>Recent Jokes</thead>
        <tbody className='ml-5 bg-transparent'>
          { (isLoaded && jokesLoaded) ? test : null}
        </tbody>
      </table>
    </div>
  </React.Fragment>
  );
}

export default UserJokes;
