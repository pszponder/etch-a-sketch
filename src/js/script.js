// ===============================
// SETUP CANVAS AND CANVAS CONTEXT
// ===============================

// Retrieve the canvas object
const canvas = document.querySelector("canvas");

// Retrieve the canvas 2D context object
const ctx = canvas.getContext("2d");

// Set the line width
ctx.lineWidth = 10;

// Set the movement speed of the arrow keys when drawing
// each press of an arrow button results in a line of
// drawSpeed pixels on the canvas in the given direction
const drawSpeed = 20;

// =====================
// CANVAS INITIALIZATION
// =====================

// Pick a random start location for the canvas
function start() {
  // Initialize start x and y positions
  const x = Math.floor(Math.random() * canvas.width);
  const y = Math.floor(Math.random() * canvas.height);

  // Create a dot on the canvas which represents where
  // the start is
  ctx.fillRect(x - ctx.lineWidth / 2, y - ctx.lineWidth / 2, 10, 10);

  // Begin new path / reset current path
  ctx.beginPath();
  ctx.moveTo(x, y);
  // ctx.lineTo(x + 20, y + 20);
  // ctx.lineTo(x + 50, y - 30);
  // ctx.closePath();
  // ctx.stroke();
  // ctx.fill();
  ctx.strokeStyle = randomHSL();
  // ctx.fillStyle = randomHSL();
  return [x, y];
}

let [x, y] = start();

// ===================
// CANVAS MANIPULATION
// ===================

// Create an event handler to control what happens when
// an arrow key is pressed
function arrowKeys(event) {
  const keyCode = event.keyCode;

  // Prevent default so that arrow keys don't move
  // the screen around
  if (keyCode === 37 || keyCode === 38 || keyCode === 39 || keyCode === 40) {
    event.preventDefault();
  }

  // Move Up
  if (keyCode === 38) {
    // Update value of y
    y -= drawSpeed;
  }
  // Move Down
  else if (keyCode === 40) {
    // Update value of y
    y += drawSpeed;
  }
  // Move Left
  else if (keyCode === 37) {
    // Update value of x
    x -= drawSpeed;
  }
  // Move Right
  else if (keyCode === 39) {
    // Update value of x
    x += drawSpeed;
  }

  // Add a new value to the path
  ctx.lineTo(x, y);

  // render the path on the canvas
  ctx.stroke();
}

// Create a function to clear the canvas and restart when the shake button is pressed
function clear() {
  console.log("cleared");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Start at a new random location to start drawing again
  [x, y] = start();
}

// Create a function to "shake" the canvas when the shake button is pressed and reset it
function shake() {
  canvas.classList.add("apply-shake");
}

// Create a function for picking a random HSL color
function randomHSL() {
  // Obtain a random number between 0 and 359
  // NOTE: 0 and 360 are the same
  const degree = Math.floor(Math.random() * 360);

  return `hsl(${degree}, 100%, 50%)`;
}

// Create function for changing color of canvas stroke
function changeColor() {}

// ===============
// EVENT LISTENERS
// ===============

// Add event listeners for key presses to the window object
document.addEventListener("keydown", arrowKeys);

// Add event listener to the shake button
const shakeBtn = document.querySelector(".shake");
shakeBtn.addEventListener("click", () => {
  shake();
  clear();
});

// Remove the shake class from the canvas after the animation has ended
canvas.addEventListener("animationend", (e) => {
  canvas.classList.remove("apply-shake");
});
