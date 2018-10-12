/******************************************************

Game - Chaser
Pippin Barr

A simple game of cat and mouse.

Physics-based movement, keyboard controls, health/stamina,
sprinting, random movement, screen wrap.

******************************************************/
// ex05 variable
var backgroundImage;
var garen;
var teemo;
var backgroundMusic;
var garenAttack;
var garenShift;
var teemoLaugh;
// ex01 noise variable
var noiseX;
var noiseY;
//ex03.5
var warnningText;
// Track whether the game is over
var gameOver = false;

// garen position, size, velocity
var garenX;
var garenY;
var garenWidth = 80;
var garenVX = 0;
var garenVY = 0;
var garenMaxSpeed = 2;
// ex02 add a variable for garenSpeed
var garenSpeed = 2;
// garen health
var garenHealth;
var garenMaxHealth = 255;
// garen fill color
var garenFill = 50;



// teemo position, size, velocity
//ex04 change values
var teemoX;
var teemoY;
var teemoWidth = 40;
var teemoVX;
var teemoVY;
var teemoMaxSpeed = 6;
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
	createCanvas(500, 500);
	imageMode(CENTER);

	setupteemo();
	setupgaren();
	setupNoise();
	preload();
}

function setupNoise() {
	//setup the noise value
	noiseX = 33;
	noiseY = 74;
}

function preload() {
	garen = loadImage('assets/images/garen.png');
	teemo = loadImage('assets/images/teemo.png');
 	backgroundImage = loadImage('assets/images/map.png');


	backgroundMusic = new Audio('assets/sounds/bgm.mp3');
	garenShift= new Audio('assets/sounds/garenAttack.wav');
	garenAttack= new Audio('assets/sounds/attack.wav');
	teemoLaugh = new Audio('assets/sounds/teemo_4.mp3');
}
// setupteemo()
//
// Initialises teemo's position, velocity, and health
function setupteemo() {
	teemoX = width / 5;
	teemoY = height / 2;
	teemoVX = -teemoMaxSpeed;
	teemoVY = teemoMaxSpeed;
	teemoHealth = teemoMaxHealth;

}

// setupgaren()
//
// Initialises garen position and health
function setupgaren() {
	garenX = 4 * width / 5;
	garenY = height / 2;
	garenHealth = garenMaxHealth;

}

// draw()
//
// While the game is active, checks input
// updates positions of teemo and garen,
// checks health (dying), checks eating (overlaps)
// displays the two agents.
// When the game is over, shows the game over screen.
function draw() {
	 image(backgroundImage,width/2,height/2,width,height);

	 backgroundMusic.play();

	if (!gameOver) {

		handleInput();

		movegaren();
		moveteemo();

		updateHealth();
		checkEating();

		drawTeemo();
		drawgaren();
	} else {
		backgroundMusic.pause();
		showGameOver();

	}
}

// handleInput()
//
// Checks arrow keys and adjusts garen velocity accordingly
function handleInput() {
	// Check for horizontal movement
	if (keyIsDown(LEFT_ARROW)) {
		garenVX = -garenMaxSpeed;
	} else if (keyIsDown(RIGHT_ARROW)) {
		garenVX = garenMaxSpeed;
	} else {
		garenVX = 0;
	}

	// Check for vertical movement
	if (keyIsDown(UP_ARROW)) {
		garenVY = -garenMaxSpeed;
	} else if (keyIsDown(DOWN_ARROW)) {
		garenVY = garenMaxSpeed;
	} else {
		garenVY = 0;
	}

	// ex02 add a ability to sprint, when press shift maxspeed will increase
	//when release it will go bacome to 2
	if (keyIsDown(SHIFT)) {
		garenMaxSpeed += 0.2;
	} else {
		garenMaxSpeed = garenSpeed;
	}

}

