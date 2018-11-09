// Badball
//
// a new object of badball, badball will move randomly
// if user chatchbadball, user's paddle will slow down

// Badball constructor
//
// Sets the properties with the provided arguments
function Badball(x, y, size, speed) {
  this.x = x;
  this.y = y;
  this.vx;
  this.vy;
  this.size = size;
  this.speed = speed;
  this.timeX = 0;
  this.timeY = 0;
  this.badballCollisionSide = null;
}

// update()
//
// move the badball randomly and warp the screen
Badball.prototype.update = function() {
  this.vx = map(noise(this.timeX), 0, 1, -this.speed, this.speed);
  this.vy = map(noise(this.timeY), 0, 1, -this.speed, this.speed);
  this.x += this.vx;
  this.y += this.vy;
  this.timeX += 0.5;
  this.timeY += 1;
  if (this.x + this.size / 2 < 0) {
    this.x += width;
  }
  if (this.x - this.size / 2 > width) {
    this.x -= width;
  }
  if (this.y + this.size / 2 < 0) {
    this.y += height;
  }
  if (this.y - this.size / 2 > height) {
    this.y -= height;
  }
}

// display()
//
// Draw the Badball as deadstart image on screen
Badball.prototype.display = function(deadstartImage) {
  image(deadstartImage, this.x, this.y, this.size, this.size);
}

// handleCollision(paddle)
//
// Check if this Badball overlaps the paddle passed as an argument
// and if so paddle get slow and reset Badball
Badball.prototype.handleCollision = function(paddle) {
  // Check if the Badball overlaps the paddle on x axis
  if (this.x + this.size / 2 > (paddle.x - paddle.w / 2) && this.x < paddle.x + paddle.w / 2) {
    // Check if the ball overlaps the paddle on y axis
    if (this.y + this.size / 2 > (paddle.y - paddle.h / 2) && this.y < paddle.y + paddle.h / 2) {
      paddle.slower();
      this.reset();
      console.log(paddle.speed);
      pinaoSound5.play();
    }
  }
}

// reset()
//
// Set position back to the randome place of the screen
Badball.prototype.reset = function() {
  this.x = random(width / 4, 3 * width / 4);
  this.y = random(height / 4, 3 * height / 4);
}
