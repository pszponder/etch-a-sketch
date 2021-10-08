// ===============================
// SETUP CANVAS AND CANVAS CONTEXT
// ===============================

// Retrieve the canvas object
const canvas = document.querySelector("canvas");

// Retrieve the canvas 2D context object
const ctx = canvas.getContext("2d");

// Set the line width
ctx.lineWidth = 20;

// Use rounded edges when drawing lines (default is square);
ctx.lineJoin = "round";
ctx.lineCap = "round";

// Set the movement speed of the arrow keys when drawing
// each press of an arrow button results in a line of
// drawSpeed pixels on the canvas in the given direction
const drawSpeed = 20;

// Set the Hue color to 0
// This will be used to set the initial color of the cursor
let hue = Math.floor(Math.random() * 360);

// =====================
// CANVAS INITIALIZATION
// =====================

// Pick a random start location for the canvas
function start() {
  // Set initial stroke Color
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

  // Initialize start x and y positions
  const x = Math.floor(Math.random() * canvas.width);
  const y = Math.floor(Math.random() * canvas.height);

  // Create a dot on the canvas which represents where
  // the start is
  // ctx.fillRect(x - ctx.lineWidth / 2, y - ctx.lineWidth / 2, 10, 10);

  // Begin new path
  // This is creating the path start-point
  ctx.beginPath();
  ctx.moveTo(x, y);

  // Complete the new path (actually draw the dot on the canvas)
  // This is creating the path end-point
  ctx.lineTo(x, y);
  ctx.stroke();
  // ctx.lineTo(x + 20, y + 20);
  // ctx.lineTo(x + 50, y - 30);
  // ctx.closePath();
  // ctx.stroke();
  // ctx.fill();
  // ctx.strokeStyle = black;
  // ctx.fillStyle = coral;

  return [x, y];
}

let [x, y] = start();

// ===================
// CANVAS MANIPULATION
// ===================

// Create an event handler to control what happens when
// an arrow key is pressed
function arrowKeys(event) {
  // Start a new Path
  ctx.beginPath();
  ctx.moveTo(x, y);

  const keyCode = event.keyCode;

  // Prevent default so that arrow keys don't move
  // the screen around
  if (keyCode === 37 || keyCode === 38 || keyCode === 39 || keyCode === 40) {
    event.preventDefault();
  }

  // Move Up
  if (keyCode === 38) {
    y -= drawSpeed;
  }
  // Move Down
  else if (keyCode === 40) {
    y += drawSpeed;
  }
  // Move Left
  else if (keyCode === 37) {
    x -= drawSpeed;
  }
  // Move Right
  else if (keyCode === 39) {
    x += drawSpeed;
  }

  // Update stroke color
  hue += 2;
  ctx.strokeStyle = `hsl(${hue}, 100%, 45%)`;

  // Creat new path end-point
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
