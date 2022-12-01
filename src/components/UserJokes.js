import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';
import  { db } from './../firebase.js';

function UserJokes() {

  const [userJokesList, setUserJokesList] = useState();
  const [jokesLoaded, setJokesLoaded] = useState(false);

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

  console.log(userJokesList)
  

let test;
if (userJokesList) {

  test = <>
          {Object.values(userJokesList).map((entry) => (
          <>
            <tr>
              <td className='text-body'><strong>{entry.joke}</strong> - {entry.userName}</td>
            </tr>
          </>
        ))}
        </>
}

  return (
    <React.Fragment>
    <div className=" ml-5 bg-transparent">
      <table className="scrollable">
        <thead className='border-bottom border-dark'>Recent Jokes</thead>
        <tbody>
          {jokesLoaded ? test : null}
        </tbody>
      </table>
    </div>
  </React.Fragment>
  );
}

export default UserJokes;
