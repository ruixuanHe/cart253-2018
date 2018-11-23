// Enemy
//
// A class to define how a enemy behaves. Including enemy's movement,

// enemy constructor
//
// Sets the properties with the provided arguments
function Enemy() {
  //optional choice for enemy position
  /*this.position = random(0,4);
  switch (this.position) {
    case 0:
    this. location = createVector(random(0,width),0);
    this.velocity = createVector(random(height/16,height/8),random(height/16,height/8));
    this.velocity.mult(0.2);
    break;
    case 1:
    this. location = createVector(random(0,width),height);
    this.velocity = createVector(random(height/16,height/8),-(random(height/16,height/8)));
    this.velocity.mult(0.2);
    break;
    case 2:
    this. location = createVector(0,random(0,height));
    this.velocity = createVector(random(height/16,height/8),random(height/16,height/8));
    this.velocity.mult(0.2);
    break;
    case 3:
    this. location = createVector(width,random(0,height));
    this.velocity = createVector(-(random(height/16,height/8)),random(height/16,height/8));
    this.velocity.mult(0.2);
    break;
    default:
  }*/
  this.location = createVector(random(0, width), random(0, height));
  this.velocity = createVector(random(-height / 16, height / 16), random(-height / 16, height / 16));
  this.velocity.mult(0.5);
  this.crushSwitch = false;
  this.size = 25;
  this.angle = 0;
  this.crushX;
  this.crushY;
}

// update()
//
// update enemy's position
Enemy.prototype.update = function() {
  this.location.add(this.velocity);
  this.velocity.mult(0.92);
}

// display()
//
// display enemy on screen
Enemy.prototype.display = function() {
  if (this.crushSwitch == false) {
    push();
    translate(this.location.x, this.location.y);
    fill(222, 125, 44);
    ellipse(0, 0, this.size + 5, this.size + 5);
    fill(254, 194, 143);
    ellipse(0, 0, this.size, this.size);
    pop();
    this.crushX = this.location.x;
    this.crushY = this.location.y;
  }
}
