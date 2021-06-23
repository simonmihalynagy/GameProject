const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const directions = ["Up", "Down", "Left", "Right"];

class Pen {
  constructor() {
    this.startPosX = 0;
    this.startPosY = 0;
    this.currentPosX = 0;
    this.currentPosY = 0;
    this.direction = directions[Math.floor(Math.random() * directions.length)];

    this.firstLineToX = 0;
    this.firstLineToY = 0;
  }

  pickRandomStart() {
    if (this.direction === "Up") {
      this.startPosX = Math.floor(Math.random() * (790 - 10) + 1);
      this.startPosY = 800;
      this.currentPosX = this.startPosX;
      this.currentPosY = this.startPosY;
    } else if (this.direction === "Down") {
      this.startPosX = Math.floor(Math.random() * (790 - 10) + 1);
      this.startPosY = 0;
      this.currentPosX = this.startPosX;
      this.currentPosY = this.startPosY;
    }
    if (this.direction === "Right") {
      this.startPosX = 0;
      this.startPosY = Math.floor(Math.random() * (790 - 10) + 1);
      this.currentPosX = this.startPosX;
      this.currentPosY = this.startPosY;
    }
    if (this.direction === "Left") {
      this.startPosX = 800;
      this.startPosY = Math.floor(Math.random() * (790 - 10) + 1);
      this.currentPosX = this.startPosX;
      this.currentPosY = this.startPosY;
    }
  }

  draw() {
    if (this.direction === "Down" || this.direction === "Left") {
      this.firstLineToX = this.currentPosX;
      this.firstLineToY = this.startPosY;
    } else {
      this.firstLineToX = this.startPosX;
      this.firstLineToY = this.currentPosY;
    }

    ctx.beginPath();

    ctx.moveTo(this.startPosX, this.startPosY);

    ctx.lineTo(this.firstLineToX, this.firstLineToY);

    ctx.lineTo(this.currentPosX, this.currentPosY);

    ctx.stroke();
  }

  updateDirection(key) {
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

  updatePosition() {
    switch (this.direction) {
      case "Down":
        this.currentPosY += 2;

        break;
      case "Right":
        this.currentPosX += 2;

        break;
      case "Up":
        this.currentPosY -= 2;

        break;
      case "Left":
        this.currentPosX -= 2;
        break;
    }
  }
}

let pen = new Pen();

window.addEventListener("load", () => {
  pen.pickRandomStart();
  console.log(pen);
});

setInterval(() => {
  // ctx.clearRect(0, 0, canvas.width, canvas.height);
  pen.updatePosition();
  console.log(pen);
  pen.draw();
}, 1000 / 60);
let frameCounter = 0;

window.addEventListener("keydown", (event) => {
  pen.updateDirection(event.key);
});
