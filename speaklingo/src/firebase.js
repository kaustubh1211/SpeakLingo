// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import{getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB17WiO8PQ7m69khqp47m8pJJ2DRug5f_U",
  authDomain: "speaklingo-7fdcd.firebaseapp.com",
  projectId: "speaklingo-7fdcd",
  storageBucket: "speaklingo-7fdcd.appspot.com",
  messagingSenderId: "250808822776",
  appId: "1:250808822776:web:593b524977bd9e19b5040d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);