//array of bullter
var bullet = [];

//vairable of supplyCarte
var bounceBulletSwitch = false;
var fasterBulletSwitch = false;
var biggerBulletSwitch = false;
// setup()
//
// Set up the canvas, position the images, set the image mode.
function setup() {
  noStroke();
  rectMode(CENTER);
  createCanvas(640, 640);
  angleMode(DEGREES);
  fighter = new Fighter(width / 2, height / 2, 50, 50);
  supplyCarte = new SupplyCarte();
}

// draw() method
// Moves the felt image linearly
// Moves the clown face toward the current mouse location
function draw() {
  background(0, 0, 0);
  for (var i = 0; i < bullet.length; i++) {
    bullet[i].display();
    bullet[i].update();
    if (bounceBulletSwitch == true) {
      bullet[i].bounceBullet();
    }
    if (fasterBulletSwitch == true) {
      bullet[i].fasterBullet();
    }
    if (biggerBulletSwitch == true) {
      bullet[i].biggerBullet();
    }
  }
  fill(255, 255, 255);
  supplyCarte.update();
  supplyCarte.display();
  supplyCarte.handleCollision(fighter);
  fighter.update();
  fighter.handleInput();
  fighter.display();
}

// keyPressed()
//
// check user's input
function keyPressed() {
  fighter.keyPressed();
}
