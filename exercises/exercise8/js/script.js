/*****************

exercise8
Ruixuan He 40000330

******************/

var gun
// setup()
//
// setup the canvas
function setup() {
  background(255, 200, 255);
  noStroke();
  rectMode(CENTER);
  createCanvas(800, 800);
  angleMode(DEGREES);
  gun = new Gun(width / 2, height / 2, 60);
}

// draw()
//
// draw the canvas
function draw() {
  background(50, 40, 55);
  gun.update();
  gun.display();
}
