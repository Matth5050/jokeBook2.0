import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, doc, updateDoc, getDocs, setDoc, increment } from 'firebase/firestore';
import  { auth, db } from './../firebase.js';
import { v4 } from 'uuid';

function SubmittedJokes(props) {

  const [karmaStatus, setKarmaStatus ] = useState(null);
  const [karmaList, setKarmaList] = useState(null);

  // useEffect(() => { 
  //   const unSubscribe = onSnapshot(
  //     collection(db, "users" , auth.currentUser.email, "karma"),
  //     (collectionSnapshot) => {
  //       const karma = [];
  //       collectionSnapshot.forEach((doc) => {
  //         karma.push({
  //           user: doc.data().user,
  //           karma: doc.data(),karma,
  //           id: doc.data().id,
  //         });
  //       });
   
  //       setKarmaList(karmaList);
  //       // setUsersLoaded(true);
  //     },
  //     (error) => {
  //       console.log("error")
  //     }
  //   );
  //   return () => unSubscribe();
  // }, []);

  useEffect(() => {
    const collectionRef = collection(db, "users", auth.currentUser.email, "karma");
    const jokeKarma = [];
    onSnapshot(collectionRef, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // console.log("Id: ", doc.id, "Data: ", doc.data());
        jokeKarma.push({
          id: doc.data().id,
          jokeId: doc.data().jokeId,
          karma: doc.data().karma,
          votedUser: doc.data().votedUser,
        })
      });
    });
    const bart = async () => {
      await setKarmaList(jokeKarma)
      await karmaCheck();
    }
   bart();
  }, [])

  console.log(karmaStatus);
  console.log(karmaList);





 
  

  
    const karmaCheck = async () => {

      for (var i = 0; i < karmaList.length; i++) {
        if (karmaList[i].jokeId == props.id) {
          if (karmaList[i].karma === true) {
           await setKarmaStatus(true);
          } else {
           await setKarmaStatus(false);
          }
        } else {
         await setKarmaStatus(null);
        }
      }
    }



 //handles upvotes/downvotes
  const upVoteFunction = async () => {
    const voteRef = doc(db, "users", props.user);
    const jokeRef = doc(db, "userJokes", props.user);
    if (auth.currentUser == null) {
      alert("You must be logged in to vote! So much for democracy :(");
    } else {
      await setDoc(doc(db, "users", auth.currentUser.email, "karma", props.id), {
        votedUser: auth.currentUser.email,
        karma: true,
        jokeId: props.id,
        id: v4()
      })
      await updateDoc(voteRef, {voteCount: increment(1)});
      await updateDoc(jokeRef, {voteTally: increment(1)});
  }}

  const downVoteFunction = async () => {
    const voteRef = doc(db, "users", props.user);
    const jokeRef = doc(db, "userJokes", props.user);
    if (auth.currentUser == null) {
      alert("You must be logged in to vote! So much for democracy :(");
    } else {
      await setDoc(doc(db, "users", auth.currentUser.email, "karma", props.id), {
        votedUser: auth.currentUser.email,
        karma: false,
        id: v4()
      })
      await updateDoc(voteRef, {voteCount: increment(-1)});
      await updateDoc(jokeRef, {voteTally: increment(-1)});
      console.log("upvote");
  }}

  return (
    <React.Fragment>
    <div className=" ml-5 bg-transparent">
      <tr >
        <td className='text-white'><strong className='userJokeText'>{props.joke}</strong> - {props.userName}  
          <svg onClick={upVoteFunction} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-emoji-laughing" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="M12.331 9.5a1 1 0 0 1 0 1A4.998 4.998 0 0 1 8 13a4.998 4.998 0 0 1-4.33-2.5A1 1 0 0 1 4.535 9h6.93a1 1 0 0 1 .866.5zM7 6.5c0 .828-.448 0-1 0s-1 .828-1 0S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 0-1 0s-1 .828-1 0S9.448 5 10 5s1 .672 1 1.5z"/>
          </svg>
          <svg onClick={downVoteFunction} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-emoji-expressionless" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="M4 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm5 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z"/>
          </svg>
          <span className=' tally'>{props.voteTally}</span>
        </td>
      </tr>
    </div>
  </React.Fragment>
  );
}

export default SubmittedJokes;
