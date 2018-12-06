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
  this.crushX;
  this.crushY;
  this.crushSwitch = false;
  this.harmful = true;

  this.explosion1 = new Explosion(this.x,this.y,random(1,360));
  this.explosion2 = new Explosion(this.x,this.y,random(1,360));
  this.explosion3 = new Explosion(this.x,this.y,random(1,360));
  this.explosion4 = new Explosion(this.x,this.y,random(1,360));
  this.explosion5 = new Explosion(this.x,this.y,random(1,360));
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
  if (this.velocity < 0.5 ) {
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
      this.explosion1.x = this.crushX;
      this.explosion1.y = this.crushY;
      this.explosion2.x = this.crushX;
      this.explosion2.y = this.crushY;
      this.explosion3.x = this.crushX;
      this.explosion3.y = this.crushY;
      this.explosion4.x = this.crushX;
      this.explosion4.y = this.crushY;
      this.explosion5.x = this.crushX;
      this.explosion5.y = this.crushY;
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
      this.explosion1.x = this.crushX;
      this.explosion1.y = this.crushY;
      this.explosion2.x = this.crushX;
      this.explosion2.y = this.crushY;
      this.explosion3.x = this.crushX;
      this.explosion3.y = this.crushY;
      this.explosion4.x = this.crushX;
      this.explosion4.y = this.crushY;
      this.explosion5.x = this.crushX;
      this.explosion5.y = this.crushY;
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
this.explosion1.update();
this.explosion1.display();
this.explosion2.update();
this.explosion2.display();
this.explosion3.update();
this.explosion3.display();
this.explosion4.update();
this.explosion4.display();
this.explosion5.update();
this.explosion5.display();
if(this.explosion5.alive == false)
this.alive == false;
}
