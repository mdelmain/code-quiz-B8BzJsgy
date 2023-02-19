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
    answer4: "console.logs",
    correct: "console.logs",
  },
];
document.querySelector("#start").addEventListener("click", function () {
  rootEl.textContent = "";
  timer();
  createQuestionElements(rootEl);
  displayQuestions(rootEl, questionlist[currentQuestionId]);
});

function timer() {
  var timerEl = document.getElementById("countdown");
  // seconds at the start of the game
  secondsLeft = 75;

  var countdown = setInterval(function () {
    if (secondsLeft < 1) {
      clearInterval(countdown);
      timerEl.textContent = "";
    }
    if (secondsLeft === 0) {
      clearInterval(countdown);
      console.log("game over");
    }
    if (currentQuestionId === 4) {
      clearInterval(countdown);
    } else {
      timerEl.textContent = "Time: " + secondsLeft;
      secondsLeft--;
    }
  }, 1000);
}

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

  var checkAnswer = function () {
    var displayAnswer = document.createElement("p");
    rootEl.appendChild(displayAnswer);
    if (this.textContent === questionlist[currentQuestionId].correct) {
      rootEl.querySelector("p").textContent = "Correct!";
    } else {
      rootEl.querySelector("p").textContent = "Wrong!";
      secondsLeft -= 10;
    }
    setTimeout(() => {
      rootEl.querySelector("p").textContent = "";
      if (currentQuestionId === questionlist.length-1) {
        rootEl.textContent = "";
        gameover();
      } else {
        ++currentQuestionId;
        displayQuestions(rootEl, questionlist[currentQuestionId]);
      }
    }, 100);
  };
  answer1.onclick = checkAnswer;
  answer2.onclick = checkAnswer;
  answer3.onclick = checkAnswer;
  answer4.onclick = checkAnswer;
}

function displayQuestions(rootEl, question) {
  rootEl.querySelector("#question").textContent = question.question;
  rootEl.querySelector("#answer1").textContent = question.answer1;
  rootEl.querySelector("#answer2").textContent = question.answer2;
  rootEl.querySelector("#answer3").textContent = question.answer3;
  rootEl.querySelector("#answer4").textContent = question.answer4;
}

function gameover() {
  rootEl.appendChild(document.createElement("h1"));
  rootEl.querySelector("h1").textContent = "Game Over!";
  rootEl.appendChild(document.createElement("p"));
  rootEl.querySelector("p").textContent = "Your final score is " + secondsLeft;
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

function submitResponse(event) {
  event.preventDefault();
  var initials = event.target.elements.initials.value;
  var userscores = {
    name: initials,
    score: secondsLeft 
  };
  localStorage.setItem("userscores", JSON.stringify(userscores));
  //rootEl.appendChild(document.createElement("ol"));
  window.open("./viewscores.html")
}
