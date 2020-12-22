// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
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

  firebase.initializeApp(myFirebaseConfig);