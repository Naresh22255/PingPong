const speed = 0.045;

export default class Ball {
  constructor(whiteBall) {
    this.whiteBall = whiteBall;
    this.reset();
  }

  get x() {
    return parseFloat(getComputedStyle(this.whiteBall).getPropertyValue("--x"));
  }

  set x(value) {
    this.whiteBall.style.setProperty("--x", value);
  }

  get y() {
    return parseFloat(getComputedStyle(this.whiteBall).getPropertyValue("--y"));
  }

  set y(value) {
    this.whiteBall.style.setProperty("--y", value);
  }

  rect() {
    return this.whiteBall.getBoundingClientRect();
  }

  reset() {
    this.x = 50;
    this.y = 50;
    this.direction = { x: 0 };
    while (
      Math.abs(this.direction.x) <= 0.1 ||
      Math.abs(this.direction.y) >= 0.8
    ) {
      const score = randomNumber(0, 2 * Math.PI);
      this.direction = { x: Math.cos(score), y: Math.sin(score) };
    }

    this.velocity = speed;
  }

  update(newBall) {
    this.x += this.direction.x * this.velocity * newBall;
    this.y += this.direction.y * this.velocity * newBall;
    const rect = this.rect();

    if (rect.bottom >= window.innerHeight || rect.top <= 0) {
      this.direction.y *= -1;
    }

    if (rect.right >= window.innerWidth || rect.left <= 0) {
      this.direction.x *= -1;
    }
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
