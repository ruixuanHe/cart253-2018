/*****************

Project 3
Ruixuan He 40000330

******************/
var bulletRed = [];
var bulletBlue = [];
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
  background('#000000');
  for (var i = 0; i < bulletRed.length; i++) {
    bulletRed[i].display();
    bulletRed[i].update();
    if (bulletRed[i].alive === false) {
      bulletRed.splice(i, 1);
    }
  }
  for (var i = 0; i < bulletBlue.length; i++) {
    bulletBlue[i].display();
    bulletBlue[i].update();
    if (bulletBlue[i].alive === false) {
      bulletBlue.splice(i, 1);
    }
  }
  shooterBlue.update();
  shooterRed.update();
  shooterBlue.display();
  shooterRed.display();
}

// keyPressed()
//
// check user's input
function keyPressed() {
  shooterRed.keyPressed();
  shooterBlue.keyPressed();
}
