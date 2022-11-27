import React, {useState, useEffect} from 'react';
import { db, auth } from './firebase'
import Control from './components/Control';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { UserContext } from './components/UserContext';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserLogin from './components/UserLogin';
import UserSignUp from './components/UserSignUp';


function App() {

const [isAuthenticated, setIsAuthenticated] = useState(false);
const [userName, setUserName] = useState('mikey');
const [test, setTest] = useState('');

const grabObject = window.sessionStorage.getItem(sessionStorage.key(auth.currentUser));
const parseObject = JSON.parse(grabObject);

  useEffect(() => {
    const auth = getAuth();
  
    const listener = onAuthStateChanged(auth, async (user) => {
      setIsAuthenticated(!!user);
      
    });
  
    return () => {
      listener();
    };
  }, [auth.currentUser]);

  

  //sets username
  useEffect(() => {
    if (grabObject === null) {
    } else {
      setUserName(parseObject.email);
    }
  },[window.sessionStorage])

 console.log(isAuthenticated);

//   const [ authCheck, setAuthCheck ] = useState();

//   useEffect(() => {
//     if (auth.currentUser === null) {
//       setAuthCheck(null)
//     } else {
//       setAuthCheck(!null)
//     }
    
//   }, [auth.currentUser])

// function test() {
//   if (authCheck === null) {
//     console.log("not logged");
//   } else {
//     console.log("Logged");
//   }
// }
// test();

  return (
    <Router>
      <UserContext.Provider value={{userName, setUserName}}>
        <Routes>
    
      
          <Route path="/" element={<Control authCheck={isAuthenticated}/>} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/signup" element={<UserSignUp />} />
      

        </Routes>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
