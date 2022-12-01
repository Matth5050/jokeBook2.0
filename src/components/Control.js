import React, { useEffect, useState } from "react";
import { db, auth } from './../firebase.js'
import Header from './Header';
import Jokes from './Jokes';
import UserSignUpIn from "./UserLogin.js";

export default function Control(props) {

const authCheck = props.authCheck
console.log(authCheck);
  // if (auth.currentUser === null) {
    return (
      <React.Fragment>
        <Header />
        <Jokes authCheck={authCheck}/>
        {/* <Submit /> */}
      </React.Fragment>
    )
  }
// }

