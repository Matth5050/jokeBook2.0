import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from './UserContext.js';
import  { db } from './../firebase.js';
import { collection, onSnapshot } from 'firebase/firestore';

function RecentJokes () {

  useEffect(() => {
    const unSubscribe = onSnapshot(
      collection(db, "accounts"),
      (collectionSnapshot) => {
        const accounts = [];
        collectionSnapshot.forEach((doc) => {
          accounts.push({
            email: doc.data().email,
            userName: doc.data().userName,
            date: doc.data().date,
            win: doc.data().win,
            loss: doc.data().loss,
            id: doc.id
          });
        });
        const valuesAsceSorted = Object.values(accounts).sort(function(a,b){return b.win - a.win}).slice(0,5);
        setMainAccountsList(valuesAsceSorted);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => unSubscribe();
  }, []);


}
