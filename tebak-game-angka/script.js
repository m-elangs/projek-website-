let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

function checkGuess() {
  const userGuess = parseInt(document.getElementById('guessInput').value);
  const message = document.getElementById('message');
  attempts++;
  document.getElementById('attempts').innerText = `Percobaan: ${attempts}`;

  if (userGuess === randomNumber) {
    message.innerText = "🎉 Selamat! Tebakan kamu benar!";
    message.style.color = "green";
  } else if (userGuess < randomNumber) {
    message.innerText = "Terlalu rendah!";
    message.style.color = "red";
  } else {
    message.innerText = "Terlalu tinggi!";
    message.style.color = "red";
  }
}

function resetGame() {
  randomNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 0;
  document.getElementById('attempts').innerText = "Percobaan: 0";
  document.getElementById('message').innerText = "";
  document.getElementById('guessInput').value = "";
}
