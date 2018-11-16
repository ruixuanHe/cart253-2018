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
  //time and if statement is using for better animation of bullet
  this.time++;
  if (this.time >= 2) {
    this.velocity = 10;
  }
}

// display()
//
// display bullet on screen
Bullet.prototype.display = function() {
  ellipse(this.x, this.y, this.size, this.size);
}

//bounceBullet()
//
//reverse bullet's angle when it touch the upper and bottom screen
Bullet.prototype.bounceBullet = function() {
  if (this.y - this.size / 2 < 0) {
    this.angle = -this.angle;
  }
  if (this.y + this.size / 2 > height) {
    this.angle = -this.angle;
  }
}

//biggerBullet()
//
//change bullet's size
Bullet.prototype.biggerBullet = function() {
  this.size = 100;
}

//fasterBullet()
//
//change bullet's velocity
Bullet.prototype.fasterBullet = function() {
  this.velocity = 80;
}
