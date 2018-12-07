/*****************

Project 3
Ruixuan He 40000330

******************/
var bulletRed = [];
var bulletBlue = [];
var startSwitch = false;
var introSwitch = false;
var gameOverSwitch = false;
var titleSwitch = true;
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
//text for title and ending
var text1 = "How to play";
var text2 = "Red Shooter";
var text3 = "Move:WASD Shoot:SPACE";
var text4 = "Blue Shooter";
var text5 = "Move:arrow up,left,down,right Shoot:ENTER";
var text6 = "Press J to start the game!!!";
var text7 = "Press K to restart the game!!!";
var text8 = "SPACE WAR";
var text9 = "Eliminate enemy";
var text10 = "Click button to start the game!!!"

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
  textAlign(CENTER, CENTER);

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
  if (startSwitch == true && introSwitch == false &&
    gameOverSwitch == false && titleSwitch == false) {

    startGame();
  }
  if (startSwitch == false && introSwitch == true &&
    gameOverSwitch == false && titleSwitch == false) {
    introduction();
  }
  if (startSwitch == false && introSwitch == false &&
    gameOverSwitch == true && titleSwitch == false) {
    gameOver();
  }
  if (startSwitch == false && introSwitch == false &&
    gameOverSwitch == false && titleSwitch == true) {
    title();
  }
}

//mouseClicked()
//
//handle the mouse input
function mouseClicked() {
  if (mouseX < width / 2 + 100 && mouseX > width / 2 - 100) {
    if (mouseY < 3.5 * height / 5 + 25 && mouseY > 3.5 * height / 5 - 25) {
      reset();
      introSwitch = false;
      titleSwitch = false;
      startSwitch = true;
      gameOverSwitch = false;
    }
  }
  if (mouseX < width / 2 + 100 && mouseX > width / 2 - 100) {
    if (mouseY < 4 * height / 5 + 25 && mouseY > 4 * height / 5 - 25) {
      introSwitch = true;
      titleSwitch = false;
      startSwitch = false;
      gameOverSwitch = false;
    }
  }
}

// keyPressed()
//
// check user's input
function keyPressed() {
  //key J
  if (keyCode === 74) {
    reset();
    startSwitch = true;
    titleSwitch = false;
    gameOverSwitch = false;
    introSwitch = false;
  }
  //key K
  if (keyCode === 75) {
    startSwitch = false;
    titleSwitch = true;
    gameOverSwitch = false;
    introSwitch = false;
  }
  shooterRed.keyPressed();
  shooterBlue.keyPressed();
}

//title()
//
//title of the game
function title() {
  background(0, 0, 0);
  fill('#FFFFFF');
  text(text8, width / 2, 1.5 * height / 5);
  text(text9, width / 2, 2 * height / 5);
  text(text10, width / 2, 2.5 * height / 5);
  fill(61, 46, 255);
  textSize(35);
  rect(width / 2, 3.5 * height / 5, 200, 50, 10);
  fill('#FFFFFF');
  text("Start", width / 2, 3.5 * height / 5);
  fill(255, 61, 46);
  rect(width / 2, 4 * height / 5, 200, 50, 10);
  fill('#FFFFFF');
  text("Introduction", width / 2, 4 * height / 5);
}

//introduction()
//
//introduction of game
function introduction() {
  background(0, 0, 0);
  text("intro", width / 2, height / 2);
}

//startGame()
//
//game page
function startGame() {
  console.log(bulletRed.length);
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

//reset()
//
//reset game variables and objects
function reset() {
  shooterRed = new Shooter(83, 87, 65, 68, "red");
  shooterBlue = new Shooter(40, 38, 37, 39, "blue");
  shooterRed.setup();
  shooterBlue.setup();
  supplyCarteTime = 1;
  supplyCarteType1RedSwitch = false;
  supplyCarteType1BlueSwitch = false;
  supplyCarteType2RedSwitch = false;
  supplyCarteType2BlueSwitch = false;
  supplyCarteType1RedSwitchTimer = 0;
  supplyCarteType1BlueSwitchTimer = 0;
  supplyCarteType2RedSwitchTimer = 0;
  supplyCarteType2BlueSwitchTimer = 0;
  bulletRed = [];
  bulletBlue = [];
}

//gameOver()
//
//game over page
function gameOver() {
  background(0, 0, 0);
  text("gameOver", width / 2, height / 2);
}
