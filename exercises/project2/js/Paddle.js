// Paddle
//
// A class that defines how a paddle behaves, including the ability
// to specify the input keys to move it up and down

// Paddle constructor
//
// Sets the properties with the provided arguments or defaults
///////// NEW /////////
function Paddle(x, y, w, h, speed, downKey, upKey, paddleSide) {
  this.x = x;
  this.y = y;
  this.vx = 0;
  this.vy = 0;
  this.w = w;
  this.h = h;
  this.speed = speed;
  this.downKey = downKey;
  this.upKey = upKey;
  // add two variables of paddle
  this.score = 0;
  this.paddleSide = paddleSide;
}
///////// END NEW /////////

// handleInput()
//
// Check if the up or down keys are pressed and update velocity
// appropriately
Paddle.prototype.handleInput = function() {
  if (keyIsDown(this.upKey)) {
    this.vy = -this.speed;
  } else if (keyIsDown(this.downKey)) {
    this.vy = this.speed;
  } else {
    this.vy = 0;
  }
}

// update()
// Update y position based on velocity
// Constrain the resulting position to be within the canvas
Paddle.prototype.update = function() {
  this.y += this.vy;
  this.y = constrain(this.y, 0 + this.h / 2, height - this.h / 2);
}

///////// NEW /////////
// updateScore()
//
// challenge: update the socre of paddle depending on winning side
Paddle.prototype.updateScore = function() {
  //using constrain method to prevent value overflow
  if (ball.winningSide == "right" && this.paddleSide == "right") {
    this.score++;
    ball.winningSide = null;
  }
  if (ball.winningSide == "left" && this.paddleSide == "left") {
    this.score++;
    ball.winningSide = null;
  }
}
// displayScore()
//
// display the score at left up corner or right up corner depending on the side
//of paddle
Paddle.prototype.displayScore = function() {
  //push() and pop() method to store current setting
  push();
  fill(66, 244, 244);
  textSize(30);
  var gameScore = this.score;
  if (this.paddleSide == "right") {
    text(gameScore, 0.25 * width, 0.15 * height)
  }
  if (this.paddleSide == "left") {
    text(gameScore, 0.75 * width, 0.15 * height)
  }
  pop();
}
///////// END NEW /////////
// display()
//
// Draw the paddle as a rectangle on the screen
Paddle.prototype.display = function() {
  fill(255);
  rect(this.x, this.y, this.w, this.h, 20);
}
