// Broken Basic OO Pong
// by Pippin Barr
//
// A broken primitive implementation of Pong with no scoring system
// just the ability to play the game with the keyboard.
//
// Arrow keys control the right hand paddle, W and S control
// the left hand paddle.
//
// Written with JavaScript OOP.

// Variable to contain the objects representing our ball and paddles
//////////////// FIXED
//Syntax error: change "bal" to "ball";
var ball;
var leftPaddle;
var rightPaddle;

// setup()
//
// Creates the ball and paddles
function setup() {
  //////////////// FIXED
  //Syntax error: change "crateCanvas" to "createCanvas";
  createCanvas(640,480);
  noStroke();
  // Create a ball
  //////////////// FIXED
  //logical error: changing the value to have a same ball
  ball = new Ball(width/2,height/2,5,5,10,5);
  // Create the right paddle with UP and DOWN as controls
  //////////////// FIXED
  //logical error: mixing up upkey and downkey
  rightPaddle = new Paddle(width-10,height/2,10,60,10,DOWN_ARROW,UP_ARROW);
  // Create the left paddle with W and S as controls
  // Keycodes 83 and 87 are W and S respectively
  //////////////// FIXED
  //Syntax error: change "Paddle(0,height/2,10,60,10,83,87" to "Paddle(0,height/2,10,60,10,83,87)";
  leftPaddle = new Paddle(0,height/2,10,60,10,83,87);

  //////////////// FIXED
  //Syntax error: missing close bracket
}

// draw()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {
  background(0);

  leftPaddle.handleInput();
  rightPaddle.handleInput();

  //////////////// FIXED
  //Syntax error: change "update" to "update()";
  ball.update();
  leftPaddle.update();
  rightPaddle.update();

  //////////////// FIXED
  //Syntax error: change "isOffTheScreen()" to "isOffScreen()"
  //Syntax error: missing an open bracket
  if (ball.isOffScreen()){
    //////////////// FIXED
    //logical error: reset() can be called directly, we need an object to call reset funciton
    ball.reset();
  }

  ball.handleCollision(leftPaddle);
  ball.handleCollision(rightPaddle);

  ball.display();
  leftPaddle.display();
  //////////////// FIXED
  //Syntax error: change "display(" to "display()";
  rightPaddle.display();
}
