import Ball from "./Ball.js";
import Paddle from "./Paddle.js";

const ball = new Ball(document.getElementById("ball"));
const leftPaddle = new Paddle(document.getElementById("paddle-left"));
const rightPaddle = new Paddle(document.getElementById("paddle-right"));
const playerScore = document.getElementById("player-score");
const computerScore = document.getElementById("computer-score");

let lastTime;
function update(time) {
  if (lastTime != null) {
    const position = time - lastTime;
    ball.update(position);
    rightPaddle.update(position, ball.y);

    if (lost()) lost1();
  }

  lastTime = time;
  window.requestAnimationFrame(update);
}

function lost() {
  const rect = ball.rect();
  return rect.right >= window.innerWidth || rect.left <= 0;
}

function lost1() {
  const rect = ball.rect();
  if (rect.right >= window.innerWidth) {
    playerScore.innerHTML = parseInt(playerScore.innerHTML) + 1;
  } else {
    computerScore.innerHTML = parseInt(computerScore.innerHTML) + 1;
  }
  ball.reset();
  rightPaddle.reset();
}

document.addEventListener("mousemove", (e) => {
  leftPaddle.position = (e.y / window.innerHeight) * 100;
});

// setInterval(update, 10);

window.requestAnimationFrame(update);
