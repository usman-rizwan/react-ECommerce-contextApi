import { initializeApp } from "firebase/app";
import {getAuth , createUserWithEmailAndPassword ,signInWithEmailAndPassword , onAuthStateChanged ,signOut } from "firebase/auth"

const firebaseConfig = {

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
