/*****************

Project 3
Ruixuan He 40000330

******************/
var bulletRed = [];
var bulletBlue = [];
var gameOverSwitch = false;
var supplyCarte = [];
var supplyCarteTime = 1;
var supplyCarteType1RedSwitch = false;
var supplyCarteType1BlueSwitch = false;
var supplyCarteType2RedSwitch = false;
var supplyCarteType2BlueSwitch = false;
var supplyCarteType1RedSwitchTimer = 0;
var supplyCarteType1BlueSwitchTimer = 0;
var supplyCarteType2RedSwitchTimer = 0;
var supplyCarteType2BlueSwitchTimer = 0;
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
  textAlign(CENTER);

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
  //supplyCarte:
  //loading time: 15s
  //effect time: 5s
  if (supplyCarteTime % 900 == 0) {
    supplyCarte.push(new SupplyCarte());
  }
  supplyCarteTime++;
  for (var i = supplyCarte.length - 1; i >= 0; i--) {
    supplyCarte[i].update();
    supplyCarte[i].display();
    supplyCarte[i].handleCollision(shooterRed);
    supplyCarte[i].handleCollision(shooterBlue);
    if (supplyCarte[i].alive === false) {
      supplyCarte.splice(i, 1);
    }
  }
  if (supplyCarteType1RedSwitch) {
    supplyCarteType1RedSwitchTimer++;
    if (supplyCarteType1RedSwitchTimer > 300) {
      supplyCarteType1RedSwitchTimer = 0;
      supplyCarteType1RedSwitch = false;
    }
  }
  if (supplyCarteType1BlueSwitch) {
    supplyCarteType1BlueSwitchTimer++;
    if (supplyCarteType1blueSwitchTimer > 300) {
      supplyCarteType1blueSwitchTimer = 0;
      supplyCarteType1blueSwitch = false;
    }
  }
  if (supplyCarteType2RedSwitch) {
    supplyCarteType2RedSwitchTimer++;
    if (supplyCarteType2RedSwitchTimer > 300) {
      supplyCarteType2RedSwitchTimer = 0;
      supplyCarteType2RedSwitch = false;
    }
  }
  if (supplyCarteType2BlueSwitch) {
    supplyCarteType2BlueSwitchTimer++;
    if (supplyCarteType2BlueSwitchTimer > 300) {
      supplyCarteType2BlueSwitchTimer = 0;
      supplyCarteType2BlueSwitch = false;
    }
  }
  //teleportSpot
  teleportSpot1.display();
  teleportSpot2.display();
  teleportSpot1.transmitte(shooterRed, teleportSpot2);
  teleportSpot1.transmitte(shooterBlue, teleportSpot2);
  teleportSpot2.transmitte(shooterRed, teleportSpot1);
  teleportSpot2.transmitte(shooterBlue, teleportSpot1);
  //bullet
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
  //shooter
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
