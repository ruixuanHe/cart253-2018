/******************************************************

Game - Chaser
Pippin Barr

A simple game of cat and mouse.

Physics-based movement, keyboard controls, health/stamina,
sprinting, random movement, screen wrap.

******************************************************/
// ex05 variable
var map;
var garen;
var teemo;
var backgroundMusic;
var garenAttack;
var garenShift;
var teemoLaugh;
// ex01 noise variable
var noiseX ;
var noiseY ;

// Track whether the game is over
var gameOver = false;

// Player position, size, velocity
var playerX;
var playerY;
var playerRadius = 25;
var playerVX = 0;
var playerVY = 0;
var playerMaxSpeed = 2;

// ex02 add a variable for playerSpeed
var playerSpeed = 2;
// Player health
var playerHealth;
var playerMaxHealth = 255;
// Player fill color
var playerFill = 50;

// teemo position, size, velocity
var teemoX;
var teemoY;
var teemoRadius = 80;
var teemoVX;
var teemoVY;
var teemoMaxSpeed = 4;
// teemo health
var teemoHealth;
var teemoMaxHealth = 100;
// teemo fill color
var teemoFill = 200;

// Amount of health obtained per frame of "eating" the teemo
var eatHealth = 10;
// Number of teemo eaten during the game
var teemoEaten = 0;

// setup()
//
// Sets up the basic elements of the game
function setup() {
  createCanvas(500,500);

  noStroke();
  setupteemo();
  setupPlayer();
  setupNoise();
  preload();
}
function setupNoise(){
  //setup the noise value
  noiseX = 33;
  noiseY = 74;
}

function preload(){
  //garen = loadImage('assets/images/garen.png');
  teemo = loadImage('assets/images/teemo.png');
  /*map = loadImage('assets/ images/map.jpg');
  backgroundMusic = loadSound('assets/sounds/bgm.mp3');
  garenShift= loadSound('assets/sounds/shift.wav');
  garenAttack= loadSound('assets/sounds/attack.wav');
  teemoLaugh = loadSound('assets/sounds/teemo_4.mp3');*/
}
// setupteemo()
//
// Initialises teemo's position, velocity, and health
function setupteemo() {
  teemoX = width/5;
  teemoY = height/2;
  teemoVX = -teemoMaxSpeed;
  teemoVY = teemoMaxSpeed;
  teemoHealth = teemoMaxHealth;

}

// setupPlayer()
//
// Initialises player position and health
function setupPlayer() {
  playerX = 4*width/5;
  playerY = height/2;
  playerHealth = playerMaxHealth;
}

// draw()
//
// While the game is active, checks input
// updates positions of teemo and player,
// checks health (dying), checks eating (overlaps)
// displays the two agents.
// When the game is over, shows the game over screen.
function draw() {
  background(100,100,200);

  if (!gameOver) {
    handleInput();

    movePlayer();
    moveteemo();

    updateHealth();
    checkEating();

    drawTeemo();
    drawPlayer();
  }
  else {
    showGameOver();
  }
}

// handleInput()
//
// Checks arrow keys and adjusts player velocity accordingly
function handleInput() {
  // Check for horizontal movement
  if (keyIsDown(LEFT_ARROW)) {
    playerVX = -playerMaxSpeed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    playerVX = playerMaxSpeed;
  }
  else {
    playerVX = 0;
  }

  // Check for vertical movement
  if (keyIsDown(UP_ARROW)) {
    playerVY = -playerMaxSpeed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    playerVY = playerMaxSpeed;
  }
  else {
    playerVY = 0;
  }

  // ex02 add a ability to sprint, when press shift maxspeed will increase
  //when release it will go bacome to 2
  if(keyIsDown(SHIFT)){
    playerMaxSpeed += 0.2;
  }
  else {
    playerMaxSpeed = playerSpeed;
  }
}

