import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDzOcLIe3zKbwXkdapZo6HsAjVfao2idyU",
  authDomain: "jokebook-e7404.firebaseapp.com",
  projectId: "jokebook-e7404",
  storageBucket: "jokebook-e7404.appspot.com",
  messagingSenderId: "553927241129",
  appId: "1:553927241129:web:433a66306608e23217a8b8",
  measurementId: "G-0ZB1XM11E7"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
// export const firestore = getFirestore(app);
const analytics = getAnalytics(app);

export { db, app, auth };
