const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const directions = ["Up", "Down", "Left", "Right"];

let shapes = [];

let penCurrentPosition = [];

let checkBallLineCollision = () => {
  penCurrentPosition.map((position) => {
    if (position.x === ball.x && position.y === ball.y) {
      pen.pickRandomStart();
      penCurrentPosition = [];
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
    if (this.x + this.xSpeed > canvas.width - 20 || this.x + this.xSpeed < 0) {
      this.xSpeed = -this.xSpeed;
    }
    if (this.y + this.ySpeed > canvas.height - 20 || this.y + this.ySpeed < 0) {
      this.ySpeed = -this.ySpeed;
    }
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }
  _draw() {
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
//check if ball touches line
let intersectWithLine = (pen, ball) => {
  //line started on the left
  if (pen.direction === "left") {
    //single line
  }
};
//check if ball collides with drawn shapes
let intersectShapes = (ball, shapes) => {
  //loop through shapes
  shapes.forEach((shape) => {
    //check for shapes with 1 drawn line
    if (Object.keys(shape).length === 4) {
      //line started from left, in the upper half of the Canvas
      if (shape.startPosX === 0 && shape.startPosY < canvas.height / 2) {
        if (ball.y < shape.startPosY) {
          ball.ySpeed = -ball.ySpeed;
        }
      }
    }
  });
};

let drawShapes = function (shapes) {
  shapes.forEach((shape) => {
    if (Object.keys(shape).length === 4) {
      if (shape.startPosX === 0) {
        if (shape.startPosY > canvas.height / 2) {
          ctx.fillRect(
            shape.startPosX,
            shape.startPosY,
            canvas.width,
            canvas.height - shape.startPosY
          );
        } else if (shape.startPosY <= canvas.height / 2) {
          ctx.fillRect(0, 0, canvas.width, shape.startPosY);
        }
      } else if (shape.startPosX === canvas.width) {
        if (shape.startPosY > canvas.height / 2) {
          ctx.fillRect(
            shape.lastCornerX,
            shape.lastCornerY,
            canvas.width,

            canvas.height - shape.startPosY
          );
        } else if (shape.startPosY <= canvas.height / 2) {
          ctx.fillRect(0, 0, canvas.width, shape.startPosY);
        }
      } else if (shape.startPosY === 0) {
        if (shape.startPosX > canvas.width / 2) {
          ctx.fillRect(
            shape.startPosX,
            shape.startPosY,
            canvas.width - shape.startPosX,
            canvas.height
          );
        } else if (shape.startPosX <= canvas.width / 2) {
          ctx.fillRect(0, 0, shape.startPosX, canvas.height);
        }
      } else if (shape.startPosY === canvas.height) {
        if (shape.startPosX > canvas.width / 2) {
          ctx.fillRect(
            shape.lastCornerX,
            shape.lastCornerY,
            canvas.width - shape.startPosX,
            canvas.height
          );
        } else if (shape.startPosX <= canvas.width / 2) {
          ctx.fillRect(0, 0, shape.startPosX, canvas.height);
        }
      }
    } else if (Object.keys(shape).length === 6) {
      if (shape.startPosX === 0) {
        if (shape.lastCornerY === 0) {
          ctx.fillRect(0, 0, shape.firstCornerX, shape.firstCornerY);
        } else if (shape.lastCornerY === canvas.height) {
          ctx.fillRect(
            shape.startPosX,
            shape.startPosY,
            shape.lastCornerX,
            shape.lastCornerY
          );
        }
      }
      if (shape.startPosX === canvas.width) {
        if (shape.lastCornerY === 0) {
          ctx.fillRect(
            shape.lastCornerX,
            shape.lastCornerY,
            shape.startPosX,
            shape.startPosY
          );
        } else if (shape.lastCornerY === canvas.height) {
          ctx.fillRect(
            shape.firstCornerX,
            shape.firstCornerY,
            canvas.width - shape.firstCornerX,
            canvas.height - shape.startPosY
          );
        }
      }
      if (shape.startPosY === 0) {
        if (shape.lastCornerX === 0) {
          ctx.fillRect(0, 0, shape.startPosX, shape.firstCornerY);
        } else if (shape.lastCornerX === canvas.width) {
          ctx.fillRect(
            shape.startPosX,
            shape.startPosY,
            canvas.width - shape.startPosX,
            shape.lastCornerY
          );
        }
      }
      if (shape.startPosY === canvas.height) {
        if (shape.lastCornerX === 0) {
          ctx.fillRect(
            shape.lastCornerX,
            shape.lastCornerY,
            shape.firstCornerX,
            canvas.height - shape.firstCornerY
          );
        } else if (shape.lastCornerX === canvas.width) {
          ctx.fillRect(
            shape.firstCornerX,
            shape.firstCornerY,
            canvas.width - shape.firstCornerX,
            canvas.height - shape.lastCornerY
          );
        }
      }
    } else if (Object.keys(shape).length === 8) {
      if (shape.startPosX === 0) {
        if (shape.lastCornerX === 0 && shape.startPosY > shape.lastCornerY) {
          ctx.fillRect(
            shape.lastCornerX,
            shape.lastCornerY,
            shape.secondCornerX,
            shape.startPosY - shape.lastCornerY
          );
        } else if (
          shape.lastCornerX === 0 &&
          shape.startPosY < shape.lastCornerY
        ) {
          ctx.fillRect(
            shape.startPosX,
            shape.startPosY,
            shape.secondCornerX,
            shape.lastCornerY - shape.startPosY
          );
        } else if (
          shape.startPosX === 0 &&
          shape.lastCornerX === canvas.width
        ) {
          if (shape.startPosY < canvas.height / 2) {
            ctx.beginPath();
            ctx.moveTo(shape.startPosX, shape.startPosY);
            ctx.lineTo(shape.firstCornerX, shape.firstCornerY);
            ctx.lineTo(shape.secondCornerX, shape.secondCornerY);
            ctx.lineTo(shape.lastCornerX, shape.lastCornerY);
            ctx.lineTo(canvas.width, 0);
            ctx.lineTo(0, 0);
            ctx.lineTo(shape.startPosX, shape.startPosY);
            ctx.fill();
          } else {
            ctx.beginPath();
            ctx.moveTo(shape.startPosX, shape.startPosY);
            ctx.lineTo(shape.firstCornerX, shape.firstCornerY);
            ctx.lineTo(shape.secondCornerX, shape.secondCornerY);
            ctx.lineTo(shape.lastCornerX, shape.lastCornerY);
            ctx.lineTo(canvas.width, canvas.height);
            ctx.lineTo(0, canvas.height);
            ctx.lineTo(shape.startPosX, shape.startPosY);
            ctx.fill();
          }
        }
      } else if (shape.startPosX === canvas.width) {
        if (
          shape.lastCornerX === canvas.width &&
          shape.startPosY > shape.lastCornerY
        ) {
          ctx.fillRect(
            shape.secondCornerX,
            shape.secondCornerY,
            canvas.width - shape.secondCornerX,
            shape.startPosY - shape.lastCornerY
          );
        } else if (
          shape.lastCornerX === canvas.width &&
          shape.startPosY < shape.lastCornerY
        ) {
          ctx.fillRect(
            shape.firstCornerX,
            shape.firstCornerY,
            canvas.width - shape.firstCornerX,
            shape.lastCornerY - shape.startPosY
          );
        } else if (
          shape.startPosX === canvas.width &&
          shape.lastCornerX === 0
        ) {
          if (shape.startPosY < canvas.height / 2) {
            ctx.beginPath();
            ctx.moveTo(shape.startPosX, shape.startPosY);
            ctx.lineTo(shape.firstCornerX, shape.firstCornerY);
            ctx.lineTo(shape.secondCornerX, shape.secondCornerY);
            ctx.lineTo(shape.lastCornerX, shape.lastCornerY);
            ctx.lineTo(0, 0);
            ctx.lineTo(canvas.width, 0);
            ctx.lineTo(shape.startPosX, shape.startPosY);
            ctx.fill();
          } else {
            ctx.beginPath();
            ctx.moveTo(shape.startPosX, shape.startPosY);
            ctx.lineTo(shape.firstCornerX, shape.firstCornerY);
            ctx.lineTo(shape.secondCornerX, shape.secondCornerY);
            ctx.lineTo(shape.lastCornerX, shape.lastCornerY);
            ctx.lineTo(0, canvas.height);
            ctx.lineTo(canvas.width, canvas.height);
            ctx.lineTo(shape.startPosX, shape.startPosY);
            ctx.fill();
          }
        }
      } else if (shape.startPosY === 0) {
        if (shape.lastCornerY === 0 && shape.startPosX < shape.lastCornerX) {
          ctx.fillRect(
            shape.startPosX,
            shape.startPosY,
            shape.lastCornerX - shape.startPosX,
            shape.firstCornerY
          );
        } else if (
          shape.lastCornerY === 0 &&
          shape.startPosX > shape.lastCornerX
        ) {
          ctx.fillRect(
            shape.lastCornerX,
            shape.lastCornerY,
            shape.startPosX - shape.lastCornerX,
            shape.firstCornerY
          );
        } else if (
          shape.startPosY === 0 &&
          shape.lastCornerY === canvas.height
        ) {
          if (shape.startPosX < canvas.width / 2) {
            ctx.beginPath();
            ctx.moveTo(shape.startPosX, shape.startPosY);
            ctx.lineTo(shape.firstCornerX, shape.firstCornerY);
            ctx.lineTo(shape.secondCornerX, shape.secondCornerY);
            ctx.lineTo(shape.lastCornerX, shape.lastCornerY);
            ctx.lineTo(0, canvas.height);
            ctx.lineTo(0, 0);
            ctx.lineTo(shape.startPosX, shape.startPosY);
            ctx.fill();
          } else {
            ctx.beginPath();
            ctx.moveTo(shape.startPosX, shape.startPosY);
            ctx.lineTo(shape.firstCornerX, shape.firstCornerY);
            ctx.lineTo(shape.secondCornerX, shape.secondCornerY);
            ctx.lineTo(shape.lastCornerX, shape.lastCornerY);
            ctx.lineTo(canvas.width, canvas.height);
            ctx.lineTo(canvas.width, 0);
            ctx.lineTo(shape.startPosX, shape.startPosY);
            ctx.fill();
          }
        }
      } else if (shape.startPosY === canvas.height) {
        if (
          shape.lastCornerY === canvas.height &&
          shape.startPosX < shape.lastCornerX
        ) {
          ctx.fillRect(
            shape.firstCornerX,
            shape.firstCornerY,
            shape.lastCornerX - shape.firstCornerX,
            canvas.height - shape.firstCornerY
          );
        } else if (
          shape.lastCornerY === canvas.height &&
          shape.startPosX > shape.lastCornerX
        ) {
          ctx.fillRect(
            shape.secondCornerX,
            shape.secondCornerY,
            shape.firstCornerX - shape.secondCornerX,
            canvas.height - shape.firstCornerY
          );
        } else if (
          shape.startPosY === canvas.height &&
          shape.lastCornerY === 0
        ) {
          if (shape.startPosX < canvas.width / 2) {
            ctx.beginPath();
            ctx.moveTo(shape.startPosX, shape.startPosY);
            ctx.lineTo(shape.firstCornerX, shape.firstCornerY);
            ctx.lineTo(shape.secondCornerX, shape.secondCornerY);
            ctx.lineTo(shape.lastCornerX, shape.lastCornerY);
            ctx.lineTo(0, 0);
            ctx.lineTo(0, canvas.height);
            ctx.lineTo(shape.startPosX, shape.startPosY);
            ctx.fill();
          } else {
            ctx.beginPath();
            ctx.moveTo(shape.startPosX, shape.startPosY);
            ctx.lineTo(shape.firstCornerX, shape.firstCornerY);
            ctx.lineTo(shape.secondCornerX, shape.secondCornerY);
            ctx.lineTo(shape.lastCornerX, shape.lastCornerY);
            ctx.lineTo(canvas.width, 0);
            ctx.lineTo(canvas.width, canvas.height);
            ctx.lineTo(shape.startPosX, shape.startPosY);
            ctx.fill();
          }
        }
      }
    }
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
  intersectShapes(ball, shapes);
  checkBallLineCollision();
}, 1000 / 120);
