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

  //for crushing
  this.crushAngle = 0;
  this.crushX;
  this.crushY;
  this.crushShift = 0;
  this.crushOpacity = 255;
  this.crushSwitch = false;
  this.harmful = true;


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
  if (this.crushSwitch == false) {
    if (this.bulletSide === "red") {
      push();
      translate(this.x, this.y);
      rotate(this.angle);
      fill(255, 145, 75, this.opacity);
      ellipse(0, 0, this.size + 5, this.size + 5);
      fill(255, 235, 75, this.opacity);
      ellipse(0, 0, this.size, this.size);
      pop();
      this.crushX = this.x;
      this.crushY = this.y;
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
      this.crushX = this.x;
      this.crushY = this.y;
    }
  } else {
    this.crush();
  }
}

Bullet.prototype.handleCollision = function(enemy) {
  if (enemy.constructor.name === "Bullet") {
    if (this.harmful == true && enemy.harmful == true) {
      if (dist(enemy.x, enemy.y, this.x, this.y) < (this.size / 2 + enemy.size / 2)) {
        enemy.crushSwitch = true;
        this.crushSwitch = true;
        enemy.harmful = false;
        this.harmful = false;
      }
    }
  }
  if (dist(enemy.x, enemy.y, this.x, this.y) < (this.size / 2 + enemy.size / 2)) {
    enemy.crushSwitch = true;
  }
}

//crush()
//
//when bullet hit enemy it will crush
Bullet.prototype.crush = function() {
  for (this.crushAngle = 0; this.crushAngle < 360; this.crushAngle += 45) {
    push();
    translate(this.crushX, this.crushY);
    rotate(this.crushAngle);
    fill(255, random(0, 255), 117, this.crushOpacity);
    ellipse(0, this.crushShift, 40, 40);
    pop();
    this.crushShift += 0.013;
    this.crushOpacity -= 0.04;
  }
  if (this.crushOpacity <= 5) {
    this.alive = false;
  }
}
