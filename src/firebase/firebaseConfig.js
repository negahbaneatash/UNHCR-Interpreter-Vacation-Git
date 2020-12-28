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


export const  getAllInterpreters = async ()=>{
  const myQuryRefCollectionFromDB = firebase.firestore().collection('Interpreters')
  const mySnapshCollectionOfDB = await myQuryRefCollectionFromDB.get();
  mySnapshCollectionOfDB.docs.map(doc=>{
    console.log('from get all')
    console.log(doc.data())
  })
  const myTest = await firebase.firestore().collection("Interpreters").doc('sami@gmail.com').collection('Jan-2021').get()
  myTest.docs.map((doc)=>{
    console.log(doc.data())
  })
  
  
}