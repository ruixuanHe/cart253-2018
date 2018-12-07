/*****************

Project 3
Ruixuan He 40000330

******************/
var bulletRed = [];
var bulletBlue = [];
var gameOverSwitch = false;
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

  teleportSpot1 = new TeleportSpot(200, 300, "1");
  teleportSpot2 = new TeleportSpot(600, 600, "2");
}

// draw()
//
// draw the canvas
function draw() {
  background('#000000');
  teleportSpot1.display();
  teleportSpot2.display();
  teleportSpot1.transmitte(shooterRed, teleportSpot2);
  teleportSpot1.transmitte(shooterBlue, teleportSpot2);
  teleportSpot2.transmitte(shooterRed, teleportSpot1);
  teleportSpot2.transmitte(shooterBlue, teleportSpot1);
  for (var i = bulletRed.length - 1; i >= 0; i--) {
    bulletRed[i].display();
    bulletRed[i].update();
    if (bulletRed[i].harmful === true) {
      bulletRed[i].handleCollision(shooterBlue);
      for (var j = bulletBlue.length - 1; j >= 0; j--) {
        bulletRed[i].handleCollision(bulletBlue[j]);
      }
    }
    if (bulletRed[i].alive === false) {
      bulletRed.splice(i, 1);
    }
  }
  for (var i = bulletBlue.length - 1; i >= 0; i--) {
    bulletBlue[i].display();
    bulletBlue[i].update();
    if (bulletBlue[i].harmful === true) {
      bulletBlue[i].handleCollision(shooterRed);
      for (var j = bulletRed.length - 1; j >= 0; j--) {
        bulletBlue[i].handleCollision(bulletRed[j]);
      }
    }
    if (bulletBlue[i].alive === false) {
      bulletBlue.splice(i, 1);
    }
  }
  shooterBlue.update();
  shooterRed.update();
  shooterBlue.display();
  shooterRed.display();
  shooterRed.displayHealth();
  shooterBlue.displayHealth();
}

// keyPressed()
//
// check user's input
function keyPressed() {
  shooterRed.keyPressed();
  shooterBlue.keyPressed();
}
