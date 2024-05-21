// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth/cordova";
import { getFirestore,doc,setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSJEwBye2yl3CoYF-ReEiVOhWGnRblyJ8",
  authDomain: "financely-d8c25.firebaseapp.com",
  projectId: "financely-d8c25",
  storageBucket: "financely-d8c25.appspot.com",
  messagingSenderId: "803831417249",
  appId: "1:803831417249:web:fd809d0a673485531a63e0"
};
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//   storageBucket: "financely-d8c25.appspot.com",
//   messagingSenderId: "803831417249",
//   appId: import.meta.env.VITE_FIREBASE_APP_ID
// };



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db=getFirestore(app)
const auth=getAuth(app)
const provider= new GoogleAuthProvider()
 export{db,auth,provider,doc,setDoc}
