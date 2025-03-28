
import './App.css'
import DndBoard from './Components/DndBoard'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
require('dotenv').config();

const FIREBASE_APIKEY = process.env.API_KEY;

const firebaseConfig = {
  apiKey: FIREBASE_APIKEY,
  authDomain: "dbms-wpi-team8.firebaseapp.com",
  projectId: "dbms-wpi-team8",
  storageBucket: "dbms-wpi-team8.firebasestorage.app",
  messagingSenderId: "718872483196",
  appId: "1:718872483196:web:a87cbbdaf48fdd1a7800f9",
  measurementId: "G-E5ECVGZN7G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    return userCredential.user.getIdToken(); // <- Send this token to backend
  })
  .then((idToken) => {
    // Send idToken to your backend via request header
  });

function App() {


  return (
    <>
    <div className='text-amber-300'>
    <DndBoard />
    </div>
    </>
  )
}

export default App
