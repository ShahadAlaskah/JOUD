// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgc4JDpW_DGjnuP_OwPFJjILI51ZOx3rw",
  authDomain: "joud-c086e.firebaseapp.com",
  databaseURL: "https://joud-c086e-default-rtdb.firebaseio.com",
  projectId: "joud-c086e",
  storageBucket: "joud-c086e.appspot.com",
  messagingSenderId: "43995250095",
  appId: "1:43995250095:web:a9845835915056da71035a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
