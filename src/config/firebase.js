import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCvY0xrIQWlhQ8D1HyeYkHbbkdAldag7wA",
  authDomain: "hangman-65c77.firebaseapp.com",
  projectId: "hangman-65c77",
  storageBucket: "hangman-65c77.appspot.com",
  messagingSenderId: "732593172327",
  appId: "1:732593172327:web:dd24b442d1dbab9d6209c2",
  measurementId: "G-N3J92S93GB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
