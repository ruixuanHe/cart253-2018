// Basic OO Pong
// by Pippin Barr
//
// A primitive implementation of Pong with no scoring system
// just the ability to play the game with the keyboard.
//
// Arrow keys control the right hand paddle, W and S control
// the left hand paddle.
//
// Written with JavaScript OOP.

// Variable to contain the objects representing our ball and paddles
var ball;
var leftPaddle;
var rightPaddle;

///////// NEW /////////
var myFontLobster
var myFontOrbitron
var start = false;
///////// END NEW /////////
// setup()
//
// Creates the ball and paddles
function setup() {
  createCanvas(850, 500);
  ///////// NEW /////////
  //load font
  myFontLobster = loadFont('assets/Lobster.otf');
  myFontOrbitron = loadFont('assets/orbitron.otf');
  //set rectanlge mode, image mode, and no stroke
  rectMode(CENTER);
  noStroke();
  imageMode(CENTER);
  ///////// END NEW /////////
  // Create a ball
  ball = new Ball(width / 2, height / 2, 5, 5, 50, 5);
  // Create the right paddle with UP and DOWN as controls
  rightPaddle = new Paddle(width - 12, height / 2, 16, 80, 10, DOWN_ARROW, UP_ARROW, "right");
  // Create the left paddle with W and S as controls
  // Keycodes 83 and 87 are W and S respectively
  leftPaddle = new Paddle(12, height / 2, 16, 80, 10, 83, 87, "left");
}

// draw()
//
// check user input and start the game
function draw() {
  if (start == false) {
    titleScreen();
  } else {
    gameStart();
  }
}
///////// NEW /////////
//titleScreen()
//
//a title screen display game name and insturction
function titleScreen() {
  // set up style
  background(134, 65, 255);
  textAlign(CENTER, CENTER);
  textSize(0.12 * height / 3);
  textFont(myFontOrbitron);
  push();
  textSize(0.5 * height / 3);
  textFont(myFontLobster);
  fill(51, 159, 255);
  text("INTERSTELLAR", width / 2, 0.7 * height / 3);
  pop();
  push();
  fill(77, 171, 255);
  text("Please use your paddle to chatch the UFO", width / 2, 1.2 * height / 3);
  pop();
  push();
  fill(102, 183, 255);
  text("White wormhole will transfer UFO to the red wormhole", width / 2, 1.4 * height / 3);
  pop();
  push();
  fill(128, 195, 255);
  text("Chatch deadstart will slow your paddle", width / 2, 1.6 * height / 3);
  pop();
  push();
  fill(153, 207, 255);
  text("Miss a UFO will let you opponent to gain a point", width / 2, 1.8 * height / 3);
  pop();
  push();
  fill(179, 219, 255);
  textSize(0.3 * height / 3);
  text("Press Enter to start the game", width / 2, 2.1 * height / 3);
  pop();
}
//gameStart()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.
function gameStart() {
  background(0);

  leftPaddle.handleInput();
  rightPaddle.handleInput();

  ball.update();
  leftPaddle.update();
  rightPaddle.update();

  if (ball.isOffScreen()) {
    ball.reset();
  }

  ball.handleCollision(leftPaddle);
  ball.handleCollision(rightPaddle);

  ball.display();
  leftPaddle.display();
  rightPaddle.display();
  //call updateScore() method
  leftPaddle.updateScore();
  rightPaddle.updateScore();
  textFont(myFontLobster);
  textSize(30);
  textAlign(CENTER);
  //call displayScore() method
  leftPaddle.displayScore();
  rightPaddle.displayScore();
}
//keyPressed()
//
//check user's input, if its "enter" start the game
function keyPressed() {
  if (keyCode === ENTER) {
    start = true;
  }
}
///////// END NEW /////////
