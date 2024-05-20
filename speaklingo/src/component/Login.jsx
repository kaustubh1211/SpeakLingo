import React, { useState } from "react";
import { auth, signInWithGoogle } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, NavLink, useNavigate } from "react-router-dom";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorHandle, setErrorHandle] = useState("");
  const navigate = useNavigate();
  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/Home");
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setErrorHandle(errorCode, errorMessage);
      });
  };
  const logGoogleUser = async () => {
    try {
      const result = await signInWithGoogle();
      // Handle the result here (e.g., user info, token)
      console.log(result);
      navigate("/Home");
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };
  return (
    <div>
      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden animate-fade-in">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
          <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
            Login
          </h1>
          <form className="mt-6">
            <div className="mb-2">
              <label
                for="email"
                className="block text-sm font-semibold text-gray-800"
              >
                Email
              </label>
              <input
                type="email"
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label
                for="password"
                className="block text-sm font-semibold text-gray-800"
              >
                Password
              </label>
              <input
                type="password"
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <p className=" text-red-500 text-sm ">{errorHandle}</p>
            <a href="#" className="text-xs text-purple-600 hover:underline">
              Forget Password?
            </a>
            <div className="mt-6">
              <button
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
                onClick={onLogin}
              >
                Login
              </button>
            </div>

            <button
              onClick={logGoogleUser}
              className="flex flex-col items-center justify-center m-0 text-center w-full py-2 bg text-white rounded-md  focus:outline-none "
            >
              <span className=" text-black">Sign In With Google</span>
              <img
                src="Icon/google_300221.png"
                className="w-10 mt-2"
                alt="Google Icon"
              />
            </button>
          </form>

          <p className="mt-8 text-xs font-light text-center text-gray-700">
            {" "}
            Don't have an account?{" "}
            <Link
              to="/Signup"
              className="font-medium text-purple-600 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
