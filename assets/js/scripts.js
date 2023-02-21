var rootEl = document.querySelector(".game");
var secondsLeft = 0;
var currentQuestionId = 0;
var questionlist = [
  {
    question: "Commonly used data types DO NOT include:",
    answer1: "strings",
    answer2: "booleans",
    answer3: "alerts",
    answer4: "numbers",
    correct: "alerts",
  },
  {
    question:
      "The condition in an if / else statement is enclosed with_______.",
    answer1: "quotes",
    answer2: "curly brackets",
    answer3: "parenthesis",
    answer4: "square brackets",
    correct: "parenthesis",
  },
  {
    question: "Arrays in JavaScript can be used to store________.",
    answer1: "numbers and strings",
    answer2: "other arrays",
    answer3: "booleans",
    answer4: "all of the above",
    correct: "all of the above",
  },
  {
    question:
      "String values must be enclosed within ____ when being assigned to variables.",
    answer1: "commas",
    answer2: "curly brackets",
    answer3: "quotes",
    answer4: "parenthesis",
    correct: "quotes",
  },
  {
    question:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    answer1: "JavaScript",
    answer2: "terminal/bash",
    answer3: "for loops",
    answer4: "console.log",
    correct: "console.log",
  },
];

// when start button is clicked calling functions to start timer, create html elements and display questions
document.querySelector("#start").addEventListener("click", function () {
  rootEl.textContent = "";
  timer();
  createQuestionElements(rootEl);
  displayQuestion(rootEl, questionlist[currentQuestionId]);
});

function timer() {
  var timerEl = document.getElementById("countdown");

  // seconds at the start of the game
  secondsLeft = 75;

  // clear timer at zero, display time in nav bar
  var countdownId = setInterval(function () {
    if (secondsLeft < 1) {
      clearInterval(countdownId);
      timerEl.textContent = "";
      gameover(rootEl);
    } else {
      timerEl.textContent = "Time: " + secondsLeft;
      secondsLeft--;
    }
  }, 1000);
}

// create html elements for question and answers 
function createQuestionElements(rootEl) {
  var question = document.createElement("h2");
  question.id = "question";
  rootEl.appendChild(question);

  var answer1 = document.createElement("button");
  answer1.id = "answer1";
  answer1.className = "answer";

  var answer2 = document.createElement("button");
  answer2.id = "answer2";
  answer2.className = "answer";

  var answer3 = document.createElement("button");
  answer3.id = "answer3";
  answer3.className = "answer";

  var answer4 = document.createElement("button");
  answer4.id = "answer4";
  answer4.className = "answer";

  rootEl.append(answer1, answer2, answer3, answer4);

  // checks answers to questions and displays "correct" or "wrong", if  wrong answer selected, subtracts 10 seconds from the timer
  var checkAnswer = function () {
    disableAnswerButtons(rootEl);
    var displayAnswer = document.createElement("p");
    rootEl.appendChild(displayAnswer);
    
    if (this.textContent === questionlist[currentQuestionId].correct) {
      displayAnswer.textContent = "Correct!";
    } else {
      displayAnswer.textContent = "Wrong!";
      secondsLeft -= 10;
    }

  // set timeout to 1.5 seconds after answer selected, starts gameover function after the last question
    setTimeout(() => {
      displayAnswer.remove();
      if (currentQuestionId === questionlist.length-1) {
        gameover(rootEl);
      } else {
        ++currentQuestionId;
        displayQuestion(rootEl, questionlist[currentQuestionId]);
      }
      enableAnswerButtons(rootEl);
    }, 1500);
  };

  // runs check answer function when answer selected
  answer1.onclick = checkAnswer;
  answer2.onclick = checkAnswer;
  answer3.onclick = checkAnswer;
  answer4.onclick = checkAnswer;
}

// disables multiple answers from being selected
function disableAnswerButtons(rootEl) {
  rootEl.querySelectorAll(".answer").forEach((button) => { button.disabled = "disabled"; });
}

function enableAnswerButtons(rootEl) {
  rootEl.querySelectorAll(".answer").forEach((button) => { button.disabled = null; });
}

//  displays question with answers
function displayQuestion(rootEl, question) {
  rootEl.querySelector("#question").textContent = question.question;
  rootEl.querySelector("#answer1").textContent = question.answer1;
  rootEl.querySelector("#answer2").textContent = question.answer2;
  rootEl.querySelector("#answer3").textContent = question.answer3;
  rootEl.querySelector("#answer4").textContent = question.answer4;
}

// creates game over page at the end of the game, displays seconds left as score, creates form to input initials 
function gameover(rootEl) {
  rootEl.textContent = "";

  title = document.createElement("h1");
  title.textContent = "Game Over!";
  rootEl.appendChild(title);
  
  message = document.createElement("p");
  message.textContent = "Your final score is " + secondsLeft;
  rootEl.appendChild(message);
  
  var formEl = document.createElement("form");
  rootEl.appendChild(formEl);

  var input = document.createElement("input");
  input.name = "initials";

  var label= document.createElement("label");
  label.textContent = "Enter initials";

  var submit = document.createElement("input");
  submit.type = "submit";
  submit.value = "Submit";

  formEl.appendChild(label);
  formEl.appendChild(input);
  formEl.appendChild(submit);

  formEl.addEventListener("submit", submitResponse);
}

// when submit button clicked saves initials and score in local storage and updates userscores key
function submitResponse(event) {
  event.preventDefault();

  var initials = event.target.elements.initials.value;
  if (initials === "") {
    return;
  }

  var userscore = {
    name: initials,
    score: secondsLeft 
  };

  var userscores = JSON.parse(localStorage.getItem("userscores"));
  if (userscores === null){
    userscores = [];
  }

  userscores.push(userscore);
  localStorage.setItem("userscores", JSON.stringify(userscores));

  window.open("./viewscores.html")
}

