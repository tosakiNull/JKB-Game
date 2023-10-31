// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase  } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYuZdYk17901177ZFdzV4J9dsTRtFqGUY",
  authDomain: "jkb-game.firebaseapp.com",
  databaseURL: "https://jkb-game-default-rtdb.firebaseio.com",
  projectId: "jkb-game",
  storageBucket: "jkb-game.appspot.com",
  messagingSenderId: "786092248225",
  appId: "1:786092248225:web:b5759b7d81b73b3cb6f4e0",
  measurementId: "G-RFSVYFPNJE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const dataBase = getDatabase(app);


