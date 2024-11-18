const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionsContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");

let shuffledQuestions = [];
let currentQuestionIndex = 0;

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  startButton.classList.add("hide");
  shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionsContainerElement.classList.remove("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  if (currentQuestionIndex < shuffledQuestions.length) {
    showQuestion(shuffledQuestions[currentQuestionIndex]);
  } else {
    endGame();
  }
}

function showQuestion(question) {
  questionElement.innerText = question.question;

  const shuffledAnswers = [...question.answers].sort(() => Math.random() - 0.5);

  shuffledAnswers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct === "true";
  setStatusClass(document.body, correct);

  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct === "true");
    button.disabled = true;
  });

  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  answerButtonsElement.innerHTML = "";
}

function endGame() {
  questionElement.innerText = "Congratulations! You completed the quiz.";
  answerButtonsElement.innerHTML = "";
  nextButton.classList.add("hide");
  startButton.innerText = "Restart";
  startButton.classList.remove("hide");
}

const questions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "Paris", correct: true },
      { text: "Berlin", correct: false },
      { text: "Rome", correct: false },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Venus", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What is the largest mammal?",
    answers: [
      { text: "Blue Whale", correct: true },
      { text: "Elephant", correct: false },
      { text: "Giraffe", correct: false },
      { text: "Shark", correct: false },
    ],
  },
  {
    question: "Which language is primarily used to build websites?",
    answers: [
      { text: "HTML", correct: true },
      { text: "Python", correct: false },
      { text: "C++", correct: false },
      { text: "Java", correct: false },
    ],
  },
  {
    question: "How many continents are there in the world?",
    answers: [
      { text: "7", correct: true },
      { text: "6", correct: false },
      { text: "5", correct: false },
      { text: "8", correct: false },
    ],
  },
];
