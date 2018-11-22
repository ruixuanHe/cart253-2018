// Gun
//
// A class to define how a fighter behaves.

// Gun constructor
//
// Sets the properties with the provided arguments
function Gun(x, y, size) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.angle;
}

// update()
//
// rotate according to its angle
Gun.prototype.update = function() {
  this.angle = atan2(mouseY - this.y, mouseX - this.x) - 90;
}

// display()
//
// display gun on screen
Gun.prototype.display = function() {
  push();
  translate(this.x, this.y);
  fill(116, 127, 124);
  ellipse(0, 0, this.size + 10, this.size + 10);
  fill(204, 222, 217);
  ellipse(0, 0, this.size, this.size);
  pop();
  push();
  translate(this.x, this.y);
  rotate(this.angle);
  fill(146, 159, 155);
  rect(0, 0, this.size / 4, this.size / 2);
  fill(87, 95, 93);
  rect(0, 5 * this.size / 16, this.size / 4, this.size / 4);
  pop();
}