// movePlayer()
//
// Updates player position based on velocity,
// wraps around the edges.
function movePlayer() {
  // Update position
  playerX += playerVX;
  playerY += playerVY;

  // Wrap when player goes off the canvas
  if (playerX < 0) {
    playerX += width;
  }
  else if (playerX > width) {
    playerX -= width;
  }

  if (playerY < 0) {
    playerY += height;
  }
  else if (playerY > height) {
    playerY -= height;
  }
}

// updateHealth()
//
// Reduce the player's health (every frame)
// Check if the player is dead
function updateHealth() {
  // Reduce player health, constrain to reasonable range
  playerHealth = constrain(playerHealth - 0.5,0,playerMaxHealth);
  // Check if the player is dead
  if (playerHealth === 0) {
    // If so, the game is over
    gameOver = true;
  }
}

// checkEating()
//
// Check if the player overlaps the teemo and updates health of both
function checkEating() {
  // Get distance of player to teemo
  var d = dist(playerX,playerY,teemoX,teemoY);
  // Check if it's an overlap
  if (d < playerRadius + teemoRadius) {
    // Increase the player health
    playerHealth = constrain(playerHealth + eatHealth,0,playerMaxHealth);
    // Reduce the teemo health
    teemoHealth = constrain(teemoHealth - eatHealth,0,teemoMaxHealth);

    // Check if the teemo died
    if (teemoHealth === 0) {
      // Move the "new" teemo to a random position
      teemoX = random(0,width);
      teemoY = random(0,height);
      // Give it full health
      teemoHealth = teemoMaxHealth;
      // Track how many teemo were eaten
      teemoEaten++;
    }
  }
}

// moveteemo()
//
// Moves the teemo based on random velocity changes
function moveteemo() {
  // Change the teemo's velocity at random intervals
  // random() will be < 0.05 5% of the time, so the teemo
  // will change direction on 5% of frames
  /*if (random() < 0.05) {
    // Set velocity based on random values to get a new direction
    // and speed of movement
    // Use map() to convert from the 0-1 range of the random() function
    // to the appropriate range of velocities for the teemo
    teemoVX = map(random(),0,1,-teemoMaxSpeed,teemoMaxSpeed);
    teemoVY = map(random(),0,1,-teemoMaxSpeed,teemoMaxSpeed);
  }*/


  teemoVX = map(noise(noiseX),0,1,-teemoMaxSpeed,teemoMaxSpeed);
  teemoVY = map(noise(noiseY),0,1,-teemoMaxSpeed,teemoMaxSpeed);


  // Update teemo position based on velocity
  teemoX += teemoVX;
  teemoY += teemoVY;


  noiseX += 0.01;
  noiseY += 0.01;
  // Screen wrapping
  if (teemoX < 0) {
    teemoX += width;
  }
  else if (teemoX > width) {
    teemoX -= width;
  }

  if (teemoY < 0) {
    teemoY += height;
  }
  else if (teemoY > height) {
    teemoY -= height;
  }
}

// drawTeemo()
//
// Draw the teemo as an ellipse with alpha based on health
function drawTeemo() {

  image(teemo,teemoX,teemoY,teemoRadius,teemoRadius);
}

// drawPlayer()
//
// Draw the player as an ellipse with alpha based on health
function drawPlayer() {
  fill(playerFill,playerHealth);
  ellipse(playerX,playerY,playerRadius*2);
}

// showGameOver()
// Display text about the game being over!
// ex03.1 change gameover text, depending on the number of teemoEaten
function showGameOver() {
  textSize(32);
  textAlign(CENTER,CENTER);
  fill(0);
  var gameOverText = "GAME OVER\n";
  gameOverText += "You ate " + teemoEaten + " teemo\n";
  if ( teemoEaten < 3 ) {
    gameOverText += " Good Job!!!";
  } else if ( 3<= teemoEaten && teemoEaten< 10){
    gameOverText += " SuPeR!!!";
  }else if ( teemoEaten >= 10){
    gameOverText += " UNBELIEVABLE!!!";
  }

  text(gameOverText,width/2,height/2);
}
