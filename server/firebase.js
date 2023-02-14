// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// const { initializeApp } = require("firebase/app");
// const { getStorage } = require("firebase/storage");
const {initializeApp} =require("@firebase/app");
const {getStorage} = require("@firebase/storage");


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-h2vV2-5SzxjDLOBmvLtP0cFMdQIxM-Q",
  authDomain: "pg-allocation.firebaseapp.com",
  projectId: "pg-allocation",
  storageBucket: "pg-allocation.appspot.com",
  messagingSenderId: "384949312403",
  appId: "1:384949312403:web:63933fbc324f29f169e666",
  measurementId: "G-V88N2HQH4P"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
module.exports = getStorage(firebaseApp)