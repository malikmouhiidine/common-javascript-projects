// Game values
let min = 1,
  max = 10,
  winningNum = 2,
  guessesLeft = 3;
// UI elements
const game = document.getElementById("game"),
  minNum = document.getElementById("min-num"),
  maxNum = document.getElementById("max-num"),
  guessBtn = document.getElementById("guess-button"),
  guessInput = document.getElementById("guess-input"),
  message = document.getElementById("message");
// Play again event listener
game.addEventListener("mousedown", function (e) {
  if (e.target.className === "play-again") {
    window.location.reload();
  }
});

minNum.textContent = min;
maxNum.textContent = max;
guessBtn.addEventListener("click", function () {
  let guess = parseInt(guessInput.value);
  if (isNaN(guess) || guess > max || guess < min) {
    setMessage(`Please enter a number between ${min} and ${max}`, "red");
    return;
  }
  if (guess === winningNum) {
    setMessage(`Yes ${guess} is the correct number`, "green", true);
  } else {
    // Wrong number
    guessesLeft -= 1;
    if (guessesLeft === 0) {
      setMessage(
        `${guessesLeft} guesses left the correct number was ${winningNum}`,
        "red",
        true
      );
    } else {
      setMessage(`Not Correct. ${guessesLeft} guesses left`, "red");
    }
  }
  guessInput.value = "";
});

function setMessage(msg, color, gameOver = false) {
  if (gameOver === true) {
    guessInput.disabled = true;
    guessBtn.value = "Play Again";
    guessBtn.className += "play-again";
  }
  guessInput.style.borderColor = color;
  message.style.color = color;
  message.textContent = msg;
}
