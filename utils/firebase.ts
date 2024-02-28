import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {

  apiKey: "AIzaSyANBrd_iUfb49EZ9VeThupptkqPHQPqf5o",

  authDomain: "turjum-cf6e9.firebaseapp.com",

  projectId: "turjum-cf6e9",

  storageBucket: "turjum-cf6e9.appspot.com",

  messagingSenderId: "725718374058",

  appId: "1:725718374058:web:50e19b72d07526150922d3"

};


const firebase = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

export const auth = getAuth(firebase);
export const db = getFirestore(firebase);

