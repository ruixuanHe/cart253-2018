// Bullet
//
// A class to define how a bullet behaves. Including bullet's movement,

// bullet constructor
//
// Sets the properties with the provided arguments
function Bullet(x, y, angle, bulletSide) {
  this.x = x;
  this.y = y;
  this.size = 25;
  this.velocity = 7;
  this.angle = angle;
  this.vx = 0;
  this.vy = 0;
  this.opacity = 255;
  this.alive = true;
  this.bulletSide = bulletSide;
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
  this.velocity *= 0.998;
  if (this.velocity < 0.5 && this.velocity < 0.5) {
    this.opacity -= 5;
    if (this.opacity <= 0) this.alive = false;
  }
}

// display()
//
// display bullet on screen
Bullet.prototype.display = function() {
  if (this.bulletSide === "red") {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    fill(255, 145, 75, this.opacity);
    ellipse(0, 0, this.size + 5, this.size + 5);
    fill(255, 235, 75, this.opacity);
    ellipse(0, 0, this.size, this.size);
    pop();
  }
  if (this.bulletSide === "blue") {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    fill(75, 93, 255, this.opacity);
    ellipse(0, 0, this.size + 5, this.size + 5);
    fill(275, 183, 255, this.opacity);
    ellipse(0, 0, this.size, this.size);
    pop();
  }
}
