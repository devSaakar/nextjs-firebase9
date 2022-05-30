// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0Rh54zgssFIfXawsJhwKOEPfsKWhmn-A",
  authDomain: "nextjs-firebase-6dda9.firebaseapp.com",
  projectId: "nextjs-firebase-6dda9",
  storageBucket: "nextjs-firebase-6dda9.appspot.com",
  messagingSenderId: "417742580733",
  appId: "1:417742580733:web:46a36a74a54ba451414794"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider()

const db = getFirestore()


export {db,auth,provider}