// Explosion
//
// A class to define how a Explosion behaves. Including Explosion's movement,

// Explosion constructor
//
// Sets the properties with the provided arguments
function Explosion(x, y, angle) {
  this.x = x;
  this.y = y;
  this.size = 10;
  this.velocity = random(15, 20);
  this.opacity = 255;
  this.angle = angle;
  this.vx = 0;
  this.vy = 0;
  this.time = 0;
  this.alive = true;
}
// update()
//
// update Explosion's position
Explosion.prototype.update = function() {
  this.vy = this.velocity * sin(this.angle);
  this.vx = this.velocity * cos(this.angle);
  this.x += this.vx;
  this.y += this.vy;
  this.velocity *= 0.92;
  if (this.velocity < 2) {
    this.opacity -= 5;
    if (this.opacity <= 0) this.alive = false;
  }
}

// display()
//
// display Explosion on screen
Explosion.prototype.display = function() {
  push();
  fill(246, 207, 255, this.opacity);
  translate(this.x, this.y);
  rotate(this.angle);
  rect(0, 0, this.size, this.size);
  pop();
}
