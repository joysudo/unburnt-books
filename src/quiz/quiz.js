import "../styles.css";

const questions = [
  {
    question: "What year Did Book Banning Begin?",
    answers: ["1", "2", "3", "4"],
    correct: "1",
  },
  {
    question: "What is an organization that is against book banning?",
    answers: ["1", "3", "7", "2"],
    correct: "1",
  },
  {
    question: "Which State has the most Book bans?",
    answers: ["1", "2", "3", "4"],
    correct: "1",
  },
  {
    question: "Which State has the least book bans?",
    answers: ["1", "2", "3", "4"],
    correct: "1",
  },
  {
    question: "What year had the most book bans?",
    answers: ["1", "2", "3", "4"],
    correct: "1",
  },
];

//DOM grabbing HTML

const questionElement = document.getElementById("questions");
const answerButtons = document.getElementById("answers");
const scoreContainer = document.getElementById("score-container");
const finalScore = document.getElementById("final-score");
const restartButton = document.getElementById("restart");

//Quiz variables
let currentQuestionIndex = 0; //Starts at first question
let score = 0; //Starts the score at 0

//Start quiz

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  finalScore.textcontent = "";
  scoreContainer.classList.add("hidden");
  // Call the function that will show the question
  showQuestion();
}

//Show the quesiton

function showQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textcontent = currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {});
}
