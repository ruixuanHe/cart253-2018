// Bullet
//
// A class to define how a bullet behaves. Including bullet's movement,

// bullet constructor
//
// Sets the properties with the provided arguments
function Bullet(x, y, angle) {
  this.size = 15;
  this.angle = angle;
  this.x = x;
  this.y = y;
  this.location = createVector(this.x, this.y);
  this.velocity = createVector(0, 0);
  this.acceleration = createVector(0, 0);
  this.initialForce = createVector(cos(this.angle), sin(this.angle));
  this.initialForce.mult(random(height / 8, height / 4));
  this.opacity = 255;
}

// update()
//
// update bullet's position
Bullet.prototype.update = function() {
  this.initialForce.mult(0.2);
  this.acceleration.add(this.initialForce);
  console.log(this.angle);
  this.velocity.add(this.acceleration);
  this.velocity.mult(0.92);
  this.location.add(this.velocity);
  this.acceleration.mult(0);
  if (this.velocity.x < 0.5 && this.velocity.y < 0.5) {
    this.opacity -= 5;
  }
}

// display()
//
// display bullet on screen
Bullet.prototype.display = function() {
  push();
  translate(this.location.x, this.location.y);
  rotate(this.angle);
  fill(255, 255, 255, this.opacity);
  ellipse(0, 0, this.size + 5, this.size + 5);
  fill(255, 200, 255, this.opacity);
  ellipse(0, 0, this.size, this.size);
  pop();
}

//screenWramp()
//
//when bullet reach the edge of the screen it will bounce
Bullet.prototype.screenWramp = function() {
  if (this.location.x < 0.0) {
    this.location.x = 0.0;
    this.velocity.x *= -1.0;
  }
  if (this.location.y < 0.0) {
    this.location.y = 0.0;
    this.velocity.y *= -1.0;
  }
  if (this.location.x > width) {
    this.location.x = width;
    this.velocity.x *= -1.0;
  }
  if (this.location.y > height) {
    this.location.y = height;
    this.velocity.y *= -1.0;
  }
}

Bullet.prototype.handleCollision = function(enemy) {
  if (dist(enemy.location.x, enemy.location.y, this.location.x, this.location.y) < (this.size / 2 + enemy.size / 2)) {
    enemy.crushSwitch = true;
  }
}
