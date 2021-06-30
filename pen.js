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