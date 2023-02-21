// return to home page when go back button is clicked
document.querySelector("#goback").addEventListener("click", function () {
  window.open("./index.html");
});

// remove scores from local storage
document.querySelector("#clearscores").addEventListener("click", function () {
  localStorage.removeItem("userscores");
  displayScores();
});

//display scores and sort in numerical order
function displayScores() {
  var list = document.querySelector("ol");
  list.textContent = "";

  var scores = JSON.parse(localStorage.getItem("userscores"));
  if (scores === null) {
    scores = [];
  }

  scores.sort((a, b) => {
    return b.score - a.score;
  });

  for (let i = 0; i < scores.length; i++) {
    var li = document.createElement("li");
    list.appendChild(li);
    var score = scores[i];
    li.textContent = score.name + " - " + score.score;
  }
}

displayScores();