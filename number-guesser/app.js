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

minNum.textContent = min;
maxNum.textContent = max;
guessBtn.addEventListener("click", function () {
  let guess = parseInt(guessInput.value);
  if (isNaN(guess) || guess > max || guess < min) {
    setMessage(`Please enter a number between ${min} and ${max}`, "red");
  }
  if (guess === winningNum) {
    guessInput.disabled = true;
    guessInput.style.borderColor = "green";
    setMessage(`Yes ${guess} is the correct number`, "green");
  }
});
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}
