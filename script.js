const quizData = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "Home Tool Markup Language",
      "Hyperlinks and Text Markup Language",
      "Hyper Text Markdown Language"
    ],
    answer: "Hyper Text Markup Language"
  },
  {
    question: "Which property in CSS is used to change the text color?",
    options: ["font-color", "text-color", "color", "text-style"],
    answer: "color"
  },
  
  {
    question: "Inside which HTML element do we put the JavaScript?",
    options: ["<js>", "<scripting>", "<javascript>", "<script>"],
    answer: "<script>"
  },
  {
    question: "Which of the following is NOT a valid CSS position property?",
    options: ["static", "relative", "fixed", "center"],
    answer: "center"
  },
  {
    question: "Which JavaScript method is used to write content into an HTML document?",
    options: ["document.write()", "document.add()", "document.output()", "document.create()"],
    answer: "document.write()"
  },
  {
    question: "Which company developed JavaScript?",
    options: ["Microsoft", "Sun Microsystems", "Netscape", "Oracle"],
    answer: "Netscape"
  },
  {
    question: "Which HTML tag is used for an unordered list?",
    options: ["<ol>", "<ul>", "<li>", "<list>"],
    answer: "<ul>"
  },
   {
    question: "Which input type defines a slider control in HTML5?",
    options: ["slider", "range", "scroll", "number"],
    answer: "range"
  },
  {
    question: "How do you write a comment in CSS?",
    options: ["// this is a comment", "/* this is a comment */", "<!-- this is a comment -->", "# this is a comment"],
    answer: "/* this is a comment */"
  },
  {
    question: "What does the 'flex' value of the display property do in CSS?",
    options: [
      "Hides the element",
      "Allows responsive layout with flexible items",
      "Fixes element size",
      "Creates a table layout"
    ],
    answer: "Allows responsive layout with flexible items"
  },
];

let currentQuestion = 0;
let score = 0;
let isAnswered = false;

const questionEl = document.getElementById("question");
const optionsList = document.getElementById("options-list");
const nextBtn = document.getElementById("next-btn");
const feedbackEl = document.getElementById("feedback");
const quizBox = document.getElementById("quiz-box");
const resultBox = document.getElementById("result-box");
const scoreEl = document.getElementById("score");

function loadQuestion() {
  isAnswered = false;
  feedbackEl.classList.add("hidden");
  nextBtn.disabled = true;

  const currentQuiz = quizData[currentQuestion];
  questionEl.textContent = currentQuiz.question;
  optionsList.innerHTML = "";

  currentQuiz.options.forEach(option => {
    const li = document.createElement("li");
    li.textContent = option;
    li.addEventListener("click", () => selectOption(li, currentQuiz.answer));
    optionsList.appendChild(li);
  });
}

function selectOption(selectedLi, correctAnswer) {
  if (isAnswered) return;
  isAnswered = true;

  const selectedText = selectedLi.textContent;

  if (selectedText === correctAnswer) {
    selectedLi.classList.add("correct");
    feedbackEl.textContent = "Correct!";
    feedbackEl.style.color = "green";
    score++;
  } else {
    selectedLi.classList.add("wrong");
    feedbackEl.textContent = `Wrong! The correct answer was: ${correctAnswer}`;
    feedbackEl.style.color = "red";

    const allOptions = optionsList.querySelectorAll("li");
    allOptions.forEach(li => {
      if (li.textContent === correctAnswer) {
        li.classList.add("correct");
      }
    });
  }

  feedbackEl.classList.remove("hidden");
  nextBtn.disabled = false;
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  quizBox.classList.add("hidden");
  resultBox.classList.remove("hidden");
  scoreEl.textContent = `You scored ${score} out of ${quizData.length}`;
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  quizBox.classList.remove("hidden");
  resultBox.classList.add("hidden");
  loadQuestion();
}

loadQuestion();
