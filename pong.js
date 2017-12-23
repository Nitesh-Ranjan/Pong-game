let dx;
let dy;
let ballX;
let ballY;
let box;
let score;
let scoreValue;
let intervals = [];
let y;
let playerY;
let cpuPaddle;
let flag;
let speed = 3; // pixels/step

const setInitialValues = function() {
  box = document.getElementById("box");
  let gameOver = document.getElementById("gameOver");
  gameOver.style.visibility = "hidden";
  let gameOverMessage = document.getElementById("gameOverMessage");
  gameOverMessage.style.visibility = "hidden";
  dx = dy = speed;
  scoreValue = 0;
  score = document.getElementById("score");
  score.innerHTML = "Score: " + 0;
  ballX = (box.offsetWidth / 2) - (ball.offsetWidth / 2);
  ballY = (box.offsetHeight / 2) - (ball.offsetHeight / 2);
  cpuPaddle = document.getElementById("cpuPaddle");
  flag = 0;
}

const start = function() {
  setInitialValues();
  ball.style.top = box.offsetHeight / 2;
  ball.style.left = box.offsetLeft / 2;
  box.onmousemove = movePaddle;

  let myInterval = setInterval('gameLoop()', 10);
  intervals.push(myInterval);
}
const moveCpuPaddle = function() {
  cpuPaddle.style.top = ballY + 'px';
}

function gameLoop() {
  // If ball hits upper or lower wall
  if (ballY < 0 || ((ballY + ball.offsetHeight) > box.offsetHeight)) {
    var audio = new Audio('ballHit.mp3');
    audio.play()
    dy = -dy;
  }

  if (flag == 0)
    moveCpuPaddle();
  if (ballX == 722) {
    var audio = new Audio('ballHit.mp3');
    audio.play()
    dx = -dx;
    flag = 1;
  }
  ball.style.left = ballX + 'px';
  ball.style.top = ballY + 'px';
  ballX += dx;
  ballY += dy;

  let reset = function() {
    intervals.forEach(clearInterval);
    intervals = [];
    let gameOver = document.getElementById("gameOver");
    gameOver.style.visibility = "visible";
    gameOver.innerHTML = "Game Over";
    let gameOverMessage = document.getElementById("gameOverMessage");
    gameOverMessage.style.visibility = "visible";
  }
  //checking game over
  if (ballX < 0) {
    reset();
  }

  //detecting paddle
  if (ballX < (paddle1.offsetLeft + paddle1.offsetWidth)) {
    if (((ballY + ball.offsetHeight) > playerY) && ballY < (playerY + paddle1.offsetHeight)) {
      dx = -dx;
      var audio = new Audio('ballHit.mp3');
      audio.play()
      scoreValue += 5;
      score.innerHTML = "Score: " + scoreValue;
      flag = 0;
    }
  }
}

function movePaddle() {
  //y coordinate of mouse.
  y = event.clientY;
  y -= 115;
  playerY = y;
  if (y > (box.offsetHeight - paddle1.offsetHeight))
    y = (box.offsetHeight - paddle1.offsetHeight);
  paddle1.style.top = y + 'px';
}

let v = 100;
const move = function(event) {
  if (event.key == "ArrowUp") {
    v -= 30;
    paddle1.style.top = v + "px";
  }
  if (event.key == "ArrowDown") {
    v += 30;
    paddle1.style.top = v + "px";
  }
  playerY = paddle1.offsetTop;
}
document.addEventListener('keydown', move);
