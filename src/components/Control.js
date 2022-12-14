import React from "react";
import Header from './Header';
import Jokes from './Jokes';


export default function Control(props) {

const authCheck = props.authCheck

    return (
      <React.Fragment>
        <Header />
        <Jokes authCheck={authCheck}/>
      </React.Fragment>
    )
  }