// movegaren()
//
// Updates garen position based on velocity,
// wraps around the edges.
function movegaren() {
	// Update position
	garenX += garenVX;
	garenY += garenVY;

	// Wrap when garen goes off the canvas
	if (garenX < 0) {
		garenX += width;
	} else if (garenX > width) {
		garenX -= width;
	}

	if (garenY < 0) {
		garenY += height;
	} else if (garenY > height) {
		garenY -= height;
	}
}

// updateHealth()
//
// Reduce the garen's health (every frame)
// Check if the garen is dead
function updateHealth() {
	//ex04 change the values
	// Reduce garen health, constrain to reasonable range
	garenHealth = constrain(garenHealth - 0.3, 0, garenMaxHealth);
	// Check if the garen is dead
	// play teemo's laugh when garen is dying
	if (garenHealth >0 &&garenHealth <= 70){
		teemoLaugh.play();
		textAlign(CENTER);
		fill(56, 220, 244);
		warnningText = " Hurry, You are dying!"
		text(warnningText,width/2,10);
	}
	if (garenHealth === 0) {
		// If so, the game is over
		gameOver = true;
	}
}

// checkEating()
//
// Check if the garen overlaps the teemo and updates health of both
function checkEating() {
	// Get distance of garen to teemo
	var d = dist(garenX, garenY, teemoX, teemoY);
	// Check if it's an overlap
	if (d < garenWidth + teemoWidth) {
		// Increase the garen health
		garenHealth = constrain(garenHealth + eatHealth, 0, garenMaxHealth);
		// Reduce the teemo health
		teemoHealth = constrain(teemoHealth - eatHealth, 0, teemoMaxHealth);

		// Check if the teemo died
		if (teemoHealth === 0) {
			garenAttack.play();
			// Move the "new" teemo to a random position
			teemoX = random(0, width);
			teemoY = random(0, height);
			// Give it full health
			teemoHealth = teemoMaxHealth;
			// Track how many teemo were eaten
			teemoEaten++;
			//ex03.2 after kill teemo garen becomes bigger, and player can build a big garen
			garenWidth += 2;
			//ex03.3 bigger size means the game will become easier, for the balance, decrease the monvment speed
			garenMaxSpeed -= 0.2;
			//ex03.4 increase teemo's speed to increase difficulty
			teemoMaxSpeed += 0.2;
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


	teemoVX = map(noise(noiseX), 0, 1, -teemoMaxSpeed, teemoMaxSpeed);
	teemoVY = map(noise(noiseY), 0, 1, -teemoMaxSpeed, teemoMaxSpeed);


	// Update teemo position based on velocity
	teemoX += teemoVX;
	teemoY += teemoVY;


	noiseX += 0.01;
	noiseY += 0.01;
	// Screen wrapping
	if (teemoX < 0) {
		teemoX += width;
	} else if (teemoX > width) {
		teemoX -= width;
	}

	if (teemoY < 0) {
		teemoY += height;
	} else if (teemoY > height) {
		teemoY -= height;
	}
}

// drawTeemo()
//
// Draw the teemo as an ellipse with alpha based on health
function drawTeemo() {

	image(teemo, teemoX, teemoY, teemoWidth, teemoWidth);
}

// drawgaren()
//
// Draw the garen as an ellipse with alpha based on health
function drawgaren() {

	image(garen, garenX, garenY, garenWidth, garenWidth);
}

// showGameOver()
// Display text about the game being over!
// ex03.1 change gameover text, depending on the number of teemoEaten
function showGameOver() {
	textSize(32);
	textAlign(CENTER, CENTER);
	fill(66, 220, 244);
	var gameOverText = "GAME OVER\n";
	gameOverText += "You ate " + teemoEaten + " teemo\n";
	if (teemoEaten < 3) {
		gameOverText += " Good Job!!!";
	} else if (3 <= teemoEaten && teemoEaten < 10) {
		gameOverText += " SuPeR!!!";
	} else if (teemoEaten >= 10) {
		gameOverText += " UNBELIEVABLE!!!";
	}

	text(gameOverText, width / 2, height / 2);
}
