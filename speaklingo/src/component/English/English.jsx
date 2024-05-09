import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Confettie from "react-confetti";
import Elevel2 from "./Elevel2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export default function English({ children }) {
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  // speech check code
  const navigate = useNavigate();
  const word = ["CAT", "BAT", "BALL", "TALL", "WALL"];
  const [currentLetter, setCurrentLetter] = useState(0);

  var speakLetter = transcript.trim().toUpperCase();
  const currentword = word[currentLetter];

  const handleSpeak = () => {
    if (SpeechRecognition.browserSupportsSpeechRecognition()) {
      if (!listening) {
        SpeechRecognition.startListening();
      }
    } else {
      toast.error("Speech recognition is not supported in this browser.", {
        autoClose: 3000,
      });
    }
  };

  const checkValue = () => {
    const audioElement = new Audio();

    if (currentword === speakLetter) {
      audioElement.src = "/audio/correct-6033.mp3";
      setIsActive(true);
      toast.success("great !", {
        autoClose: 1500,
      });
    } else {
      audioElement.src = "/audio/buzzer-15-187758.mp3";
      setIsActive(false);
      toast.error("sorry its wrong", {
        autoClose: 1500,
      });
    }
    audioElement.play();
  };

  const handleNextLetter = () => {
    setCurrentLetter((prevIndex) => {
      const newIndex = (prevIndex + 1) % word.length;
      if (newIndex === 0) {
        if (navigate) {
          navigate("/English/Elevel2");
        } else {
          toast.error("Navigation to the next level failed.", {
            autoClose: 3000,
          });
        }
      }
      return newIndex;
    });
    resetTranscript();
    setIsActive(false);
  };

  return (
    <div className="english-data animate-fade-in ">
      <h1 className="text-2xl   "> Level 1 </h1>
      <div className="  flex  flex-col mx-0 items-center justify-center  bg-gray-200  shadow-gray-500 shadow-xl  ">
        <h1 className="text-3xl  font-bold mb-4">Speak the word</h1>
        {isActive ? (
          <Confettie width={"500px"} height={"2000px"} gravity={0.2} />
        ) : (
          ""
        )}
        <div className="mb-4">
          {/* <p>Speak the word:</p> */}
          <h1 className="text-center text-4xl font-bold">{currentword}</h1>
        </div>
        <div className="">
          <button
            onClick={handleSpeak}
            className="bg-blue-500 text-white p-2  mb-2 rounded-md shadow-md shadow-blue-700 "
          >
            Speak
          </button>
        </div>
        <h1>You speak letter:</h1>
        {listening ? <h1 className="text-2xl">Listening...</h1> : ""}
        <h1 className="text-5xl" style={{ color: isActive ? "green" : "red" }}>
          {speakLetter}
        </h1>

        <div className="flex  pt-32 rounded-md   ">
          <div className="  p-3">
            <button
              onClick={handleNextLetter}
              className=" bg-white  text-[#a6a6a6] p-5  rounded-md shadow-md shadow-[#888686] font-bold hover:bg-[#cccccc] "
            >
              Next
            </button>

            {speakLetter == "" ? (
              <button 
                disabled
                className={
                  "bg-[#cccccc] text-[#a6a6a6] p-5 ml-96 rounded-md font-bold shadow-md shadow-[#888686] hover:cursor-not-allowed "
                }
              > 
                Check
              </button>
            ) : (
              <button
                onClick={checkValue}
                className={
                  "bg-green-500 text-white p-5 ml-96 rounded-md font-bold shadow-md shadow-green-700   "
                }
              >

                Check{" "} 
              </button> 
            )}
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
}
