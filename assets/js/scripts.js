var timerEl = document.getElementById("countdown");

function timer() {
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

timer();
