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

  saveCurrentPosition() {
    if (
      pen.lastCornerX > 0 ||
      pen.lastCornerX < canvas.width ||
      pen.lastCornerY < canvas.height ||
      pen.lastCornerY > 0
    ) {
      penCurrentPosition.push({
        x: this.lastCornerX,
        y: this.lastCornerY,
      });
    }
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
      if (this.startPosX === 0) {
        if (this.startPosY > canvas.height / 2) {
          shapes.push({
            x: this.startPosX,
            y: this.startPosY,
            width: canvas.width,
            height: canvas.height - this.startPosY,
          });
          this.turnCounter = null;
        } else if (this.startPosY <= canvas.height / 2) {
          shapes.push({
            x: 0,
            y: 0,
            width: canvas.width,
            height: this.startPosY,
          });
          this.turnCounter = null;
        }
      } else if (this.startPosX === canvas.width) {
        if (this.startPosY > canvas.height / 2) {
          shapes.push({
            x: this.lastCornerX,
            y: this.lastCornerY,
            width: canvas.width,
            height: canvas.height - this.startPosY,
          });
          this.turnCounter = null;
        } else if (this.startPosY <= canvas.height / 2) {
          shapes.push({
            x: 0,
            y: 0,
            width: canvas.width,
            height: this.startPosY,
          });
          this.turnCounter = null;
        }
      } else if (this.startPosY === 0) {
        if (this.startPosX > canvas.width / 2) {
          shapes.push({
            x: this.startPosX,
            y: this.startPosY,
            width: canvas.width - this.startPosX,
            height: canvas.height,
          });
          this.turnCounter = null;
        } else if (this.startPosX <= canvas.width / 2) {
          shapes.push({
            x: 0,
            y: 0,
            width: this.startPosX,
            height: canvas.height,
          });
          this.turnCounter = null;
        }
      } else if (this.startPosY === canvas.height) {
        if (this.startPosX > canvas.width / 2) {
          shapes.push({
            x: this.lastCornerX,
            y: this.lastCornerY,
            width: canvas.width - this.startPosX,
            height: canvas.height,
          });
          this.turnCounter = null;
        } else if (this.startPosX <= canvas.width / 2) {
          shapes.push({
            x: 0,
            y: 0,
            width: this.startPosX,
            height: canvas.height,
          });
          this.turnCounter = null;
        }
      }
    } else if (this.turnCounter === 1) {
      if (this.startPosX === 0) {
        if (this.lastCornerY === 0) {
          shapes.push({
            x: 0,
            y: 0,
            width: this.firstCornerX,
            height: this.firstCornerY,
          });
          this.turnCounter = null;
        } else if (this.lastCornerY === canvas.height) {
          shapes.push({
            x: this.startPosX,
            y: this.startPosY,
            width: this.lastCornerX,
            height: canvas.height - this.firstCornerY,
          });
          this.turnCounter = null;
        }
      }
      if (this.startPosX === canvas.width) {
        if (this.lastCornerY === 0) {
          shapes.push({
            x: this.lastCornerX,
            y: this.lastCornerY,
            width: canvas.width - this.firstCornerX,
            height: this.firstCornerY,
          });
          this.turnCounter = null;
        } else if (this.lastCornerY === canvas.height) {
          shapes.push({
            x: this.firstCornerX,
            y: this.firstCornerY,
            width: canvas.width - this.firstCornerX,
            height: this.firstCornerY,
          });
          this.turnCounter = null;
        }
      }
      if (this.startPosY === 0) {
        if (this.lastCornerX === 0) {
          shapes.push({
            x: 0,
            y: 0,
            width: this.firstCornerX,
            height: this.firstCornerY,
          });
          this.turnCounter = null;
        } else if (this.lastCornerX === canvas.width) {
          shapes.push({
            x: this.startPosX,
            y: this.startPosY,
            width: canvas.width - this.startPosX,
            height: this.lastCornerY,
          });
          this.turnCounter = null;
        }
      }
      if (this.startPosY === canvas.height) {
        if (this.lastCornerX === 0) {
          shapes.push({
            x: this.lastCornerX,
            y: this.lastCornerY,
            width: this.firstCornerX,
            height: canvas.height - this.firstCornerY,
          });
          this.turnCounter = null;
        } else if (this.lastCornerX === canvas.width) {
          shapes.push({
            x: this.firstCornerX,
            y: this.firstCornerY,
            width: canvas.width - this.firstCornerX,
            height: canvas.height - this.firstCornerY,
          });
          this.turnCounter = null;
        }
      }
    } else if (this.turnCounter === 2) {
      if (this.startPosX === 0) {
        if (this.lastCornerX === 0 && this.startPosY > this.lastCornerY) {
          shapes.push({
            x: this.lastCornerX,
            y: this.lastCornerY,
            width: this.secondCornerX,
            height: this.startPosY - this.lastCornerY,
          });
          this.turnCounter = null;
        } else if (
          this.lastCornerX === 0 &&
          this.startPosY < this.lastCornerY
        ) {
          shapes.push({
            x: this.startPosX,
            y: this.startPosY,
            width: this.secondCornerX,
            height: this.lastCornerY - this.startPosY,
          });
          this.turnCounter = null;
        } else if (this.startPosX === 0 && this.lastCornerX === canvas.width) {
          if (this.startPosY < canvas.height / 2) {
            shapes.push(
              {
                x: 0,
                y: 0,
                width: this.firstCornerX,
                height: this.firstCornerY,
              },
              {
                x: this.firstCornerX,
                y: 0,
                width: canvas.width - this.firstCornerX,
                height: Math.abs(this.secondCornerY - canvas.height),
              }
            );
            this.turnCounter = null;
          } else {
            shapes.push(
              {
                x: this.startPosX,
                y: this.startPosY,
                width: this.firstCornerX,
                height: canvas.height - this.firstCornerY,
              },
              {
                x: this.secondCornerX,
                y: this.secondCornerY,
                width: canvas.width - this.firstCornerX,
                height: Math.abs(this.secondCornerY - canvas.height),
              }
            );
            this.turnCounter = null;
          }
        }
      } else if (this.startPosX === canvas.width) {
        if (
          this.lastCornerX === canvas.width &&
          this.startPosY > this.lastCornerY
        ) {
          shapes.push({
            x: this.secondCornerX,
            y: this.secondCornerY,
            width: canvas.width - this.firstCornerX,
            height: this.firstCornerY - this.secondCornerY,
          });
          this.turnCounter = null;
        } else if (
          this.lastCornerX === canvas.width &&
          this.startPosY < this.lastCornerY
        ) {
          shapes.push({
            x: this.firstCornerX,
            y: this.firstCornerY,
            width: canvas.width - this.firstCornerX,
            height: this.secondCornerY - this.firstCornerY,
          });
          this.turnCounter = null;
        } else if (this.startPosX === canvas.width && this.lastCornerX === 0) {
          if (shape.startPosY < canvas.height / 2) {
            shapes.push(
              {
                x: 0,
                y: 0,
                width: this.firstCornerX,
                height: this.firstCornerY,
              },
              {
                x: this.firstCornerX,
                y: this.firstCornerX,
                width: canvas.width - this.firstCornerX,
                height: canvas.height - this.secondCornerY,
              }
            );
            this.turnCounter = null;
          } else {
            shapes.push(
              {
                x: this.lastCornerX,
                y: this.lastCornerY,
                width: this.secondCornerX,
                height: canvas.height - this.secondCornerY,
              },
              {
                x: this.firstCornerX,
                y: this.firstCornerY,
                width: canvas.width - this.firstCornerX,
                height: canvas.height - this.firstCornerY,
              }
            );
            this.turnCounter = null;
          }
        }
      } else if (this.startPosY === 0) {
        if (this.lastCornerY === 0 && this.startPosX < this.lastCornerX) {
          shapes.push({
            x: this.startPosX,
            y: this.startPosY,
            width: this.lastCornerX - this.firstCornerX,
            height: this.firstCornerY,
          });
          this.turnCounter = null;
        } else if (
          shape.lastCornerY === 0 &&
          shape.startPosX > shape.lastCornerX
        ) {
          shapes.push({
            x: this.lastCornerX,
            y: this.lastCornerY,
            width: this.startPosX - this.lastCornerX,
            height: this.firstCornerY,
          });
          this.turnCounter = null;
        } else if (
          shape.startPosY === 0 &&
          shape.lastCornerY === canvas.height
        ) {
          if (shape.startPosX < canvas.width / 2) {
            shapes.push(
              {
                x: 0,
                y: 0,
                width: this.startPosX,
                height: this.firstCornerY,
              },
              {
                x: 0,
                y: this.firstCornerY,
                width: this.firstCornerX,
                height: canvas.height - this.firstCornerY,
              }
            );
            this.turnCounter = null;
          } else {
            shapes.push(
              {
                x: this.startPosX,
                y: this.startPosY,
                width: canvas.width - this.startPosX,
                height: this.firstCornerY,
              },
              {
                x: this.firstCornerX,
                y: this.firstCornerX,
                width: canvas.width - this.firstCornerX,
                height: canvas.height - this.firstCornerY,
              }
            );
            this.turnCounter = null;
          }
        }
      } else if (this.startPosY === canvas.height) {
        if (
          this.lastCornerY === canvas.height &&
          this.startPosX < this.lastCornerX
        ) {
          shapes.push({
            x: this.firstCornerX,
            y: this.firstCornerY,
            width: this.lastCornerX - this.firstCornerX,
            height: canvas.height - this.firstCornerY,
          });
          this.turnCounter = null;
        } else if (
          shape.lastCornerY === canvas.height &&
          shape.startPosX > shape.lastCornerX
        ) {
          shapes.push({
            x: this.secondCornerX,
            y: this.secondCornerY,
            width: this.firstCornerX - this.secondCornerX,
            height: canvas.height - this.firstCornerY,
          });
          this.turnCounter = null;
        } else if (
          shape.startPosY === canvas.height &&
          shape.lastCornerY === 0
        ) {
          if (shape.startPosX < canvas.width / 2) {
            shapes.push(
              {
                x: 0,
                y: this.firstCornerY,
                width: this.firstCornerX,
                height: canvas.height - this.firstCornerY,
              },
              {
                x: 0,
                y: 0,
                width: this.secondCornerX,
                height: this.secondCornerY,
              }
            );
            this.turnCounter = null;
          } else {
            shapes.push(
              {
                x: this.firstCornerY,
                y: this.firstCornerY,
                width: canvas.width - this.firstCornerX,
                height: canvas.height - this.firstCornerY,
              },
              {
                x: this.secondCornerX,
                y: 0,
                width: canvas.width - this.secondCornerX,
                height: this.secondCornerY,
              }
            );
            this.turnCounter = null;
          }
        }
      }
    }
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
