// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB17WiO8PQ7m69khqp47m8pJJ2DRug5f_U",
  authDomain: "speaklingo-7fdcd.firebaseapp.com",
  projectId: "speaklingo-7fdcd",
  storageBucket: "speaklingo-7fdcd.appspot.com",
  messagingSenderId: "250808822776",
  appId: "1:250808822776:web:593b524977bd9e19b5040d"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => signInWithPopup(auth, provider);
export { auth };
