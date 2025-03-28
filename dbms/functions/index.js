/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// Import necessary functions and add requirements as needed
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// The Cloud Functions for Firebase SDK to create Cloud Functions and triggers.
import {logger} from "firebase-functions";
import {onRequest} from "firebase-functions/v2/https";

// Your web app's Firebase configuration
import {} from 'dotenv/config'
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

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

exports.helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        return userCredential.user.getIdToken(); // <- Send this token to backend
    })
    .then((idToken) => {
        // Send idToken to your backend via request header
    });

window.login = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const idToken = await userCredential.user.getIdToken();
    
    const response = await fetch("/protected", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${idToken}`
      }
    });

    const result = await response.text();
    alert(result);
  } catch (err) {
    console.error(err);
    alert("Login failed");
  }
};
