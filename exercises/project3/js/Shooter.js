// shooter constructor
//
// Sets the properties with the provided arguments
function Shooter(downKey, upKey, leftKey, rightKey, shooterSide) {
  this.x;
  this.y;
  this.velocity = 4;
  this.angle = 0;
  this.vx = 0;
  this.vy = 0;
  this.score = 3;
  this.size = 30;
  this.color1;
  this.color2;
  this.color3;
  this.color4;
  this.downKey = downKey;
  this.upKey = upKey;
  this.leftKey = leftKey;
  this.rightKey = rightKey;
  this.shooterSide = shooterSide;
  //for crushing
  this.crushAngle = 0;
  this.crushX;
  this.crushY;
  this.crushShift = 0;
  this.crushOpacity = 255;
  this.crushSwitch = false;
  this.crushSize = 40;
  //for health bar
  this.healthBarX;
  this.healthBarY;
  this.collisonSwitch = false;
}

//setup()
//
//setup the color ,position and angle
Shooter.prototype.setup = function() {
  if (this.shooterSide === "red") {
    this.color1 = color('#F14234');
    this.color2 = color('#B53227');
    this.color3 = color('#78211A');
    this.color4 = color('#3C110D');
    this.x = width / 4;
    this.y = height / 2;
    this.healthBarX = 30;
    this.healthBarY = 20;
  }
  if (this.shooterSide === "blue") {
    this.color1 = color('#3F4FFF');
    this.color2 = color('#2F3BBF');
    this.color3 = color('#202880');
    this.color4 = color('#101440');
    this.x = 3 * width / 4;
    this.y = height / 2;
    this.angle += 180;
    this.healthBarX = width - 30;
    this.healthBarY = 20;
  }
}

// update()
//
// rotate according to its angle and move forward or backward
Shooter.prototype.update = function() {
  this.vy = this.velocity * sin(this.angle);
  this.vx = this.velocity * cos(this.angle);
  if (keyIsDown(this.upKey)) {
    this.x += this.vx;
    this.y += this.vy;
  }
  if (keyIsDown(this.downKey)) {
    this.x -= this.vx;
    this.y -= this.vy;
  }
  if (keyIsDown(this.leftKey)) {
    this.angle -= 2.5;
  }
  if (keyIsDown(this.rightKey)) {
    this.angle += 2.5;
  }
  this.x = constrain(this.x, 0 + this.size / 2, width - this.size / 2);
  this.y = constrain(this.y, 0 + this.size / 2, height - this.size / 2);
  if (this.collisonSwitch === true) {
    this.score -= 1;
    this.collisonSwitch = false;
  }
  if (this.score < 1) {
    this.crushSwitch = true;
  }
}

// display()
//
// display shooter on screen
Shooter.prototype.display = function() {
  if (this.crushSwitch == false) {
    push();
    translate(this.x, this.y);
    //stroke(116, 127, 124);
    fill(this.color1);
    ellipse(0, 0, this.size + 10, this.size + 10);
    fill(this.color2);
    ellipse(0, 0, this.size, this.size);
    pop();
    push();
    translate(this.x, this.y);
    rotate(this.angle - 90);
    fill(this.color3);
    rect(0, 0, this.size / 4, this.size / 2);
    fill(this.color4);
    rect(0, 5 * this.size / 16, this.size / 4, this.size / 4);
    pop();
    this.crushX = this.x;
    this.crushY = this.y;
  } else {
    this.crush();
  }
}

//keyPressed()
//
//check user's input
Shooter.prototype.keyPressed = function() {
  if (this.crushSwitch === false) {
    if (this.shooterSide === "red") {
      if (keyCode === 32) {
        bulletRed.push(new Bullet(this.x, this.y, this.angle, "red"));
      }
    }
    if (this.shooterSide === "blue") {
      if (keyCode === 13) {
        bulletBlue.push(new Bullet(this.x, this.y, this.angle, "blue"));
      }
    }
  }
}

//crush()
//
//when bullet hit enemy it will crush
Shooter.prototype.crush = function() {
  for (this.crushAngle = 0; this.crushAngle < 360; this.crushAngle += 30) {
    push();
    translate(this.crushX, this.crushY);
    rotate(this.crushAngle);
    fill(255, 50, random(0, 255), this.crushOpacity);
    ellipse(0, this.crushShift, this.crushSize, this.crushSize);
    pop();
    this.crushShift += 0.03;
    this.crushOpacity -= 0.12;
    this.crushSize += 0.01;
  }
  if (this.crushOpacity <= 50) {
    gameOverSwitch = true;
  }
}

//displayHealth()
//
//display shooter's health
Shooter.prototype.displayHealth = function() {
  if (this.shooterSide === "red") {
    for (var i = 0; i < this.score * 55; i += 55) {
      push();
      fill(116, 221, 87);
      translate(this.healthBarX + i, this.healthBarY);
      rect(0, 0, 50, 30);
      pop();
    }
  }
  if (this.shooterSide === "blue") {
    for (var i = 0; i < this.score * 55; i += 55) {
      push();
      fill(116, 221, 87);
      translate(this.healthBarX - i, this.healthBarY);
      rect(0, 0, 50, 30);
      pop();
    }
  }
}
