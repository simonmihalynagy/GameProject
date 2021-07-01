const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const directions = ["Up", "Down", "Left", "Right"];

let shapes = [];

let penCurrentPosition = [];

let checkBallLineCollision = () => {
  penCurrentPosition.map((position) => {
    if (
      (position.x === ball.x && position.y === ball.y) ||
      (position.x === ball.x && position.y === ball.y + ball.height) ||
      (position.x === ball.x + ball.width && position.y === ball.y + ball.width)
    ) {
      pen.pickRandomStart();
      penCurrentPosition = [];
    }
  });
};

let checkBallWallsCollision = () => {
  if (ball.x > canvas.width - 20 || ball.x < 0) {
    ball.xSpeed = -ball.xSpeed;
  }
  if (ball.y > canvas.height - 20 || ball.y < 0) {
    ball.ySpeed = -ball.ySpeed;
  }
};

let checkBallShapeCollision = () => {
  shapes.map((shape) => {
    let ballLeft = ball.x;
    let ballRight = ball.x + ball.width;
    let ballTop = ball.y;
    let ballBottom = ball.y + ball.height;
    let shapeLeft = shape.x;
    let shapeRight = shape.x + shape.width;
    let shapeTop = shape.y;
    let shapeBottom = shape.y + shape.height;

    if (ballLeft < shapeRight || ballRight > shapeLeft) {
      ball.xSpeed = -ball.xSpeed;
    }
    if (ballTop > shapeBottom || ballBottom < shapeTop) {
      ball.ySpeed = -ball.ySpeed;
    }
  });
};

class Ball {
  constructor() {
    this.x = null;
    this.y = null;
    this.width = 20;
    this.height = 20;
    this.xSpeed = 1;
    this.ySpeed = 1;
  }
  _pickRandomStart() {
    this.x = Math.floor(Math.random() * (790 - 10) + 1);
    this.y = this.x;
  }
  _move() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }
  _draw() {
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

let drawShapes = function (shapes) {
  shapes.forEach((shape) => {
    ctx.fillRect(shape.x, shape.y, shape.width, shape.height);
  });
};

let pen = new Pen();
let ball = new Ball();

window.addEventListener("load", () => {
  pen.pickRandomStart();
  ball._pickRandomStart();
});

window.addEventListener("keydown", (event) => {
  if (pen.turnCounter < 2 && event.key.includes("Arrow")) {
    pen.updateDirection(event.key);
  } else if (pen.turnCounter <= 2 && !event.key.includes("Arrow")) {
    window.alert("Use your arrow keys please!");
  } else if (pen.turnCounter >= 2 && event.key.includes("Arrow")) {
    window.alert("You can't turn more than twice");
  }
});

setInterval(() => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ball._move();
  ball._draw();

  pen.updatePosition();
  pen.saveCurrentPosition();
  pen.draw();
  if (pen.turnCounter === null) {
    if (pen.startPosX === 0 && pen.lastCornerX === 800) {
      pen._saveShape();
    } else if (pen.startPosX === 800 && pen.lastCornerX === 0) {
      pen._saveShape();
    } else if (pen.startPosY === 0 && pen.lastCornerY === 800) {
      pen._saveShape();
    } else if (pen.startPosY === 800 && pen.lastCornerY === 0) {
      pen._saveShape();
    }
  } else if (pen.turnCounter >= 1) {
    if (
      pen.lastCornerX === 800 ||
      pen.lastCornerX === 0 ||
      pen.lastCornerY === 800 ||
      pen.lastCornerY === 0
    ) {
      pen._saveShape();
    }
  }
  drawShapes(shapes);
  checkBallWallsCollision();
  checkBallLineCollision();
  checkBallShapeCollision();
}, 1000 / 120);
