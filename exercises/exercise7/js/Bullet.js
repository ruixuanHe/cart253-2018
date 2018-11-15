// Bullet
//
// A class to define how a bullet behaves. Including bullet's movement,

// bullet constructor
//
// Sets the properties with the provided arguments
function Bullet(x, y, angle) {
  this.x = x;
  this.y = y;
  this.size = 25;
  this.velocity = 65;
  this.angle = angle;
  this.vx = 0;
  this.vy = 0;
  this.time = 0;
}

// update()
//
// update bullet's position
Bullet.prototype.update = function() {
  this.vy = this.velocity * sin(this.angle);
  this.vx = this.velocity * cos(this.angle);
  this.x += this.vx;
  this.y += this.vy;
}

// display()
//
// display bullet on screen
Bullet.prototype.display = function() {
  ellipse(this.x, this.y, this.size, this.size);
  this.time += 1;
  if (this.time >= 2) {
    this.velocity = 10;
  }
}
