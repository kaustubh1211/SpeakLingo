import React from "react";
import { Link } from "react-router-dom";

export default function () {
  return (
    <div>
      <div className=" min-h-screen">
        {/* <nav className="bg-[#e2d48d] text-red-600 py-2">
          <div className="container mx-auto flex justify-between items-center">
            <Link to="/Home">
              <div className="text-2xl font-bold">SpeakLingo</div>
            </Link>
            <div className="space-x-4">
              <Link to="#" className="text-red-600">
                Login
              </Link>
              <Link to="#" className="text-red-600">
                Logout
              </Link>
            </div>
          </div>
        </nav> */}
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
                    <Link to='/Home'> 
                    <span class="font-bold">SpeakLingo</span>
                    </Link>
                  </a>
                </div>

                <div class="hidden md:flex items-center space-x-1">
                  <a
                    href="#"
                    class="py-5 px-3 text-gray-700 hover:text-gray-900"
                  >
                    Features
                  </a>
                  <a
                    href="#"
                    class="py-5 px-3 text-gray-700 hover:text-gray-900"
                  >
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

        <div className="container mx-auto p-8 text-center  ">
          <h2 className="text-6xl font-bold text-[#356859] mb-2 animate-fade-in  ">
            Welcome to SpeakLingo
          </h2>
          <h5 className="text-2xl font-medium text-[#528877] mb-2 animate-fade-in">
          Modern Approaches to Language Learning
          </h5>
          <div className="relative">
            <img
              src="/background-images/background.jpg"
              alt="background"
              className="mx-auto w-[1200px] h-96 mb-3 rounded animate-fade-in shadow-md shadow-slate-400 "
            />
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center">
              <h4 className="text-3xl font-medium text-green-800 mb-4 animate-fade-in">
                Select a language to learn
              </h4>
            </div>
          </div>
          <div className="flex flex-wrap justify-center space-x-4 ">
            <Link
              to="/Ehome"
              className="bg-d35252 text-white border-none rounded-md px-4 py-2 mx-2 cursor-pointer transition duration-300 bg-[#d35252] animate-fade-in shadow-md shadow-[#592d2d]"
            >
              English
            </Link>
            <button className="bg-d35252 text-white border-none rounded-md px-4 py-2 mx-2 cursor-pointer transition duration-300 bg-[#d35252]  animate-fade-in shadow-md shadow-[#592d2d]">
              Hindi
            </button>
            <button className="bg-d35252 text-white border-none rounded-md px-4 py-2 mx-2 cursor-pointer transition duration-300 bg-[#d35252]  animate-fade-in shadow-md shadow-[#592d2d]">
              Japanese
            </button>
            <button className="bg-d35252 text-white border-none rounded-md px-4 py-2 mx-2 cursor-pointer transition duration-300 bg-[#d35252]  animate-fade-in shadow-md shadow-[#592d2d]">
              French
            </button>
            <button className="bg-d35252 text-white border-none rounded-md px-4 py-2 mx-2 cursor-pointer transition duration-300 bg-[#d35252]  animate-fade-in shadow-md shadow-[#592d2d]">
              Spanish
            </button>
            <button className="bg-d35252 text-white border-none rounded-md px-4 py-2 mx-2 cursor-pointer transition duration-300 bg-[#d35252]  animate-fade-in shadow-md shadow-[#592d2d]">
              Korean
            </button>
            <button className="bg-d35252 text-white border-none rounded-md px-4 py-2 mx-2 cursor-pointer transition duration-300 bg-[#d35252]  animate-fade-in shadow-md shadow-[#592d2d]">
              Chinese
            </button>
          </div>
        </div>
      </div>
 
    </div>
  );
}
