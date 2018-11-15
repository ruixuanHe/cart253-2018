//array of bullter
var bullet = [];

// setup()
//
// Set up the canvas, position the images, set the image mode.
function setup() {
  noStroke();
  rectMode(CENTER);
  createCanvas(640, 640);
  angleMode(DEGREES);
  fighter = new Fighter(width / 2, height / 2, 50, 50);
}

// draw() method
// Moves the felt image linearly
// Moves the clown face toward the current mouse location
function draw() {
  background(0, 0, 0);
  for (var i = 0; i < bullet.length; i++) {
    bullet[i].display();
    bullet[i].update();
  }
  fill(255, 255, 255);
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
