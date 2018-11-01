// Paddle
//
// A class that defines how a paddle behaves, including the ability
// to specify the input keys to move it up and down
//////////////// FIXED
//paddle constructor & constructor's explaination belongs to the comment, add "//" before it
//Paddle constructor
//
//Sets the properties with the provided arguments or defaults
//////////////// FIXED
//Syntax error: change "Pladdle" to "Paddle";
function Paddle(x,y,w,h,speed,downKey,upKey) {
  this.x = x;
  this.y = y;
  //////////////// FIXED
  //Syntax error: change "xv" to "vx";
  //Syntax error: change "yv" to "vy";
  this.vx = 0;
  this.vy = 0;
  this.w = w;
  this.h = h;
  //////////////// FIXED
  //Syntax error: change "speeed" to "speed";
  this.speed = speed;
  this.downKey = downKey;
  this.upKey = upKey;
}

// handleInput()
//
// Check if the up or down keys are pressed and update velocity
// appropriately
//////////////// FIXED
//Syntax error: change "Paddle.proto" to "Paddle.prototype";
//////////////// FIXED
//Syntax error: change "keyDown" to "keyIsDown";
//logical error: upKey and downKey are the properties of the object that calls handleInput function
//add this. at the front of upKey & downKey
//logical error: the y velocity should be 0 when users dont pressed any key
Paddle.prototype.handleInput = function() {
  if (keyIsDown(this.upKey)) {
    this.vy = -this.speed;
  }
  //////////////// FIXED
  //logical error: velocity y should be positive speed, Otherwise it will move at opposite direction;
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
  //////////////// FIXED
  //Syntax error: change "constraint" to "constrain";
  this.y = constrain(this.y,0,hight-this.h);
}

// display()
//
// Draw the paddle as a rectangle on the screen
//////////////// FIXED
//Syntax error: change "disploy" to "display";
//Syntax error: change "function())" to "function()";
//Syntax error: change "rectangle" to "rect";
//////////////// FIXED
//logical error: fill the rectangle with a different color (not background color)
Paddle.prototype.display = function() {
  fill(255);
  rect(this.x,this.y,this.w,this.h);
}
