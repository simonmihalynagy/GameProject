const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const directions = ["Up", "Down", "Left", "Right"];

let shapes = [];

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


let ball = {
  startX : 
  startY : ball.startX
}

class Pen {
  constructor() {
    this.direction = directions[Math.floor(Math.random() * directions.length)];

    this.startPosX = null;
    this.startPosY = null;

    this.firstCornerX = null;
    this.firstCornerY = null;

    this.secondCornerX = null;
    this.secondCornerY = null;

    this.lastCornerX = null;
    this.lastCornerY = null;

    this.turnCounter = null;
  }

  pickRandomStart() {
    if (this.direction === "Up") {
      this.startPosX = Math.floor(Math.random() * (790 - 10) + 1);
      this.startPosY = canvas.height;
      this.firstCornerX = this.startPosX;
      this.firstCornerY = this.startPosY;
      this.secondCornerX = this.startPosX;
      this.secondCornerY = this.startPosY;
      this.lastCornerX = this.startPosX;
      this.lastCornerY = this.startPosY;
    } else if (this.direction === "Down") {
      this.startPosX = Math.floor(Math.random() * (790 - 10) + 1);
      this.startPosY = 0;
      this.firstCornerX = this.startPosX;
      this.firstCornerY = this.startPosY;
      this.secondCornerX = this.startPosX;
      this.secondCornerY = this.startPosY;
      this.lastCornerX = this.startPosX;
      this.lastCornerY = this.startPosY;
    }
    if (this.direction === "Right") {
      this.startPosX = 0;
      this.startPosY = Math.floor(Math.random() * (790 - 10) + 1);
      this.firstCornerX = this.startPosX;
      this.firstCornerY = this.startPosY;
      this.secondCornerX = this.startPosX;
      this.secondCornerY = this.startPosY;
      this.lastCornerX = this.startPosX;
      this.lastCornerY = this.startPosY;
    }
    if (this.direction === "Left") {
      this.startPosX = canvas.width;
      this.startPosY = Math.floor(Math.random() * (790 - 10) + 1);
      this.firstCornerX = this.startPosX;
      this.firstCornerY = this.startPosY;
      this.secondCornerX = this.startPosX;
      this.secondCornerY = this.startPosY;
      this.lastCornerX = this.startPosX;
      this.lastCornerY = this.startPosY;
    }
  }

  draw() {
    ctx.beginPath();

    ctx.moveTo(this.startPosX, this.startPosY);

    ctx.lineTo(this.firstCornerX, this.firstCornerY);

    ctx.moveTo(this.firstCornerX, this.firstCornerY);

    ctx.lineTo(this.secondCornerX, this.secondCornerY);

    ctx.moveTo(this.secondCornerX, this.secondCornerY);

    ctx.lineTo(this.lastCornerX, this.lastCornerY);
    ctx.stroke();
  }

  updateDirection(key) {
    this._turnCount();

    if (this.direction === "Down") {
      if (key === "ArrowLeft") {
        this.direction = "Left";
      } else if (key === "ArrowRight") {
        this.direction = "Right";
      } else if (key === "ArrowUp") {
        window.alert("You can't turn back");
      }
    }
    if (this.direction === "Right") {
      if (key === "ArrowUp") {
        this.direction = "Up";
      } else if (key === "ArrowDown") {
        this.direction = "Down";
      } else if (key === "ArrowLeft") {
        window.alert("You can't turn back");
      }
    }
    if (this.direction === "Up") {
      if (key === "ArrowLeft") {
        this.direction = "Left";
      } else if (key === "ArrowRight") {
        this.direction = "Right";
      } else if (key === "ArrowDown") {
        window.alert("You can't turn back");
      }
    }
    if (this.direction === "Left") {
      if (key === "ArrowUp") {
        this.direction = "Up";
      } else if (key === "ArrowDown") {
        this.direction = "Down";
      } else if (key === "ArrowRight") {
        window.alert("You can't turn back");
      }
    }
  }

  _turnCount() {
    this.turnCounter++;
  }
  _saveShape() {
    if (this.turnCounter === null) {
      shapes.push({
        startPosX: this.startPosX,
        startPosY: this.startPosY,
        lastCornerX: this.lastCornerX,
        lastCornerY: this.lastCornerY,
      });
    } else if (this.turnCounter === 1) {
      shapes.push({
        startPosX: this.startPosX,
        startPosY: this.startPosY,
        firstCornerX: this.firstCornerX,
        firstCornerY: this.firstCornerY,
        lastCornerX: this.lastCornerX,
        lastCornerY: this.lastCornerY,
      });
    } else if (this.turnCounter === 2) {
      shapes.push({
        startPosX: this.startPosX,
        startPosY: this.startPosY,
        firstCornerX: this.firstCornerX,
        firstCornerY: this.firstCornerY,
        secondCornerX: this.secondCornerX,
        secondCornerY: this.secondCornerY,
        lastCornerX: this.lastCornerX,
        lastCornerY: this.lastCornerY,
      });
    }
    console.log(shapes, "turnCounter:", pen.turnCounter);
  }

  updatePosition() {
    if (this.turnCounter === null) {
      switch (this.direction) {
        case "Down":
          this.firstCornerY += 1;

          break;
        case "Right":
          this.firstCornerX += 1;

          break;
        case "Up":
          this.firstCornerY -= 1;

          break;
        case "Left":
          this.firstCornerX -= 1;

          break;
      }
      this.secondCornerX = this.firstCornerX;
      this.secondCornerY = this.firstCornerY;
      this.lastCornerX = this.firstCornerX;
      this.lastCornerY = this.firstCornerY;
    } else if (this.turnCounter === 1) {
      switch (this.direction) {
        case "Down":
          this.secondCornerY += 1;

          break;
        case "Right":
          this.secondCornerX += 1;

          break;
        case "Up":
          this.secondCornerY -= 1;

          break;
        case "Left":
          this.secondCornerX -= 1;

          break;
      }
      this.lastCornerX = this.secondCornerX;
      this.lastCornerY = this.secondCornerY;
    } else if (this.turnCounter === 2) {
      switch (this.direction) {
        case "Down":
          this.lastCornerY += 1;

          break;
        case "Right":
          this.lastCornerX += 1;

          break;
        case "Up":
          this.lastCornerY -= 1;

          break;
        case "Left":
          this.lastCornerX -= 1;

          break;
      }
    }
  }
}

let pen = new Pen();

window.addEventListener("load", () => {
  pen.pickRandomStart();
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

  pen.updatePosition();
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
}, 1000 / 120);
