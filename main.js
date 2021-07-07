const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let canvasArea = canvas.height * canvas.width;

const directions = ["Up", "Down", "Left", "Right"];

let shapes = [];

let checkBallLineCollision = () => {
  pen.currentPosition.map((position) => {
    if (
      (position.x === ball.x && position.y === ball.y) ||
      (position.x === ball.x && position.y === ball.y + ball.height) ||
      (position.x === ball.x + ball.width && position.y === ball.y + ball.width)
    ) {
      newPen();
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

// finds the shapes that are colliding when the pen ENTERS the shape (not inside or when "exiting")
let checkPenShapeCollision = () => {
  let collidingShapes = shapes.filter((shape) => {
    let shapeLeft = shape.x;
    let shapeRight = shape.x + shape.width;
    let shapeTop = shape.y;
    let shapeBottom = shape.y + shape.height;

    let penX = pen.lastCornerX;
    let penY = pen.lastCornerY;

    if ((pen.direction === "Left" && penX === shapeRight) || (pen.direction === "Right" && penX === shapeLeft)) {
      if (penY >= shapeTop && penY <= shapeBottom) {        
        // var { currentPosition, ...rest } = pen; console.table(rest); console.table(shape) // debugging
        pen.jumpThrough(shape);
        // var { currentPosition, ...rest } = pen; console.table(rest); console.table(shape) // debugging
        return true;
      }
    }
    if ((pen.direction === "Down" && penY === shapeTop) || (pen.direction === "Up" && penY === shapeBottom)) {
      if (penX >= shapeLeft && penX <= shapeRight) {
        // var { currentPosition, ...rest } = pen; console.table(rest); console.table(shape) // debugging
        pen.jumpThrough(shape);
        // var { currentPosition, ...rest } = pen; console.table(rest); console.table(shape) // debugging

        return true;
      }
    }
    return false;
  });
  return collidingShapes;
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

    if (ballLeft === shapeRight || ballRight === shapeLeft) {
      if (ballBottom >= shapeTop && ballTop <= shapeBottom)
        ball.xSpeed = -ball.xSpeed;
    }
    if (ballTop === shapeBottom || ballBottom === shapeTop) {
      if (ballRight >= shapeLeft && ballLeft <= shapeRight) {
        ball.ySpeed = -ball.ySpeed;
      }
    }
    if (
      ballLeft > shapeLeft &&
      ballRight < shapeRight &&
      ballTop > shapeTop &&
      ballBottom < shapeBottom
    ) {
      ball._pickRandomStart();
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
    //this.radius = 10;
  }
  _pickRandomStart() {
    this.x = Math.floor(Math.random() * (790 - 10) + 1);
    this.y = Math.floor(Math.random() * (790 - 10) + 1);
  }
  _move() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }
  _draw() {
    ctx.fillRect(this.x, this.y, this.width, this.height);
    // ctx.beginPath();
    // ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    // ctx.fill();
    // ctx.closePath();
  }
}

let drawShapes = function (shapes) {
  ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
  shapes.forEach((shape) => {
    ctx.fillRect(shape.x, shape.y, shape.width, shape.height);
  });
};

let pen = new Pen();
let ball = new Ball();

window.addEventListener("load", () => {
  newPen();
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

const newPen = () => {
  console.log("called new pen");
  pen = new Pen();
  pen.pickRandomStart();
  let collidingShapes = checkPenShapeCollision();

  if (collidingShapes.length > 0) {
    if (pen.direction === "Left" || pen.direction === "Right") {
      collidingShapes.sort((shape1, shape2) => {
        return shape2.width - shape1.width;
      });
    } else if (pen.direction === "Up" || "Down") {
      collidingShapes.sort((shape1, shape2) => {
        return shape2.height - shape1.height;
      });
    }

    let widestOrHighestShape = collidingShapes[0];

    if (pen.direction === "Up" || pen.direction === "Down") {
      if (widestOrHighestShape.height === canvas.height) {
        newPen();
        return;
      }
    } else if (pen.direction === "Right" || pen.direction === "Left") {
      if (widestOrHighestShape.width === canvas.width) {
        newPen();
        return;
      }
    }
    let pixels =
      pen.direction === "Up" || pen.direction === "Down"
        ? widestOrHighestShape.height
        : widestOrHighestShape.width;
    console.log("pixels", pixels);
    pen.shiftBy(pixels);
  }
};

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
      newPen();
    } else if (pen.startPosX === 800 && pen.lastCornerX === 0) {
      pen._saveShape();
      newPen();
    } else if (pen.startPosY === 0 && pen.lastCornerY === 800) {
      pen._saveShape();
      newPen();
    } else if (pen.startPosY === 800 && pen.lastCornerY === 0) {
      pen._saveShape();
      newPen();
    }
  } else if (pen.turnCounter >= 1) {
    if (
      pen.lastCornerX === 800 ||
      pen.lastCornerX === 0 ||
      pen.lastCornerY === 800 ||
      pen.lastCornerY === 0
    ) {
      pen._saveShape();
      newPen();
    }
  }
  drawShapes(shapes);
  checkBallLineCollision();
  checkBallWallsCollision();
  checkPenShapeCollision();
  checkBallShapeCollision();
}, 1000 / 120);
