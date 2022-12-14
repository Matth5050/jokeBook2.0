import React, { useContext } from "react";
import { signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { UserContext } from "./UserContext";



export default function Header() {

  const usernameButton = {
    borderColor: 'white'
  }
  
  const brand = {
    textDecoration: "none"
  }

const { submitIsVisible, setSubmitIsVisible } = useContext(UserContext);
const navigate = useNavigate();

function doSignOut() {
  signOut(auth)
    .then(function() {
      navigate('/login');
    }).catch(function(error) {
      
    });
}

const returnSplash = () => {
  setSubmitIsVisible(false);
}

  if (auth.currentUser == null) {
    return (
      <React.Fragment>
        <nav class="navbar navbar-expand-lg header">
          <div class="container-fluid">
            <p className="navbar-brand title"><Link to="/" className="title" onClick={returnSplash} style={brand}>JokeBook</Link></p>
            <div class="navbar-nav bodyText">
              <a href="https://chrome.google.com/webstore/detail/jokebook/nlhdhpfhfopniaajbgfichnlpbnndhfk"><button className="border border-0 btn btn-outline-primary bodyText mx-2">Get the Chrome extension here!</button></a>
              <Link className="header" to="/login"><button className="nav-item btn btn-outline-primary bodyText mx-1" style={usernameButton}>Login</button></Link>
              <Link className="header" to="/signup"><button className="nav-item btn btn-outline-primary mx-2 bodyText" style={usernameButton}>Signup</button></Link>
            </div>
          </div>
        </nav>
      </React.Fragment>
    )
  } else {
    return (
    <React.Fragment>
        <nav class="navbar navbar-expand-lg">
          <div class="container-fluid">
            <p className="title navbar-brand " onClick={returnSplash}>JokeBook</p>
            <div class="navbar-nav mb-3">
              <a href="https://chrome.google.com/webstore/detail/jokebook/nlhdhpfhfopniaajbgfichnlpbnndhfk"><button className=" border border-0 nav-item btn btn-outline-primary bodyText mx-2">Get the Chrome extension here!</button></a>
              <button class="nav-item btn btn-outline-primary border-white bodyText mx-1"><strong>{auth.currentUser.displayName}</strong></button>
              <button type="click" onClick={() => doSignOut()} className="btn btn-outline-primary mx-2 border-white bodyText">sign out</button>
            </div>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}
