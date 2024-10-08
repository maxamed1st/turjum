import { logErr } from "@/utils/logger";
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";

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
export const storage = getStorage(firebase);


type uploadDocdocumentProps = {
  currentUser: any,
  uri: string,
  title?: string,
  content?: any,
}

//Upload a document to storage
export async function uploadDocdocument({ currentUser, uri, title }: uploadDocdocumentProps) {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();
    const newUri = `original/${title}`;

    const storageRef = ref(storage, `users/${currentUser?.uid}/${newUri}`);
    const res = await uploadBytes(storageRef, blob);
    const path = `gs://turjum-cf6e9.appspot.com/${res.ref.fullPath}`;

    return path;
  }

  catch (err) {
    logErr("translate", err);
    return err;
  }
}
