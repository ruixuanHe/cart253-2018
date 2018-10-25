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
//add variable for image and sounds
var teemoImage;
var grassImage;
var laughSound1;
var laughSound2;
var gameStartSound;
var backgroundMusic;
var gameStartPlay = false;
// preload()
//
// perload images and sounds
function preload(){
  beepSFX = new Audio("assets/sounds/beep.wav");
  backgroundMusic = new Audio("assets/sounds/bgm.mp3");
  laughSound1 = new Audio("assets/sounds/laugh1.mp3");
  laughSound2 = new Audio("assets/sounds/laugh2.mp3");
  gameStartSound = new Audio("assets/sounds/gameStart.mp3");
  teemoImage = loadImage("assets/images/teemo.jpg");
  grassImage = loadImage("assets/images/grass.png");
}
///////// END NEW /////////
// setup()
//
// Creates the ball and paddles
function setup() {
  createCanvas(640,480);
  ///////// NEW /////////
  //set rectanlge mode, image mode, and no stroke
  rectMode(CENTER);
  noStroke();
  imageMode(CENTER);
  ///////// END NEW /////////
  // Create a ball
  ///////// NEW /////////
  //change the value, to make it performes like ex4
  ball = new Ball(width/2,height/2,5,5,50,5);
  ///////// END NEW /////////
  // Create the right paddle with UP and DOWN as controls
  ///////// NEW /////////
  // add value "right" in right paddle
  //change the value, to make it performes like ex4
  rightPaddle = new Paddle(width-50,height/2,20,70,5,DOWN_ARROW,UP_ARROW,"right");
  ///////// END NEW /////////
  // Create the left paddle with W and S as controls
  // Keycodes 83 and 87 are W and S respectively
  ///////// NEW /////////
  // add value "left" in left paddle
  //change the value, to make it performes like ex4
  leftPaddle = new Paddle(50,height/2,20,70,5,83,87,"left");
  ///////// END NEW /////////
}

// draw()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {
  ///////// NEW /////////
  //play the background music when game start and call gameStartPlaY() function
  backgroundMusic.play();
  gameStartPlaY();
  ///////// END NEW /////////
  leftPaddle.handleInput();
  rightPaddle.handleInput();

  ball.update();
  leftPaddle.update();
  rightPaddle.update();

  if (ball.isOffScreen()) {
    ball.reset();
  }
  ///////// NEW /////////
  //call updateScore() method
  leftPaddle.updateScore();
  rightPaddle.updateScore();
  //call displayScore() method
  leftPaddle.displayScore();
  rightPaddle.displayScore();
  ///////// END NEW /////////
  ball.handleCollision(leftPaddle);
  ball.handleCollision(rightPaddle);

  ball.display();
  leftPaddle.display();
  rightPaddle.display();
  ///////// NEW /////////
  //call displaygrass() function to draw grass
  displaygrass();
  ///////// END NEW /////////
}
///////// NEW /////////
// gameStratPlaY()
//
// function will play the sound "captain teemo on dude" when user start the game (only once)
function gameStartPlaY() {
  if (gameStartPlay == false) {
    gameStartSound.play();
    gameStartPlay = true;
  }
}
// displaygrass()
//
// Draws grass on screen
function displaygrass() {
  image(grassImage, width/2, -11, width, 200);
  image(grassImage, width/2, height-51, width, 200);
}
///////// END NEW /////////
