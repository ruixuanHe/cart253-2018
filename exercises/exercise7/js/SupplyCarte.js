// SupplyCarte
//
// A class to define how a SupplyCarte behaves. Including SupplyCarte's movement,
// random carte brings 3 different effect of bullet, and change the color of fighter
// fighter get carte after overlap it

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
  this.type = int(random(1, 4));
  this.color = '';
}

// update()
//
// update SupplyCarte's position
SupplyCarte.prototype.update = function() {
  this.x += this.vx;
  this.y += this.vy;
}

//supplyCartType()
//
//find out the type of carte, type 1 will have bounce bullet effect
//type 2 will have faster bullet effect,type 3 will have bigger bullet effect
SupplyCarte.prototype.supplyCartType = function(fighter) {
  switch (this.type) {
    //bounce bullet
    case 1:
      fighter.color = '#ffccf2';
      bounceBulletSwitch = true;
      console.log("b" + bounceBulletSwitch);
      break;
      //faster bullet
    case 2:
      fighter.color = '#cce0ff';
      fasterBulletSwitch = true;
      console.log("f" + fasterBulletSwitch);
      break;
      //bigger bullet
    case 3:
      fighter.color = '#ccfff5';
      biggerBulletSwitch = true;
      console.log("biger" + biggerBulletSwitch);
  }
}

//handleCollision()
//
//when fither touch the carte, trigger a effect
SupplyCarte.prototype.handleCollision = function(fighter) {
  if (dist(fighter.x, fighter.y, this.x, this.y) < (fighter.w + this.size)) {
    this.supplyCartType(fighter);
    this.size = 0;
  }
}

// display()
//
// display supply carte on screen
SupplyCarte.prototype.display = function() {
  push();
  fill(this.color);
  rect(this.x, this.y, this.size, this.size);
  pop();
}
