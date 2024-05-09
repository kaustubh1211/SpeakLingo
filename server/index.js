const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const app = express();

const server = http.createServer(app);
app.use(cors());
const io = socketIo(server, {
   cors: {
     origin: "http://localhost:3000",
     methods: ["GET", "POST"],
   },
}); 
 
const PORT = process.env.PORT || 5000; 
  
const questions = [
  {
    question: "Paris ",  
    answers: [
      { text: "PARIS", correct: true }
    ],
  }, 
  {
    question: "Delhi",
    answers: [
      { text: "DELHI", correct: true }
    ],
  },
  {
    question: "what are you doing",
    answers: [
      { text: "WHAT ARE YOU DOING", correct: true }
    ],
  },
  {
    question: "I have to sleep",
    answers: [
      { text: "I HAVE TO SLEEP", correct: true }
    ],
  },
  {
    question: "Mouse",
    answers: [
      { text: "MOUSE", correct: true }
    ],
  },


 
];
const rooms = {};

 io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("joinRoom", (room, name) => {
    socket.join(room);
    io.to(room).emit("message", `${name} has joined the game!`);
    if (!rooms[room]) {
      rooms[room] = {
        players: [],
        currentQuestion: null,
        correctAnswer: null,
        questionTimeout: null,
        shouldAskNewQuestion: true,
      };
    }
    rooms[room].players.push({ id: socket.id, name });

    if (!rooms[room].currentQuestion) {
      askNewQuestion(room);
    }
  }); 

  socket.on("submitAnswer", (room,  answer) => {
    console.log("answer",answer);
    const currentPlayer = rooms[room].players.find(
      (player) => player.id === socket.id
    );

    if (currentPlayer) {
      const correctAnswer = rooms [room].correctAnswer;
      const isCorrect = correctAnswer !== null && correctAnswer === answer;
      console.log(`Answer is correctans: ${correctAnswer }`);
      currentPlayer.score = isCorrect
        ? (currentPlayer.score || 0) + 1
        :(currentPlayer.score || 0)  ;

      clearTimeout(rooms[room].questionTimeout);

      io.to(room).emit("answerResult", {  
        playerName: currentPlayer.name, 
        isCorrect,
        correctAnswer, 
        scores: rooms[room].players.map((player) => ({
          name: player.name,
          score: player.score || 0,
        })),
      });
      const winningThreshold = 3;
      const winner = rooms[room].players.find(
        (player) => (player.score || 0) >= winningThreshold
      );
      if (winner) {
        io.to(room).emit("gameOver", { winner: winner.name });
        delete rooms[room]; 
      } else {
        askNewQuestion(room);
      }
    }
  });

  socket.on("disconnect", () => {
    for (const room in rooms) { 
      rooms[room].players = rooms[room].players.filter(
        (player) => player.id !== socket.id
      );
    }
    console.log("A user disconnected");
  });
});

function askNewQuestion(room) {
  if (rooms[room].players.length === 0) { 
    clearTimeout(rooms[room].questionTimeout);
    delete rooms[room];
    return;
  }
  const randomIndex = Math.floor(Math.random() * questions.length);
  const question = questions[randomIndex];
  rooms[room].currentQuestion = question;
  
  const correctAnswerIndex = question.answers.find(
    (answer) => answer.correct
  )?.text;

  rooms[room].correctAnswer = correctAnswerIndex;
  rooms[room].shouldAskNewQuestion = true;
  io.to(room).emit("newQuestion", {
    question: question.question,
    answers: question.answers.map((answer) => answer.text),
    timer: 10,
  });

  rooms[room].questionTimeout = setTimeout(() => {
    io.to(room).emit("answerResult", {
      playerName: "No one",
      isCorrect: false,
      correctAnswer: rooms[room].correctAnswer, 
      scores: rooms[room].players.map((player) => ({
        name: player.name,
        score: player.score || 0,
      })),
    });
    askNewQuestion(room);
  }, 10000);
}

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
