import "./Challenge.css";
import React, { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import io from "socket.io-client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Confettie from "react-confetti";
const socket = io("http://localhost:5000");

const Challenge = () => {
  const [name, setName] = useState(null);
  const [room, setRoom] = useState(null);
  const [info, setInfo] = useState(false);
  const [question, setQuestion] = useState("");
  const [answered, setAnswered] = useState(false);

  const [seconds, setSeconds] = useState(); // Set the initial duration in seconds
  const [scores, setScores] = useState([]);
  const [winner, setWinner] = useState(null);

  const { transcript, resetTranscript, listening } = useSpeechRecognition();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && room) {
      setInfo(true);
    }
  };
  useEffect(() => {
    // Exit the effect when the timer reaches 0
    if (seconds === 0) return;
    // Create an interval to decrement the time every second
    const timerInterval = setInterval(() => {
      setSeconds((prevTime) => prevTime - 1);
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(timerInterval);
    };
  }, [seconds]);
  useEffect(() => {
    if (name) {
      socket.emit("joinRoom", room, name);
    }
  }, [info]);

  useEffect(() => {
    socket.on("message", (message) => {
      toast(`${message} joined`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    });

    return () => {
      socket.off("message");
    };
  }, []);

  useEffect(() => {
    socket.on("newQuestion", (data) => {
      setQuestion(data.question);
      setAnswered(false);
      setSeconds(data.timer);
      resetTranscript(); // Reset transcript when new question is received
    });

    socket.on("answerResult", (data) => {
      if (data.isCorrect) {
        toast(`Correct! ${data.playerName} got it right.`, {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
      setScores(data.scores);
    });

    socket.on("gameOver", (data) => {
      setWinner(data.winner);
    });

    return () => {
      socket.off("newQuestion");
      socket.off("answerResult");
      socket.off("gameOver");
    };
  }, [resetTranscript]);

  const handleAnswer = (answer) => {
    const speakLetter = transcript.trim().toUpperCase();
    console.log("speak:", speakLetter);
    if (speakLetter) {
      socket.emit("submitAnswer", room, speakLetter);
      setAnswered(true);
    } else {
      toast.error("Please speak your answer first.");
    }
  };

  const handleSpeechRecognition = () => {
    SpeechRecognition.startListening();
  };

  if (winner) {
    return <div  className=" font-extrabold  text-3xl text-center text-black mt-36">The winner is {winner}  <Confettie    /> 
                 <h1> </h1>
    </div>;
  }

  return (
    <div className=" animate-fade-in bg-[#F6F1F1]">
      {!info ? (
        <div class=" mx-auto  mt-36       ">
          <h1 className="  font-bold  text-5xl text-center text-black  ">
            Challenge feature{" "}
          </h1>
          <div className=" mx-0 shadow-black shadow-md md:mx-[26rem]  my-5">
            <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
              <div className="mb-5">
                <label
                  for="text"
                  className="block mb-2 text-sm font-semibold text-gray-900 "
                >
                  Your name
                </label>
                <input
                  type="text"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
           
                  required
                  placeholder ="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-5">
                <label
                  for="password"
                  className="block mb-2 text-sm  font-semibold text-gray-900 dark:text-black "
                >
                  Room Id
                </label>
                <input
                  type="text"
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  placeholder="Enter room no"
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                />
              </div>
              <div className="flex items-start mb-5">
                <div className="flex items-center h-5"></div>
              </div>
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                JOINT
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div>
          <h1>Challenge feature 💡</h1>
          <p className="room-id">Room Id: {room}</p>
          <p className="room-id"> {name}</p>
          <ToastContainer />

          {question ? (
            <div className="  animate-fade-in  mx-0 shadow-[#526059] shadow-xl md:mx-[20rem]  my-9 bg-[#f0e9e9] ">
              
              Remaining Time: {seconds}
              <h3>Speak the Letter</h3>
              <div className="question ">
                <p className="question-text  font-bold mb-4">{question}</p>
              </div>
              <ul>
                <li>
                  {listening ? <h1 className="text-2xl">Listening...</h1> : " "}
                  <h1>{transcript}</h1>
                  <button
                    onClick={handleSpeechRecognition}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Speak
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleAnswer}
                    className="text-white bg-green-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-800 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  >
                    Check
                  </button>
                </li>
              </ul>
              {scores.map((player, index) => (
                <h1 key={index} className="font-bold  text-xl">
                  {player.name} score: {player.score}
                </h1>
              ))}
            </div>
          ) : (
            <p>Loading question...</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Challenge;
