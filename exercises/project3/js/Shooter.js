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
  this.size = 60;
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
    this.color1 = color('#FF80B0');
    this.color2 = color('#FFE5EF');
    this.color3 = color('#FFB3CF');
    this.color4 = color('#FF4D90');
    this.x = width / 4;
    this.y = height / 2;
    this.healthBarX = 30;
    this.healthBarY = 20;
  }
  if (this.shooterSide === "blue") {
    this.color1 = color('#6DCCFF');
    this.color2 = color('#E2F5FF');
    this.color3 = color('#8BD6FF');
    this.color4 = color('#16AEFF');
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
  //for health bar
  if (this.collisonSwitch === true) {
    this.score -= 1;
    this.collisonSwitch = false;
  }
  if (this.score < 1) {
    shooterExplode.play();
    this.crushSwitch = true;
  }
  //for supplyCarte
  if (this.shooterSide === "red") {
    if (supplyCarteType1RedSwitch === true) {
      this.velocity *= 2;
    }
    if (supplyCarteType1RedSwitch === false) {
      this.velocity /= 2;
    }
  }
  if (this.shooterSide === "blue") {
    if (supplyCarteType1BlueSwitch === true) {
      this.velocity *= 2;
    }
    if (supplyCarteType1BlueSwitch === false) {
      this.velocity /= 2;
    }
  }
  //maximum velocity 8
  this.velocity = constrain(this.velocity, 4, 8);
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
        shooterRedMusic.play();
      }
    }
    if (this.shooterSide === "blue") {
      if (keyCode === 13) {
        bulletBlue.push(new Bullet(this.x, this.y, this.angle, "blue"));
        shooterBlueMusic.play();
      }
    }
  }
}

//crush()
//
//when bullet hit enemy it will crush
Shooter.prototype.crush = function() {
  if (this.shooterSide === "red") {
    for (this.crushAngle = 0; this.crushAngle < 360; this.crushAngle += 30) {
      push();
      translate(this.crushX, this.crushY);
      rotate(this.crushAngle);
      fill(random(150, 255), 50, random(0, 255), this.crushOpacity);
      ellipse(0, this.crushShift, this.crushSize, this.crushSize);
      pop();
      this.crushShift += 0.2;
      this.crushOpacity -= 0.10;
      this.crushSize += 0.2;
    }
    if (this.crushOpacity <= 50) {
      gameOverSwitch = true;
      startSwitch = false;
      titleSwitch = false;
      introSwitch = false;
    }
  }
  if (this.shooterSide === "blue") {
    for (this.crushAngle = 0; this.crushAngle < 360; this.crushAngle += 30) {
      push();
      translate(this.crushX, this.crushY);
      rotate(this.crushAngle);
      fill(50, random(0, 255), random(150, 255), this.crushOpacity);
      ellipse(0, this.crushShift, this.crushSize, this.crushSize);
      pop();
      this.crushShift += 0.2;
      this.crushOpacity -= 0.10;
      this.crushSize += 0.2;
    }
    if (this.crushOpacity <= 50) {
      gameOverSwitch = true;
      startSwitch = false;
      titleSwitch = false;
      introSwitch = false;
    }
  }

}

//displayHealth()
//
//display shooter's health
Shooter.prototype.displayHealth = function() {
  if (this.shooterSide === "red") {
    for (var i = 0; i < this.score * 55; i += 55) {
      push();
      fill(175, 227, 148);
      translate(this.healthBarX + i, this.healthBarY);
      rect(0, 0, 50, 30, 4);
      pop();
      push();
      fill(202, 237, 183);
      translate(this.healthBarX + i, this.healthBarY - 3);
      rect(0, 0, 42, 24, 4);
      pop();
    }
  }
  if (this.shooterSide === "blue") {
    for (var i = 0; i < this.score * 55; i += 55) {
      push();
      fill(175, 227, 148);
      translate(this.healthBarX - i, this.healthBarY);
      rect(0, 0, 50, 30, 4);
      pop();
      push();
      fill(202, 237, 183);
      translate(this.healthBarX - i, this.healthBarY - 3);
      rect(0, 0, 42, 24, 4);
      pop();
    }
  }
}
