// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCouHPfgTiB3BEU60j9KnN0BLkyKMA_lpw",
  authDomain: "sincerely-afd59.firebaseapp.com",
  projectId: "sincerely-afd59",
  storageBucket: "sincerely-afd59.appspot.com",
  messagingSenderId: "1071970983585",
  appId: "1:1071970983585:web:ba6a8dc8ee05508b9e9ae0",
  measurementId: "G-GMP3ZQVYL9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);