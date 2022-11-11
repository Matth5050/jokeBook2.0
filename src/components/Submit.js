// import React, { useRef, useContext } from "react";
// import  { db } from '../firebase';
// import { collection, setDoc } from 'firebase/firestore';
// import { v4 } from 'uuid';
// import { UserContext } from "./UserContext";

// export default function Submit() {

// const {userName, setUserName} = useContext(UserContext);

// const jokeRef = useRef();
// const ref = collection(db, "userJokes")

// // const handleSave = async (e) => {
// //   e.preventDefault();

// //   let data = {
    

// //   };

// //   try{
// //     setDoc(doc(db, 'userJokes', userName), {
// //       joke: jokeRef.current.value,
// //       user: userName,
// //       id: v4()
// //     })
// //   } catch (e) {
// //     console.log(e);
// //   }
// // }


//   return (
//     <React.Fragment>
//       <div>
//       <form onSubmit={submitJoke}>
//         <input type="text" ref={jokeRef} placeholder="your joke here!" />
//         <button type="submit">submit</button>
//       </form>
//     </div>
//     </React.Fragment>
//   )
// }