import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBDmeq-JDKVZRPYjBKdqGOqWuH2dykPD0c",
  authDomain: "to-do-03.firebaseapp.com",
  projectId: "to-do-03",
  storageBucket: "to-do-03.appspot.com",
  messagingSenderId: "169466756257",
  appId: "1:169466756257:web:0eaefeaffedb5532f484e0",
  measurementId: "G-Y65NEVHNHW"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP)
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);