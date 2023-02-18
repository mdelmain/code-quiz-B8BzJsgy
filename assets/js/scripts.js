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
    question: "test211",
    answer1: "answer211",
    answer2: "answer212",
    answer3: "answer213",
    answer4: "answer213",
  },
  {
    question: "test311",
    answer1: "answer311",
    answer2: "answer312",
    answer3: "answer313",
    answer4: "answer313",
  },
  {
    question: "test111",
    answer1: "answer111",
    answer2: "answer112",
    answer3: "answer113",
    answer4: "answer113",
  },
  {
    question: "test111",
    answer1: "answer111",
    answer2: "answer112",
    answer3: "answer113",
    answer4: "answer113",
  },
  {
    question: "test111",
    answer1: "answer111",
    answer2: "answer112",
    answer3: "answer113",
    answer4: "answer113",
  },
]
document.querySelector("#start").addEventListener("click", function() {
  var rootEl = document.querySelector(".game");
  rootEl.textContent = "";
  timer();
  createQuestionElements(rootEl);
  displayQuestions(rootEl, questionlist[0]);

});

function timer() {
  var timerEl = document.getElementById("countdown");
// add 75 seconds later
  var secondsLeft = 10;

  var countdown = setInterval(function () {
    if (secondsLeft < 1) {
      clearInterval(countdown);
      timerEl.textContent = "";
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
  var answer1  = document.createElement("button");
  answer1.id = "answer1"
  answer1.className = "answer"
  var answer2  = document.createElement("button");
  answer2.id = "answer2"
  answer2.className = "answer"
  var answer3  = document.createElement("button");
  answer3.id = "answer3"
  answer3.className = "answer"
  var answer4  = document.createElement("button");
  answer4.id = "answer4"
  answer4.className = "answer"
  rootEl.append(answer1,answer2,answer3,answer4);
};

function displayQuestions(rootEl, question) {
  rootEl.querySelector("#question").textContent = question.question;
  rootEl.querySelector("#answer1").textContent = question.answer1;
  rootEl.querySelector("#answer2").textContent = question.answer2;
  rootEl.querySelector("#answer3").textContent = question.answer3;
  rootEl.querySelector("#answer4").textContent = question.answer4;
}

