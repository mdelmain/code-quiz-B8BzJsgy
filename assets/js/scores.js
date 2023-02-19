document.querySelector("#goback").addEventListener("click", function () {
  window.open("./index.html");
});

var scores = JSON.parse(localStorage.getItem("userscores"));
if (scores === null) {
  scores = [];
}

scores.sort((a, b) => {
  return b.score - a.score;
});
console.log(scores);

for (let i = 0; i < scores.length; i++) {
  var li = document.createElement("li");
  document.querySelector("ol").appendChild(li);
  var score = scores[i];
  // name +"-"+ secondsLeft
  li.textContent = score.name + " - " + score.score;
  console.log(li);
}
