/*********************************************************

Exercise 2 - The Artful Dodger
Pippin Barr & Ruixuan He

Starter code for exercise 2.

*********************************************************/

// The position and size of our avatar circle
var avatarX;
var avatarY;
var avatarSize = 50;

// The speed and velocity of our avatar circle
var avatarSpeed = 10;
var avatarVX = 0;
var avatarVY = 0;

// The position and size of the enemy circle
var enemyX;
var enemyY;
var enemySize = 50;
// How much bigger the enemy circle gets with each successful dodge
var enemySizeIncrease = 5;

// the variable of increasing size and enemySpeed
var avatarSizeIncrease;
var avatarSpeedIncrease;
// The speed and velocity of our enemy circle
var enemySpeed = 5;
var enemyVX = 5;
// How much bigger the enemy circle gets with each successful dodge
var enemySpeedIncrease = 0.5;

// How many dodges the player has made
var dodges = 0;

// reddness of background color
var reddness=250;

// add a variable of image
var img;

// setup()
// Make the canvas, position the avatar and anemy
function setup() {
  // Create our playing area
  createCanvas(500,500);

  // Put the avatar in the centre
  avatarX = width/2;
  avatarY = height/2;

  // Put the enemy to the left at a random y coordinate within the canvas
  enemyX = 0;
  enemyY = random(0,height);

  // No stroke so it looks cleaner
  noStroke();
  //preload peppa pig image
  img = loadImage("image/peppa.png");
}

// draw()
//
// Handle moving the avatar and enemy and checking for dodges and
// game over situations.
function draw() {
  // A lige blue background
  background(reddness, 239, 214);

  // Default the avatar's velocity to 0 in case no key is pressed this frame
  avatarVX = 0;
  avatarVY = 0;

  // Check which keys are down and set the avatar's velocity based on its
  // speed appropriately

  // Left and right
  if (keyIsDown(LEFT_ARROW)) {
    avatarVX = -avatarSpeed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    avatarVX = avatarSpeed;
  }

  // Up and down (separate if-statements so you can move vertically and
  // horizontally at the same time)
  if (keyIsDown(UP_ARROW)) {
    avatarVY = -avatarSpeed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    avatarVY = avatarSpeed;
  }

  // Move the avatar according to its calculated velocity
  avatarX = avatarX + avatarVX;
  avatarY = avatarY + avatarVY;

  // The enemy always moves at enemySpeed (which increases)
  enemyVX = enemySpeed;
  // Update the enemy's position based on its velocity
  enemyX = enemyX + enemyVX;

  // Check if the enemy and avatar overlap - if they do the player loses
  // We do this by checking if the distance between the centre of the enemy
  // and the centre of the avatar is less that their combined radii

  // challenge 3 : when play doge , the background color will change
  if (dist(enemyX,enemyY,avatarX,avatarY) < enemySize/2 + avatarSize/2) {
    // reset reddness
    reddness = 250;
    // reset avator's size and speed
    avatarSize = 50;
    avatarSpeed = 10;
    // Tell the player they lost
    console.log("YOU LOSE!");
    // Reset the enemy's position
    enemyX = 0;
    enemyY = random(0,height);
    // Reset the enemy's size and speed
    enemySize = 50;
    enemySpeed = 5;
    // Reset the avatar's position
    avatarX = width/2;
    avatarY = height/2;
    // Reset the dodge counter
    dodges = 0;
  }

  // Check if the avatar has gone off the screen (cheating!)
  if (avatarX < 0 || avatarX > width || avatarY < 0 || avatarY > height) {

    // If they went off the screen they lose in the same way as above.
    reddness = 250;
    avatarSize = 50;
    avatarSpeed = 10;
    console.log("YOU LOSE!");
    enemyX = 0;
    enemyY = random(0,height);
    enemySize = 50;
    enemySpeed = 5;
    avatarX = width/2;
    avatarY = height/2;
    dodges = 0;
  }

  // Check if the enemy has moved all the way across the screen
  if (enemyX > width) {
    //change the reddness, the bgcolor will become deeper and deeper
    reddness = reddness -30;
    // This means the player dodged so update its dodge statistic
    dodges = dodges + 10;
    // Tell them how many dodges they have made
    console.log(dodges + " DODGES!");
    // Reset the enemy's position to the left at a random height
    enemyX = 0;
    enemyY = random(0,height);
    // Increase the enemy's speed and size to make the game harder
    enemySpeed = enemySpeed + enemySpeedIncrease;
    enemySize = enemySize + enemySizeIncrease;
    // Increase the player's size and enemySpeed( between -10,10)
    avatarSizeIncrease  = random(-10,10);
    avatarSpeedIncrease = random(-10,10);

    if((avatarSize + avatarSizeIncrease)>=0) avatarSize += avatarSizeIncrease;

    if((avatarSpeed + avatarSpeedIncrease)>=0) avatarSpeed += avatarSpeedIncrease;

  }

  // challenge 4: when user dodges morethan 5 balls, display comment and peppa pig as a reward
  if(dodges >= 5 ){
    imageMode(CENTER);
    image(img,width/2,height/2,500,500);

    textAlign(CENTER);
    textSize(15);

    fill(0,102,153);
    text("You Are My Hero!!!",width/2,28);

    if(dodges >= 10){
      text("You are so Great!!!",width/2,43);
    }
    if(dodges >= 20){
      text("Impossible!!!",width/2,58);
    }
  }


  // Display the current number of successful in the console
  console.log(dodges);
  // challenge 1: Display the current number of successful on the screen
  textAlign(CENTER);
  textSize(15);
  fill(0,102,153);
  text("You have dodged "+dodges+ " balls",width/2,13);

  // The player is green
  fill(0, 255, 4);
  // challenge 3: Draw the player as a square
  rect(avatarX,avatarY,avatarSize,avatarSize);

  // The enemy is pueple
  fill(123, 0, 255);
  // Draw the enemy as a square
  rect(enemyX,enemyY,enemySize,enemySize);

}
