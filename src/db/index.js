import { initializeApp } from "firebase/app";
import {getAuth , createUserWithEmailAndPassword ,signInWithEmailAndPassword , onAuthStateChanged ,signOut } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyAktS2Z1YW19zC6DzgaulzvJBC-lIKfdqo",
    authDomain: "login-signup-form-d1674.firebaseapp.com",
    databaseURL: "https://login-signup-form-d1674-default-rtdb.firebaseio.com",
    projectId: "login-signup-form-d1674",
    storageBucket: "login-signup-form-d1674.appspot.com",
    messagingSenderId: "487043740599",
    appId: "1:487043740599:web:770a92712a30b59c81ae32"
  };
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)


export {
    app,
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut 
}