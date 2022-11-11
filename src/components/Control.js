import React, { useEffect, useState } from "react";
import { db, auth } from './../firebase.js'
import Header from './Header';
import Jokes from './Jokes';
import UserSignUpIn from "./UserSignUpIn.js";

export default function Control() {

//   const [ authCheck, setAuthCheck ] = useState();

//   useEffect(() => {
//     setAuthCheck(auth.currentUser)
//   }, [auth.currentUser])

// function test() {
//   if (authCheck === null) {
//     console.log("not logged");
//   } else {
//     console.log("Logged");
//   }
// }
// test();

  // if (auth.currentUser === null) {
    return (
      <React.Fragment>
        <Header />
        <Jokes />
        {/* <Submit /> */}
        <UserSignUpIn />
      </React.Fragment>
    )
  }
// }

