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
  this.y = constrain(this.y, 0, height);

  // Check for touching upper or lower edge and reverse velocity if so
  if (this.y - this.size / 2 < 0) {
    this.vy = -this.vy;
    pinaoSound2.play();
  }
  if (this.y + this.size / 2 > height) {
    this.vy = -this.vy;
    pinaoSound3.play();
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
  if (this.x + this.size / 2 < 0) {
    this.winningSide = "right";
    drumSound2.play();
    return true;
  }
  /// Check for going off the right side of creen and reset if so
  else if (this.x - this.size / 2 > width) {
    this.winningSide = "left";
    drumSound2.play();
    return true;
  } else {
    return false;
  }

}
///////// END NEW /////////

// display()
//
// Draw the ball as a rectangle on the screen
Ball.prototype.display = function(ballImage) {
  image(ballImage, this.x, this.y, this.size, this.size);
}

// handleCollision(paddle)
//
// Check if this ball overlaps the paddle passed as an argument
// and if so reverse x velocity to bounce
Ball.prototype.handleCollision = function(paddle) {
  // Check if the ball overlaps the paddle on x axis
  if (this.x + this.size / 2 > (paddle.x - paddle.w / 2) && this.x < paddle.x + paddle.w / 2) {
    // Check if the ball overlaps the paddle on y axis
    if (this.y + this.size / 2 > (paddle.y - paddle.h / 2) && this.y < paddle.y + paddle.h / 2) {
      // If so, move ball back to previous position (by subtracting current velocity)
      this.x -= this.vx;
      this.y -= this.vy;
      // Reverse x velocity to bounce
      this.vx = -this.vx;
      pinaoSound1.play();
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
  this.vy = map(random(0, 1), 0, 1, -this.speed, this.speed);
}
///////// END NEW /////////
