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
  updateDoc,
  orderBy,
} from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

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
const storage = getStorage();

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
  updateDoc,
  orderBy ,
  storage,
  getStorage, ref, uploadBytesResumable, getDownloadURL 
};
