// Exercise 1 - Moving pictures
// Pippin Barr
//
// Starter code for exercise 1.
// It moves two pictures around on the canvas.
// One moves linearly down the screen.
// One moves toward the mouse cursor.


// The image of a clown face
var clownImage;
// The current position of the clown face
var clownImageX;
var clownImageY;

// The transparent image of "felt" that wipes down the canvas
var feltTextureImage;
// The current position of the transparent image of "felt"
var feltTextureImageX;
var feltTextureImageY;

//add a pig image and its X & Y coordinator
var pigImage;
var pigImageX;
var pigImageY;

//add a wolf image and its X & Y coordinator
var wolfImage;
var wolfImageX;
var wolfmageY;

//add peppa pig image and its X & Y coordinator
var pImage;
var pImageX;
var pImageY;

// preload() method
// Load the two images we're using before the program starts
// load pigImage
// load wolfImage
// load peppa pig image
function preload() {
  clownImage = loadImage("assets/images/clown.png");
  feltTextureImage = loadImage("assets/images/black-felt-texture.png");
  pigImage = loadImage("assets/images/pig.ico");
  wolfImage = loadImage("assets/images/wolf.png");
  pImage = loadImage("assets/images/peppa.png");
}


// setup()
//
// Set up the canvas, position the images, set the image mode.

function setup() {
  // Create our canvas
  createCanvas(640,640);

  // Start the clown image at the centre of the canvas
  clownImageX = width/2;
  clownImageY = height/2;

  // Start the felt image perfectly off screen above the canvas
  feltTextureImageX = width/2;
  feltTextureImageY = 0 - feltTextureImage.height/2;

  // Start the pig image at the centre left of the canvas
  pigImageY = height/2;
  pigImageX = 0;

  //Start the wolf image at the centre of the canvas
  wolfImageX = width/2;
  wolfImageY = height/2;

  //Start the peppa pig image at the centre of the canvas
  pImageX = width/2;
  pImageY = height/2;
  // We'll use imageMode CENTER for this script
  imageMode(CENTER);
}


// draw() method
// Moves the felt image linearly
// Moves the clown face toward the current mouse location

function draw() {

  // Move the felt image down by increasing its y position
  feltTextureImageY += 1;

  // Display the felt image
  image(feltTextureImage,feltTextureImageX,feltTextureImageY);

  // Move the clown by moving it 1/10th of its current distance from the mouse

  // Calculate the distance in X and in Y
  var xDistance = mouseX - clownImageX;
  var yDistance = mouseY - clownImageY;
  // Add 1/10th of the x and y distance to the clown's current (x,y) location
  clownImageX = clownImageX + xDistance/10;
  clownImageY = clownImageY + yDistance/10;

  // Display the clown image
  image(clownImage,clownImageX,clownImageY);

  //move the pigImage 5 units per loop and stop when pigImage reach the edge
  if(pigImageX <= (width-pigImage.width/2))
  pigImageX += 5;
  image(pigImage,pigImageX,pigImageY);

  //display a wolf under mouse
  wolfImageX = mouseX;
  wolfImageY = mouseY;
  image(wolfImage,wolfImageX,wolfImageY,150,150);

  // Calculate the distance in X and in Y
  var xpDistance = mouseX - pImageX;
  var ypDistance = mouseY - pImageY;
  //add a moving peppa Image
  pImageX = pImageX + xpDistance/150;
  pImageY = pImageY + ypDistance/150;
  image(pImage,pImageX,pImageY,150,150);

}
