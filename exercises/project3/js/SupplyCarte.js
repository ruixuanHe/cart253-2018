// SupplyCarte
//
// A class to define how a SupplyCarte behaves. Including SupplyCarte's movement,
// random carte brings 2 different effect of bullet, or shooter

// supplyCarte's constructor
//
// Sets the properties with the provided arguments
function SupplyCarte() {
  this.x = random(0, width);
  this.y = 0;
  this.size = 30;
  this.vx = 0;
  this.vy = 1;
  this.height = 0;
  this.type = int(random(1, 3));
  this.color = '255,255,255';
  this.alive = true;
}

// update()
//
// update SupplyCarte's position
SupplyCarte.prototype.update = function() {
  this.x += this.vx;
  this.y += this.vy;
  if (this.y > height - this.size / 2)
    this.alive = false;
}

//supplyCartType()
//
//find out the type of carte, type 1 shooter will have fastermovement
//type 2 will have bigger bullet effect
SupplyCarte.prototype.supplyCartType = function(shooter) {
  switch (this.type) {
    //faster movement
    case 1:
      if (shooter.shooterSide === "red") {
        supplyCarteType1RedSwitch = true;
      }
      if (shooter.shooterSide === "blue") {
        supplyCarteType1BlueSwitch = true;
      }
      break;
      //bigger bullet
    case 2:
      if (shooter.shooterSide === "red") {
        supplyCarteType2RedSwitch = true;
      }
      if (shooter.shooterSide === "blue") {
        supplyCarteType2BlueSwitch = true;
      }
      break;
  }
}

//handleCollision()
//
//when fither touch the carte, trigger a effect
SupplyCarte.prototype.handleCollision = function(shooter) {
  if (dist(shooter.x, shooter.y, this.x, this.y) < (shooter.size + this.size)) {
    this.supplyCartType(shooter);
    this.size = 0;
    this.alive = false;
  }
}

// display()
//
// display supply carte on screen
SupplyCarte.prototype.display = function() {
  push();
  translate(this.x, this.y)
  fill(255, 0, 0);
  rect(0, 0, this.size, this.size,4);
  fill('#ffffff');
  textSize(14);
  text("S", 0, 0);
  pop();
}
