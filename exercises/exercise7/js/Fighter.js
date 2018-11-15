// Fighter
//
// A class to define how a fighter behaves. Including fighter's movement, bullet
// bullet trigger

// Fighter constructor
//
// Sets the properties with the provided arguments
function Fighter(x, y, w, h) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.velocity = 5;
  this.angle = 0;
  this.vx = 0;
  this.vy = 0;
  this.trigger = false;
}

// update()
//
// Moves according to velocity, and its angle
Fighter.prototype.update = function() {
  this.vy = this.velocity * sin(this.angle);
  this.vx = this.velocity * cos(this.angle);
  if (keyIsDown(UP_ARROW)) {
    this.x += this.vx;
    this.y += this.vy;
  }
  if (keyIsDown(DOWN_ARROW)) {
    this.x -= this.vx;
    this.y -= this.vy;
  }
}

// handleCollision()
//
// LEFT_ARROW & RIGHT_ARROW will change the angle
Fighter.prototype.handleInput = function() {
  if (keyIsDown(LEFT_ARROW)) {
    this.angle -= 2.5;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    this.angle += 2.5;
  }
}

// display()
//
// display fighter on screen
Fighter.prototype.display = function() {
  push();
  translate(this.x, this.y);
  rotate(this.angle);
  rect(0, 0, this.w, this.h);
  translate(this.w / 2, 0);
  fill(255, 255, 255);
  rect(0, 0, this.w, this.h * 0.2);
  pop();
}

//keyPressed()
//
//check user's input 
Fighter.prototype.keyPressed = function() {
  if (keyCode === 32) {
    bullet.push(new Bullet(this.x, this.y, this.angle));
  }
}
