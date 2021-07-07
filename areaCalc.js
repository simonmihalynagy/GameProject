let remainingArea = canvas.height * canvas.width;

let calcArea = (shape) => {
  return shape.width * shape.height;
};

let checkIfOverlap = (shapes) => {
  console.log(remainingArea);
  let lastShape = shapes[shapes.length - 1];
  if (shapes.length > 1) {
    for (let i = 0; i < shapes.length - 2; i++) {
      let currentShape = shapes[i];

      let maxOfLeft = Math.max(lastShape.x, currentShape.x);
      let minOfRight = Math.min(
        lastShape.x + lastShape.width,
        currentShape.x + currentShape.width
      );

      let maxOfTop = Math.max(lastShape.y, currentShape.y);
      let minOfBottom = Math.min(
        lastShape.y + lastShape.height,
        currentShape.y + currentShape.height
      );

      let xDistance = minOfRight - maxOfLeft;

      let yDistance = minOfBottom - maxOfTop;

      if (xDistance > 0 && yDistance > 0) {
        remainingArea -= calcArea(lastShape) - calcArea(currentShape);
      } else {
        remainingArea -= calcArea(lastShape);
      }
    }
  } else {
    remainingArea -= calcArea(lastShape);
  }
  console.log(remainingArea);
};

let checkGameOver = () => {
  if (remainingArea < remainingArea * (50 / 100)) {
    return true;
  } else {
    return false;
  }
};
