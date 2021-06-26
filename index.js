const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const directions = ["Up", "Down", "Left", "Right"];

let shapes = [];

class Pen {
  constructor() {
    this.direction = directions[Math.floor(Math.random() * directions.length)];

    this.startPosX = null;
    this.startPosY = null;

    this.firstCornerX = null;
    this.firstCornerY = null;

    this.secondCornerX = null;
    this.secondCornerY = null;

    this.endPosX = null;
    this.endPosY = null;

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
      this.endPosX = this.startPosX;
      this.endPosY = this.startPosY;
    } else if (this.direction === "Down") {
      this.startPosX = Math.floor(Math.random() * (790 - 10) + 1);
      this.startPosY = 0;
      this.firstCornerX = this.startPosX;
      this.firstCornerY = this.startPosY;
      this.secondCornerX = this.startPosX;
      this.secondCornerY = this.startPosY;
      this.endPosX = this.startPosX;
      this.endPosY = this.startPosY;
    }
    if (this.direction === "Right") {
      this.startPosX = 0;
      this.startPosY = Math.floor(Math.random() * (790 - 10) + 1);
      this.firstCornerX = this.startPosX;
      this.firstCornerY = this.startPosY;
      this.secondCornerX = this.startPosX;
      this.secondCornerY = this.startPosY;
      this.endPosX = this.startPosX;
      this.endPosY = this.startPosY;
    }
    if (this.direction === "Left") {
      this.startPosX = 800;
      this.startPosY = Math.floor(Math.random() * (790 - 10) + 1);
      this.firstCornerX = this.startPosX;
      this.firstCornerY = this.startPosY;
      this.secondCornerX = this.startPosX;
      this.secondCornerY = this.startPosY;
      this.endPosX = this.startPosX;
      this.endPosY = this.startPosY;
    }
  }

  draw() {
    ctx.beginPath();

    ctx.moveTo(this.startPosX, this.startPosY);

    ctx.lineTo(this.firstCornerX, this.firstCornerY);

    ctx.moveTo(this.firstCornerX, this.firstCornerY);

    ctx.lineTo(this.secondCornerX, this.secondCornerY);

    ctx.moveTo(this.secondCornerX, this.secondCornerY);

    ctx.lineTo(this.endPosX, this.endPosY);
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
      this.endPosX = this.firstCornerX;
      this.endPosY = this.firstCornerY;
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
      this.endPosX = this.secondCornerX;
      this.endPosY = this.secondCornerY;
    } else if (this.turnCounter === 2) {
      switch (this.direction) {
        case "Down":
          this.endPosY += 2;

          break;
        case "Right":
          this.endPosX += 2;

          break;
        case "Up":
          this.endPosY -= 2;

          break;
        case "Left":
          this.endPosX -= 2;
          break;
      }
    }
  }
}

let pen = new Pen();

window.addEventListener("load", () => {
  pen.pickRandomStart();
  console.log(pen);
});

window.addEventListener("keydown", (event) => {
  pen.updateDirection(event.key);
  console.log(JSON.stringify(pen));
});

setInterval(() => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  pen.updatePosition();
  pen.draw();
  console.log(JSON.stringify(pen));
}, 1000 / 60);
