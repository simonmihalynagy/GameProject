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

    this.currentPosition = [];
  }

  saveCurrentPosition() {
    if (
      pen.lastCornerX > 0 ||
      pen.lastCornerX < canvas.width ||
      pen.lastCornerY < canvas.height ||
      pen.lastCornerY > 0
    ) {
      this.currentPosition.push({
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
    } else if (this.direction === "Right") {
      this.startPosX = 0;
      this.startPosY = Math.floor(Math.random() * (790 - 10) + 1);
      this.firstCornerX = this.startPosX;
      this.firstCornerY = this.startPosY;
      this.secondCornerX = this.startPosX;
      this.secondCornerY = this.startPosY;
      this.lastCornerX = this.startPosX;
      this.lastCornerY = this.startPosY;
    } else if (this.direction === "Left") {
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

  _hasMoved() {
    // checking if this is a completely new pen (in which case, don't jump)
    if (
      pen.lastCornerX >= 800 ||
      pen.lastCornerX <= 0 ||
      pen.lastCornerY >= 800 ||
      pen.lastCornerY <= 0
    ) {
      return false;
    } else {
      return true
    }
  }

  jumpThrough(shape) {
    if (!this._hasMoved()) {
      return
    }
    var { currentPosition, ...rest } = pen; console.table(rest) // debugging
    if (this.turnCounter === null) {
      if (this.direction === "Left") {
        this.firstCornerX -= shape.width - 5;
        this.secondCornerX = this.firstCornerX;
        this.lastCornerX = this.firstCornerX;
      } else if (this.direction === "Right") {
        this.firstCornerX += shape.width - 5;
        this.secondCornerX = this.firstCornerX;
        this.lastCornerX = this.firstCornerX;
      } else if (this.direction === "Up") {
        this.firstCornerY -= shape.height - 5;
        this.secondCornerY = this.firstCornerY;
        this.lastCornerY = this.firstCornerY;
      } else if (this.direction === "Down") {
        this.firstCornerY += shape.height - 5;
        this.secondCornerY = this.firstCornerY;
        this.lastCornerY = this.firstCornerY;
      }
    } else if (this.turnCounter === 1) {
      if (this.direction === "Left") {
        this.secondCornerX -= shape.width - 5;

        this.lastCornerX = this.secondCornerX;
      } else if (this.direction === "Right") {
        this.secondCornerX += shape.width - 5;

        this.lastCornerX = this.secondCornerX;
      } else if (this.direction === "Up") {
        this.secondCornerY -= shape.height - 5;

        this.lastCornerY = this.secondCornerY;
      } else if (this.direction === "Down") {
        this.secondCornerY += (shape.height - 5);

        this.lastCornerY = this.secondCornerY;
      }
    } else if (this.turnCounter === 2) {
      if (this.direction === "Left") {
        this.lastCornerX -= shape.width - 5;
      } else if (this.direction === "Right") {
        this.lastCornerX += shape.width - 5;
      } else if (this.direction === "Up") {
        this.lastCornerY -= shape.height - 5;
      } else if (this.direction === "Down") {
        this.lastCornerY += shape.height - 5;
      }
    }
  }

  shiftBy(pixels) {
    if (this.direction === "Up") {
      this.firstCornerY = canvas.height - pixels;

      this.secondCornerY = this.firstCornerY;

      this.lastCornerY = this.firstCornerY;
    } else if (this.direction === "Down") {
      this.firstCornerY = 0 + pixels;

      this.secondCornerY = this.firstCornerY;

      this.lastCornerY = this.firstCornerY;
    } else if (this.direction === "Right") {
      this.firstCornerX = 0 + pixels;

      this.secondCornerX = this.firstCornerX;

      this.lastCornerX = this.firstCornerX;
    } else if (this.direction === "Left") {
      this.firstCornerX = canvas.width - pixels;

      this.secondCornerX = this.firstCornerX;

      this.lastCornerX = this.firstCornerX;
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
    if (this.direction === "Down") {
      if (key === "ArrowLeft") {
        this.direction = "Left";
        this._turnCount();
      } else if (key === "ArrowRight") {
        this.direction = "Right";
        this._turnCount();
      } else if (key === "ArrowUp") {
        window.alert("You can't turn back");
      }
    }
    if (this.direction === "Right") {
      if (key === "ArrowUp") {
        this.direction = "Up";
        this._turnCount();
      } else if (key === "ArrowDown") {
        this.direction = "Down";
        this._turnCount();
      } else if (key === "ArrowLeft") {
        window.alert("You can't turn back");
      }
    }
    if (this.direction === "Up") {
      if (key === "ArrowLeft") {
        this.direction = "Left";
        this._turnCount();
      } else if (key === "ArrowRight") {
        this.direction = "Right";
        this._turnCount();
      } else if (key === "ArrowDown") {
        window.alert("You can't turn back");
      }
    }
    if (this.direction === "Left") {
      if (key === "ArrowUp") {
        this.direction = "Up";
        this._turnCount();
      } else if (key === "ArrowDown") {
        this.direction = "Down";
        this._turnCount();
      } else if (key === "ArrowRight") {
        window.alert("You can't turn back");
      }
    }
  }

  _turnCount() {
    this.turnCounter++;
    console.log(this.turnCounter);
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
        } else if (this.startPosY <= canvas.height / 2) {
          shapes.push({
            x: 0,
            y: 0,
            width: canvas.width,
            height: this.startPosY,
          });
        }
      } else if (this.startPosX === canvas.width) {
        if (this.startPosY > canvas.height / 2) {
          shapes.push({
            x: this.lastCornerX,
            y: this.lastCornerY,
            width: canvas.width,
            height: canvas.height - this.startPosY,
          });
        } else if (this.startPosY <= canvas.height / 2) {
          shapes.push({
            x: 0,
            y: 0,
            width: canvas.width,
            height: this.startPosY,
          });
        }
      } else if (this.startPosY === 0) {
        if (this.startPosX > canvas.width / 2) {
          shapes.push({
            x: this.startPosX,
            y: this.startPosY,
            width: canvas.width - this.startPosX,
            height: canvas.height,
          });
        } else if (this.startPosX <= canvas.width / 2) {
          shapes.push({
            x: 0,
            y: 0,
            width: this.startPosX,
            height: canvas.height,
          });
        }
      } else if (this.startPosY === canvas.height) {
        if (this.startPosX > canvas.width / 2) {
          shapes.push({
            x: this.lastCornerX,
            y: this.lastCornerY,
            width: canvas.width - this.startPosX,
            height: canvas.height,
          });
        } else if (this.startPosX <= canvas.width / 2) {
          shapes.push({
            x: 0,
            y: 0,
            width: this.startPosX,
            height: canvas.height,
          });
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
        } else if (this.lastCornerY === canvas.height) {
          shapes.push({
            x: this.startPosX,
            y: this.startPosY,
            width: this.lastCornerX,
            height: canvas.height - this.firstCornerY,
          });
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
        } else if (this.lastCornerY === canvas.height) {
          shapes.push({
            x: this.firstCornerX,
            y: this.firstCornerY,
            width: canvas.width - this.firstCornerX,
            height: canvas.height - this.firstCornerY,
          });
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
        } else if (this.lastCornerX === canvas.width) {
          shapes.push({
            x: this.startPosX,
            y: this.startPosY,
            width: canvas.width - this.startPosX,
            height: this.lastCornerY,
          });
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
        } else if (this.lastCornerX === canvas.width) {
          shapes.push({
            x: this.firstCornerX,
            y: this.firstCornerY,
            width: canvas.width - this.firstCornerX,
            height: canvas.height - this.firstCornerY,
          });
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
                height: this.secondCornerY,
              }
            );
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
                height: canvas.height - this.secondCornerY,
              }
            );
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
        } else if (this.startPosX === canvas.width && this.lastCornerX === 0) {
          if (this.startPosY < canvas.height / 2) {
            shapes.push(
              {
                x: 0,
                y: 0,
                width: this.firstCornerX,
                height: this.secondCornerY,
              },
              {
                x: this.firstCornerX,
                y: 0,
                width: canvas.width - this.firstCornerX,
                height: this.firstCornerY,
              }
            );
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
        } else if (
          this.lastCornerY === 0 &&
          this.startPosX > this.lastCornerX
        ) {
          shapes.push({
            x: this.lastCornerX,
            y: this.lastCornerY,
            width: this.startPosX - this.lastCornerX,
            height: this.firstCornerY,
          });
        } else if (this.startPosY === 0 && this.lastCornerY === canvas.height) {
          if (this.startPosX < canvas.width / 2) {
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
                width: this.secondCornerX,
                height: canvas.height - this.firstCornerY,
              }
            );
          } else {
            shapes.push(
              {
                x: this.startPosX,
                y: this.startPosY,
                width: canvas.width - this.startPosX,
                height: this.firstCornerY,
              },
              {
                x: this.secondCornerX,
                y: this.secondCornerY,
                width: canvas.width - this.secondCornerX,
                height: canvas.height - this.firstCornerY,
              }
            );
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
        } else if (
          this.lastCornerY === canvas.height &&
          this.startPosX > this.lastCornerX
        ) {
          shapes.push({
            x: this.secondCornerX,
            y: this.secondCornerY,
            width: this.firstCornerX - this.secondCornerX,
            height: canvas.height - this.firstCornerY,
          });
        } else if (this.startPosY === canvas.height && this.lastCornerY === 0) {
          if (this.startPosX < canvas.width / 2) {
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
          } else {
            shapes.push(
              {
                x: this.firstCornerX,
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
