import React from "react";
import { Link } from "react-router-dom";
import "./Ehome.css";
export default function () {
  return (
    <div>
      <nav class="bg-gray-100 shadow-sm">
        <div class="max-w-8x mx-auto px-4">
          <div class="flex justify-between">
            <div class="flex space-x-4">
              <div>
                <a
                  href="#"
                  class="flex items-center py-5 px-2 text-gray-700 hover:text-gray-900"
                >
                  <svg
                    class="h-6 w-6 mr-1 text-blue-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                  <Link to="/Home">
                    <span class="font-bold">SpeakLingo</span>
                  </Link>
                </a>
              </div>

              <div class="hidden md:flex items-center space-x-1">
                <a href="#" class="py-5 px-3 text-gray-700 hover:text-gray-900">
                  Features
                </a>
                <a href="#" class="py-5 px-3 text-gray-700 hover:text-gray-900">
                  Pricing
                </a>
              </div>
            </div>
            <div class="hidden md:flex items-center space-x-1">
              <span class="navbar-text ml-3">Profile</span>
              <i class="fa-solid fa-user"></i>
              <img src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar" class="avatar"/> 
              </div>

            <div class="md:hidden flex items-center">
              <button class="mobile-menu-button">
                <svg
                  class="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div class="mobile-menu hidden md:hidden">
          <a href="#" class="block py-2 px-4 text-sm hover:bg-gray-200">
            Features
          </a>
          <a href="#" class="block py-2 px-4 text-sm hover:bg-gray-200">
            Pricing
          </a>
        </div>
      </nav>
      <div>
        <ul class="cards animate-fade-in">
          <li class="cards-item hover:shadow-2xl">
            <Link to="/English">
              <div class="card ">
                <div class=" card-image1">
                  <img
                    src="/background-images/speak.jpg"
                    className="card-image card-image1"
                  ></img>
                </div>

                <div class="card-content">
                  <div class="card-title">Speak and learn</div>
                  <p class="card-text">
                  Learn English using speech recognition.
                  </p>
                  {/* <a href="#" class="cards-button button-block"><span>Go</span></a> */}
                </div>
              </div>
            </Link>
          </li>
          <li class="cards-item hover:shadow-2xl">
            <Link to="/Challenge">
              <div class="card">
                <div class=" card-image1"> 
                  <img
                    src="/background-images/challenge.jpg"
                    className="card-image"
                  ></img>
                </div>
                <div class="card-content">
                  <div class="card-title">Challenge</div>
                  <p class="card-text">
                  Learn a language with a friend
                  </p>
                  {/* <a href="#" class="cards-button button-block"><span class="button-title">Go</span></a>  */}
                </div>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
