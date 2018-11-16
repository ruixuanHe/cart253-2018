// ColorBlock
//
// A class to define how a color block behaves. Including color block's movement,

// ColorBlock constructor
//
// Sets the properties to random value
function ColorBlock() {
  this.x = random(0, width);
  this.y = random(-250, 0);
  this.w = random(80, 160);
  this.h = random(80, 160);
  this.vx = 0;
  this.vy = random(2, 5);
  this.changeSpeed = random(2, 3);
  this.reddness = random(0, 255);
  this.greenness = random(0, 255);
  this.blueness = random(0, 255);
}

// update()
//
// update ColorBlock's position
ColorBlock.prototype.update = function() {
  this.x += this.vx;
  this.y += this.vy;
  //this is a optional method
  /*this.vy += this.changeSpeed
  if (this.vy <= 5) {
    this.changeSpeed = abs(this.changeSpeed);
  }
  if (this.vy >= 15) {
    this.changeSpeed = -this.changeSpeed;
  }*/
}

// display()
//
// display ColorBlock on screen
ColorBlock.prototype.display = function() {
  push();
  //fill(this.reddness, this.greenness, this.blueness);
  fill(this.reddness, this.greenness, this.blueness);
  rect(this.x, this.y, this.w, this.h);
  pop();
}
