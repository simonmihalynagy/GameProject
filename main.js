const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const startGameButton = document.querySelector("#startGameBut");
const resetButton = document.querySelector("#resetBut");

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

    if (
      (pen.direction === "Left" && penX === shapeRight) ||
      (pen.direction === "Right" && penX === shapeLeft)
    ) {
      if (penY >= shapeTop && penY <= shapeBottom) {
        //var { currentPosition, ...rest } = pen;
        //console.table(rest);
        //console.table(shape); // debugging
        pen.jumpThrough(shape);
        //var { currentPosition, ...rest } = pen;
        //console.table(rest);
        //console.table(shape); // debugging
        return true;
      }
    }
    if (
      (pen.direction === "Down" && penY === shapeTop) ||
      (pen.direction === "Up" && penY === shapeBottom)
    ) {
      if (penX >= shapeLeft && penX <= shapeRight) {
        //var { currentPosition, ...rest } = pen;
        //console.table(rest);
        //console.table(shape); // debugging
        pen.jumpThrough(shape);
        //var { currentPosition, ...rest } = pen;
        //console.table(rest);
        //console.table(shape); // debugging

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
    this.width = 30;
    this.height = 20;
    this.xSpeed = 1;
    this.ySpeed = 1;
    this.img = new Image();
    this.img.src = "/pictures/piggy.png";
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
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}

let drawShapes = function (shapes) {
  //ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
  shapes.forEach((shape) => {
    ctx.fillRect(shape.x, shape.y, shape.width, shape.height);
  });
};

let pen = new Pen();
let ball = new Ball();

// this is pretty much the same as for ball-shape collision check .. so ball-shape collision check could probably re-use this code
const checkShapeCollision = (obj) => {
  return shapes.find((shape) => {
    let objLeft = obj.x;
    let objRight = obj.x + obj.width;
    let objTop = obj.y;
    let objBottom = obj.y + obj.height;
    let shapeLeft = shape.x;
    let shapeRight = shape.x + shape.width;
    let shapeTop = shape.y;
    let shapeBottom = shape.y + shape.height;

    if (objLeft === shapeRight || objRight === shapeLeft) {
      if (objBottom >= shapeTop && objTop <= shapeBottom)
        ball.xSpeed = -ball.xSpeed;
    }
    if (objTop === shapeBottom || objBottom === shapeTop) {
      if (objRight >= shapeLeft && objLeft <= shapeRight) {
        ball.ySpeed = -ball.ySpeed;
      }
    }
    if (
      objLeft > shapeLeft &&
      objRight < shapeRight &&
      objTop > shapeTop &&
      objBottom < shapeBottom
    ) {
      return true;
    }
  });
};

const checkWin = () => {
  let totalMeshObjects = 0;
  let collidingMeshObjects = 0;
  for (let i = 40; i < canvas.width; i += 80) {
    for (let j = 40; j < canvas.width; j += 80) {
      totalMeshObjects++;

      const obj = { x: i, y: j, width: 5, height: 5 };
      //ctx.fillRect(obj.x, obj.y, obj.width, obj.height); // just for debugging
      if (checkShapeCollision(obj)) {
        collidingMeshObjects++;
      }
    }
  }
  if (collidingMeshObjects / totalMeshObjects > 0.7) {
    alert("Catched it!");

    gameOver = true;
    return true;
  } else {
    return false;
  }
};

const newPen = () => {
  //console.log("called new pen");
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
    //console.log("pixels", pixels);
    pen.shiftBy(pixels);
  }
};

let gameOver = false;

let gamestarted = false;

startGameButton.addEventListener("click", () => {
  if (gamestarted) return;
  gamestarted = true;
  newPen();
  ball = new Ball();

  ball._pickRandomStart();

  setInterval(() => {
    if (gameOver) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ball._move();
    ball._draw();

    pen.updatePosition();
    pen.saveCurrentPosition();
    pen.draw();
    if (pen.turnCounter === null) {
      if (pen.startPosX === 0 && pen.lastCornerX === 800) {
        pen._saveShape();
        checkWin();
        newPen();
      } else if (pen.startPosX === 800 && pen.lastCornerX === 0) {
        pen._saveShape();
        checkWin();
        newPen();
      } else if (pen.startPosY === 0 && pen.lastCornerY === 800) {
        pen._saveShape();
        checkWin();
        newPen();
      } else if (pen.startPosY === 800 && pen.lastCornerY === 0) {
        pen._saveShape();
        checkWin();
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
        checkWin();
        newPen();
      }
    }
    drawShapes(shapes);
    checkBallLineCollision();
    checkBallWallsCollision();
    checkPenShapeCollision();
    checkBallShapeCollision();
  }, 1000 / 120);
});

resetButton.addEventListener("click", () => window.location.reload());

window.addEventListener("keydown", (event) => {
  if (pen.turnCounter < 2 && event.key.includes("Arrow")) {
    pen.updateDirection(event.key);
  } else if (pen.turnCounter <= 2 && !event.key.includes("Arrow")) {
    window.alert("Use your arrow keys please!");
  } else if (pen.turnCounter >= 2 && event.key.includes("Arrow")) {
    window.alert("You can't turn more than twice");
  }
});
