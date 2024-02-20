import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getFirestore,
  addDoc,
  serverTimestamp,
  collection,
  query,
  where,
  onSnapshot,
  getDocs,
} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBQ4kGo7ysAnwrwptf7b3-NpZYWQm6jqSw",
  authDomain: "epxo-react.firebaseapp.com",
  databaseURL: "https://epxo-react-default-rtdb.firebaseio.com",
  projectId: "epxo-react",
  storageBucket: "epxo-react.appspot.com",
  messagingSenderId: "905137103932",
  appId: "1:905137103932:web:1fb5e322c70645e7fa4f39",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {
  app,
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  db,
  doc,
  setDoc,
  addDoc,
  serverTimestamp,
  collection,
  query,
  where,
  onSnapshot,
  getDocs,
};
