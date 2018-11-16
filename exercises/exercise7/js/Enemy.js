// Enemy
//
// A class to define how a enemy behaves. Including enemy's movement,

// enemy constructor
//
// Sets the properties with the provided arguments
function Enemy(x, y, blueness) {
  this.x = x;
  this.y = y;
  this.x1 = x;
  this.y1 = y + 20;
  this.x2 = x - 20;
  this.y2 = y - 20;
  this.x3 = x + 20;
  this.y3 = y - 20;
  this.vy = 5;
  this.size = 40;
  this.blueness = blueness;
  this.collisonSwitch = false;
}

// update()
//
// update enemy's position
Enemy.prototype.update = function() {
  this.y1 += this.vy;
  this.y2 += this.vy;
  this.y3 += this.vy;
  //wramp screen
  if (this.y1 > height + 80) {
    this.y1 -= height;
    this.y2 -= height;
    this.y3 -= height;
  }
}

// display()
//
// display enemy on screen
Enemy.prototype.display = function() {
  if (this.collisonSwitch == false) {
    push();
    fill(255, 255, this.blueness);
    triangle(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3);
    pop();
  }
}
