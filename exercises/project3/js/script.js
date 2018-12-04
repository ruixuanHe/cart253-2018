/*****************

Project 3
Ruixuan He 40000330

******************/

// setup()
//
// setup the canvas
function setup() {
  background(255, 200, 255);
  noStroke();
  rectMode(CENTER);
  ellipseMode(CENTER);
  createCanvas(800, 800);
  angleMode(DEGREES);
  shooterRed = new Shooter(83, 87, 65, 68, "red");
  shooterBlue = new Shooter(40, 38, 37, 39, "blue");
  shooterRed.setup();
  shooterBlue.setup();
}

// draw()
//
// draw the canvas
function draw() {
  shooterBlue.update();
  shooterRed.update();
  shooterBlue.display();
  shooterRed.display();
}
