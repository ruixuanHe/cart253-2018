// Paddle
//
// A class that defines how a paddle behaves, including the ability
// to specify the input keys to move it up and down

// Paddle constructor
//
// Sets the properties with the provided arguments or defaults
///////// NEW /////////
// add two variables for background color
var bgColorR = 0;
var bgColorB = 0;
// challenge: add properties paddleSide
function Paddle(x,y,w,h,speed,downKey,upKey,paddleSide) {
  this.x = x;
  this.y = y;
  this.vx = 0;
  this.vy = 0;
  this.w = w;
  this.h = h;
  this.speed = speed;
  this.downKey = downKey;
  this.upKey = upKey;
  this.score = 0;
  this.paddleSide = paddleSide;
}
///////// END NEW /////////

// handleInput()
//
// Check if the up or down keys are pressed and update velocity
// appropriately
Paddle.prototype.handleInput = function() {
  if (keyIsDown(this.upKey)) {
    this.vy = -this.speed;
  }
  else if (keyIsDown(this.downKey)) {
    this.vy = this.speed;
  }
  else {
    this.vy = 0;
  }
}

// update()
// Update y position based on velocity
// Constrain the resulting position to be within the canvas
Paddle.prototype.update = function() {
  this.y += this.vy;
  this.y = constrain(this.y,0,height-this.h);
}
///////// NEW /////////
// updateScore()
//
// challenge: update the socre of paddle depending on winning side
// change the if condition so, winning paddle side will change its width and height,
// and the background color will turn to red or blue, play the laughing sounds
Paddle.prototype.updateScore = function(){
//update background color everytime
background(bgColorR, 130, bgColorB);
//update paddle shape and background color
//if left paddle win, background color will turn red
//if right paddle win, background color will turn blue
//using constrain method to prevent value overflow
if (ball.winningSide == "right" && this.paddleSide == "right") {
  this.score ++;
  this.h -= 1.5;
  this.w += 1.5;
  this.h = constrain(this.h, 35, 70);
  this.w = constrain(this.w, 30, 45);
  bgColorB += 50;
  bgColorR -= 100;
  bgColorB = constrain(bgColorB, 0, 255);
  bgColorR = constrain(bgColorR, 0, 255);
  laughSound2.play();
  ball.winningSide = null;
}
if(ball.winningSide == "left" && this.paddleSide == "left"){
  this.score ++;
  this.h -= 1.5;
  this.w += 1.5;
  this.h = constrain(this.h, 35, 70);
  this.w = constrain(this.w, 30, 45);
  bgColorR += 50;
  bgColorB -= 100;
  bgColorB = constrain(bgColorB, 0, 255);
  bgColorR = constrain(bgColorR, 0, 255);
  laughSound1.play();
  ball.winningSide = null;
}
}
// displayScore()
//
// display the score at left up corner or right up corner depending on the side
//of paddle
Paddle.prototype.displayScore = function(){
//push() and pop() method to store current setting
push();
fill(66, 244, 244);
textSize(30);
var gameScore = this.score;
if(this.paddleSide == "right"){
  text (gameScore, 0.25*width,0.15*height)
}
if(this.paddleSide == "left"){
  text (gameScore, 0.75*width,0.15*height)
}
pop();
}
///////// END NEW /////////
// display()
//
// Draw the paddle as a rectangle on the screen
///////// NEW /////////
// modify display function(), change the color of paddle depending on the side
Paddle.prototype.display = function() {
  push();
  if(this.paddleSide == "right"){
    fill('#c0f7e9');
  }
  if(this.paddleSide == "left"){
    fill('#f7c0e7');
  }
  rect(this.x,this.y,this.w,this.h);
  pop();
}
///////// END NEW /////////
