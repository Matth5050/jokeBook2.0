import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';
import  { auth, db } from './../firebase.js';

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

  //handles upvotes/downvotes
  const voteFunction = () => {
    if (auth.currentUser == null) {
      alert("You must be logged in to vote! So much for democracy :(")
    } else {
      console.log("hello");
    }
  }


let test;
if (userJokesList) {

  test = <>
          {Object.values(userJokesList).map((entry) => (
          <>
            <tr >
              <td className='text-white'><strong className='userJokeText'>{entry.joke}</strong> - {entry.userName}  
                <svg onClick={voteFunction} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-emoji-laughing" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                  <path d="M12.331 9.5a1 1 0 0 1 0 1A4.998 4.998 0 0 1 8 13a4.998 4.998 0 0 1-4.33-2.5A1 1 0 0 1 4.535 9h6.93a1 1 0 0 1 .866.5zM7 6.5c0 .828-.448 0-1 0s-1 .828-1 0S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 0-1 0s-1 .828-1 0S9.448 5 10 5s1 .672 1 1.5z"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-emoji-expressionless" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                  <path d="M4 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm5 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z"/>
                </svg>
              </td>
            </tr>
          </>
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
