// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
  } from "firebase/auth";
  
  import {
    getFirestore,
    collection,
    addDoc,
    doc,
    setDoc,
  } from "firebase/firestore";
  
  import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDDHDD8qrfqDWv3PZP48o3x4YWWklzAjKc",
  authDomain: "ubercloneapp-86b44.firebaseapp.com",
  projectId: "ubercloneapp-86b44",
  storageBucket: "ubercloneapp-86b44.appspot.com",
  messagingSenderId: "835729081235",
  appId: "1:835729081235:web:aa02d6dd2a44668b17de66",
  measurementId: "G-T6DFCTRRCE"
};

// Initialize Firebase

initializeApp(firebaseConfig)

const auth = getAuth()
const db = getFirestore()
const storage = getStorage()