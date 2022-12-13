import React, { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import  { db } from './../firebase.js';

function Leaderboard() {

  const [userList, setUserList] = useState();
  const [usersLoaded, setUsersLoaded] = useState(false);

  useEffect(() => { 
    const unSubscribe = onSnapshot(
      collection(db, "users"),
      (collectionSnapshot) => {
        const users = [];
        collectionSnapshot.forEach((doc) => {
          users.push({
            voteCount: doc.data().voteCount,
            user: doc.data().user,
            id: doc.data().id,
          });
        });
        const valuesAsceSorted = Object.values(users).sort(function(a,b){return b.voteCount - a.voteCount}).slice(0,5);
        setUserList(valuesAsceSorted);
        setUsersLoaded(true);
      },
      (error) => {
        console.log("error")
      }
    );
    return () => unSubscribe();
  }, []);


  

let test;
if (userList) {

  test = <>
          {Object.values(userList).map((entry) => (
          <>
            <tr >
              <td className='text-white'><strong className='userJokeText'>{entry.voteCount}</strong> - {entry.user}</td>
            </tr>
          </>
        ))}
        </>
}

  return (
    <React.Fragment>
    <div className="bg-transparent">
      <table className="scrollable">
        <thead className='border-bottom border-white bodyText fs-4'>Most funny list</thead>
        <tbody>
          {usersLoaded ? test : null}
        </tbody>
      </table>
    </div>
  </React.Fragment>
  );
}

export default Leaderboard;
