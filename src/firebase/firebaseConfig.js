import firebase from "firebase/app";

import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";




const myFirebaseConfig = {
    apiKey: "AIzaSyAaND2n6FADHzjY0H_HdwClSzLjyvtC6ss",
    authDomain: "unhcr-vacation-system.firebaseapp.com",
    projectId: "unhcr-vacation-system",
    storageBucket: "unhcr-vacation-system.appspot.com",
    messagingSenderId: "1079093029102",
    appId: "1:1079093029102:web:c576207ad6d1689e732bff",
    measurementId: "G-YF1NKGB6TF"
  };


export const myFirebaseProject= firebase.initializeApp(myFirebaseConfig);
export const myFireauth = firebase.auth();
export const myFirestore = firebase.firestore();

export const  addInterpreterToDB = async (Interpreter)=>{
  const myQuryRefDocFromDB = firebase.firestore().collection('Interpreters').doc(Interpreter.gmail);
  const myQurySnapshDocOfDB = await myQuryRefDocFromDB.get();
  console.log(myQurySnapshDocOfDB.data().Interpreter.AL1.submitted)
  if(myQurySnapshDocOfDB.exists===false){
    await  myQuryRefDocFromDB.set({Interpreter})
  }else {
    console.log('the user already exist')
    await  myQuryRefDocFromDB.update({Interpreter})
    console.log('the intp got updated')
  }
}


