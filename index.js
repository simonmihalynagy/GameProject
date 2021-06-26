const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const directions = ["Up", "Down", "Left", "Right"];

let shapes = [];

let drawShapes = (shapes) => {
  shapes.map((shape) =>
    ctx.fillRect(
      shape.startPosX,
      shape.startPosY,
      Math.abs(shape.startPosX - canvas.width),
      Math.abs(shape.startPosY - canvas.height)
    )
  );
};

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
      this.startPosY = 800;
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
      this.startPosX = 800;
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
          this.firstCornerY += 2;

          break;
        case "Right":
          this.firstCornerX += 2;

          break;
        case "Up":
          this.firstCornerY -= 2;

          break;
        case "Left":
          this.firstCornerX -= 2;

          break;
      }
      this.secondCornerX = this.firstCornerX;
      this.secondCornerY = this.firstCornerY;
      this.lastCornerX = this.firstCornerX;
      this.lastCornerY = this.firstCornerY;
    } else if (this.turnCounter === 1) {
      switch (this.direction) {
        case "Down":
          this.secondCornerY += 2;

          break;
        case "Right":
          this.secondCornerX += 2;

          break;
        case "Up":
          this.secondCornerY -= 2;

          break;
        case "Left":
          this.secondCornerX -= 2;

          break;
      }
      this.lastCornerX = this.secondCornerX;
      this.lastCornerY = this.secondCornerY;
    } else if (this.turnCounter === 2) {
      switch (this.direction) {
        case "Down":
          this.lastCornerY += 2;

          break;
        case "Right":
          this.lastCornerX += 2;

          break;
        case "Up":
          this.lastCornerY -= 2;

          break;
        case "Left":
          this.lastCornerX -= 2;

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
  drawShapes(shapes);
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
}, 1000 / 60);
