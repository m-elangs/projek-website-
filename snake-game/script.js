const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
let snake = [];
snake[0] = { x: 9 * box, y: 9 * box };

let food = {
  x: Math.floor(Math.random() * 19 + 1) * box,
  y: Math.floor(Math.random() * 19 + 1) * box,
};

let score = 0;
let direction;

document.addEventListener("keydown", setDirection);

function setDirection(event) {
  if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  else if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  else if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
  else if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Gambar ular
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "#2ecc71" : "#3498db";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
    ctx.strokeStyle = "#000";
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }

  // Gambar makanan
  ctx.fillStyle = "#e74c3c";
  ctx.fillRect(food.x, food.y, box, box);

  // Posisi kepala
  let headX = snake[0].x;
  let headY = snake[0].y;

  if (direction === "LEFT") headX -= box;
  if (direction === "UP") headY -= box;
  if (direction === "RIGHT") headX += box;
  if (direction === "DOWN") headY += box;

  // Game over jika nabrak dinding atau diri sendiri
  if (
    headX < 0 || headY < 0 || headX >= canvas.width || headY >= canvas.height ||
    collision({ x: headX, y: headY }, snake)
  ) {
    clearInterval(game);
    alert("Game Over! Skormu: " + score);
    return;
  }

  // Jika makan makanan
  if (headX === food.x && headY === food.y) {
    score++;
    document.getElementById("score").innerText = score;
    food = {
      x: Math.floor(Math.random() * 19 + 1) * box,
      y: Math.floor(Math.random() * 19 + 1) * box,
    };
  } else {
    snake.pop(); // hapus ekor
  }

  const newHead = { x: headX, y: headY };
  snake.unshift(newHead); // tambah kepala
}

function collision(head, array) {
  for (let i = 1; i < array.length; i++) {
    if (head.x === array[i].x && head.y === array[i].y) return true;
  }
  return false;
}

let game;

function startGame() {
  score = 0;
  direction = null;
  document.getElementById("score").innerText = 0;
  snake = [{ x: 9 * box, y: 9 * box }];
  food = {
    x: Math.floor(Math.random() * 19 + 1) * box,
    y: Math.floor(Math.random() * 19 + 1) * box,
  };
  clearInterval(game);
  game = setInterval(draw, 150); // 150 ms = 6.6 FPS
}

startGame(); // mulai otomatis saat halaman dibuka
