// Ball
//
// A class to define how a ball behaves. Including bouncing on the top
// and bottom edges of the canvas, going off the left and right sides,
// and bouncing off paddles.

// Ball constructor
//
// Sets the properties with the provided arguments
///////// NEW /////////
//challenge: add properties winningSide
function Ball(x, y, vx, vy, size, speed) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.size = size;
  this.speed = speed;
  this.winningSide = null;
}
///////// END NEW /////////
// update()
//
// Moves according to velocity, constrains y to be on screen,
// checks for bouncing on upper or lower edgs, checks for going
// off left or right side.
Ball.prototype.update = function() {
  // Update position with velocity
  this.x += this.vx;
  this.y += this.vy;

  // Constrain y position to be on screen
  this.y = constrain(this.y, 0, height - this.size);

  // Check for touching upper or lower edge and reverse velocity if so
  if (this.y === 0 || this.y + this.size === height) {
    this.vy = -this.vy;
    ///////// NEW /////////
    //play the sound of collisions
    beepSFX.play();
    ///////// END NEW /////////
  }
}

// isOffScreen()
//
// Checks if the ball has moved off the screen and, if so, returns true.
// Otherwise it returns false.
///////// NEW /////////
// change the if condition, if the ball has moved off the right side of screen,
// it will update winning side to rightPaddle, same for the left side.
Ball.prototype.isOffScreen = function() {
  // Check for going off the left side of creen and reset if so
  if (this.x + this.size < 0) {
    this.winningSide = "left";
    return true;
  }
  /// Check for going off the right side of creen and reset if so
  else if (this.x - this.size > width) {
    this.winningSide = "right";
    return true;
  } else {
    return false;
  }
}
///////// END NEW /////////
// display()
//
// Draw the ball as a rectangle on the screen
///////// NEW /////////
//display teemo Image instead of a rectangle
Ball.prototype.display = function() {
  image(teemoImage, this.x, this.y, this.size, this.size);
}
///////// END NEW /////////

// handleCollision(paddle)
//
// Check if this ball overlaps the paddle passed as an argument
// and if so reverse x velocity to bounce
Ball.prototype.handleCollision = function(paddle) {
  // Check if the ball overlaps the paddle on x axis
  if (this.x + this.size > paddle.x && this.x < paddle.x + paddle.w) {
    // Check if the ball overlaps the paddle on y axis
    if (this.y + this.size > paddle.y && this.y < paddle.y + paddle.h) {
      // If so, move ball back to previous position (by subtracting current velocity)
      this.x -= this.vx;
      this.y -= this.vy;
      // Reverse x velocity to bounce
      this.vx = -this.vx;
      ///////// NEW /////////
      //play the sound of collisions
      beepSFX.play();
      ///////// END NEW /////////
    }
  }
}

// reset()
//
// Set position back to the middle of the screen
///////// NEW /////////
// modify reset method() ball toward the paddle that won the most recent point
// with random Y velocity
Ball.prototype.reset = function() {
  this.x = width / 2;
  this.y = height / 2;
  this.vx = -this.vx;
  this.vy = map(random(0, 25), 0, 25, -this.speed, this.speed);
}
///////// END NEW /////////
