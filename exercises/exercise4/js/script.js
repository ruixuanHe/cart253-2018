  // Pong
  // by Pippin Barr & Ruixuan He 40000330
  //
  // A primitive implementation of Pong with no scoring system
  // just the ability to play the game with the keyboard.

  // Game colors
  var bgColor = 0;
  var fgColor = 255;
  ///////// NEW /////////
  // challenge 4 variable
  var teemoImg;
  var mashroom;
  var tlaugh1;
  var tlaugh2;
  var gameStart;
  var bmg;
  var gameStartPlay = false;
  var grass;
  // challenge 2 variable
  var rightWin = false;
  var leftWin = false;
  var bgColorB = 0;
  var bgColorR = 0;
  //challenge 1 variable of score
  var leftPaddleScore = 0;
  var rightPaddleScore = 0;
  ///////// END NEW /////////

  // teemo

  // Basic definition of a teemo object with its key properties of
  // position, size, velocity, and speed
  var teemo = {
    x: 0,
    y: 0,
    size: 50,
    vx: 0,
    vy: 0,
    speed: 5
  }

  // PADDLES

  // How far in from the walls the paddles should be drawn on x
  var paddleInset = 50;

  // LEFT PADDLE

  // Basic definition of a left paddle object with its key properties of
  // position, size, velocity, and speed
  var leftPaddle = {
    x: 0,
    y: 0,
    w: 20,
    h: 70,
    vx: 0,
    vy: 0,
    speed: 5,
    upKeyCode: 87, // The key code for W
    downKeyCode: 83, // The key code for S
    ///////// NEW /////////
    //change paddle's color
    color: '#f7c0e7'
    ///////// END NEW /////////
  }

  // RIGHT PADDLE

  // Basic definition of a left paddle object with its key properties of
  // position, size, velocity, and speed
  var rightPaddle = {
    x: 0,
    y: 0,
    w: 20,
    h: 70,
    vx: 0,
    vy: 0,
    speed: 5,
    upKeyCode: 38, // The key code for the UP ARROW
    downKeyCode: 40, // The key code for the DOWN ARROW
    ///////// NEW /////////
    //change paddle's color
    color: '#c0f7e9'
    ///////// END NEW /////////
  }

  // A variable to hold the beep sound we will play on bouncing
  var beepSFX;

  // preload()
  //
  // Loads the beep audio for the sound of bouncing
  function preload() {
    beepSFX = new Audio("assets/sounds/beep.wav");
    ///////// NEW /////////
    bgm = new Audio("assets/sounds/bgm.mp3");
    tlaugh1 = new Audio("assets/sounds/laugh1.mp3");
    tlaugh2 = new Audio("assets/sounds/laugh2.mp3");
    gameStart = new Audio("assets/sounds/gameStart.mp3");
    teemoImg = loadImage("assets/images/teemo.jpg");
    mashroom = loadImage("assets/images/mashroom.png");
    grass = loadImage("assets/images/grass.png");
    ///////// END NEW /////////
  }

  // setup()
  //
  // Creates the canvas, sets up the drawing modes,
  // Sets initial values for paddle and teemo positions
  // and velocities.
  function setup() {
    // Create canvas and set drawing modes
    createCanvas(640, 480);
    rectMode(CENTER);
    noStroke();
    ///////// NEW /////////
    imageMode(CENTER);
    ///////// END NEW /////////
    setupPaddles();
    setupteemo();
  }

  // setupPaddles()
  //
  // Sets the positions of the two paddles
  function setupPaddles() {
    // Initialise the left paddle
    leftPaddle.x = paddleInset;
    leftPaddle.y = height / 2;

    // Initialise the right paddle
    rightPaddle.x = width - paddleInset;
    rightPaddle.y = height / 2;
  }

  // setupteemo()
  //
  // Sets the position and velocity of the teemo
  function setupteemo() {
    teemo.x = width / 2;
    teemo.y = height / 2;
    teemo.vx = teemo.speed;
    teemo.vy = teemo.speed;
  }

  // draw()
  //
  // Calls the appropriate functions to run the game
  function draw() {
    ///////// NEW /////////
    //start polay the background music and gamestart voice
    bgm.play();
    gameStartPlaY();
///////// END NEW /////////
    // Handle input
    // Notice how we're using the SAME FUNCTION to handle the input
    // for the two paddles!
    handleInput(leftPaddle);
    handleInput(rightPaddle);

    // Update positions of all objects
    // Notice how we're using the SAME FUNCTION to handle the input
    // for all three objects!
    updatePosition(leftPaddle);
    updatePosition(rightPaddle);
    updatePosition(teemo);

    // Handle collisions
    handleteemoWallCollision();
    handleteemoPaddleCollision(leftPaddle);
    handleteemoPaddleCollision(rightPaddle);

    // Handle the teemo going off screen
    handleteemoOffScreen();
    ///////// NEW /////////
    //display the socre by changing the background color and paddle shape
    displayScore();
    leftWin = false;
    rightWin = false;
    displaygrass();
    //displayMashroom();
    ///////// END NEW /////////

    // Display the paddles and teemo
    displayPaddle(leftPaddle);
    displayPaddle(rightPaddle);
    displayteemo();
  }


  // handleInput(paddle)
  //
  // Updates the paddle's velocity based on whether one of its movement
  // keys are pressed or not.
  // Takes one parameter: the paddle to handle.
  function handleInput(paddle) {

    // Set the velocity based on whether one or neither of the keys is pressed

    // NOTE how we can change properties in the object, like .vy and they will
    // actually CHANGE THE OBJECT PASSED IN, this allows us to change the velocity
    // of WHICHEVER paddle is passed as a parameter by changing it's .vy.

    // UNLIKE most variables passed into functions, which just pass their VALUE,
    // when we pass JAVASCRIPT OBJECTS into functions it's the object itself that
    // gets passed, so we can change its properties etc.

    // Check whether the upKeyCode is being pressed
    // NOTE how this relies on the paddle passed as a parameter having the
    // property .upKey
    if (keyIsDown(paddle.upKeyCode)) {
      // Move up
      paddle.vy = -paddle.speed;
    }
    // Otherwise if the .downKeyCode is being pressed
    else if (keyIsDown(paddle.downKeyCode)) {
      // Move down
      paddle.vy = paddle.speed;
    } else {
      // Otherwise stop moving
      paddle.vy = 0;
    }
  }

  // updatePosition(object)
  //
  // Sets the position of the object passed in based on its velocity
  // Takes one parameter: the object to update, which will be a paddle or a teemo
  //
  // NOTE how this relies on the object passed in have .x, .y, .vx, and .vy
  // properties, which is true of both the two paddles and the teemo
  function updatePosition(object) {
    object.x += object.vx;
    object.y += object.vy;
  }

  // handleteemoWallCollision()
  //
  // Checks if the teemo has overlapped the upper or lower 'wall' (edge of the screen)
  // and is so reverses its vy
  function handleteemoWallCollision() {

    // Calculate edges of teemo for clearer if statement below
    var teemoTop = teemo.y - teemo.size / 2;
    var teemoBottom = teemo.y + teemo.size / 2;
    var teemoLeft = teemo.x - teemo.size / 2;
    var teemoRight = teemo.x + teemo.size / 2;

    // Check for teemo colliding with top and bottom
    if (teemoTop < 0 || teemoBottom > height) {
      // If it touched the top or bottom, reverse its vy
      teemo.vy = -teemo.vy;
      // Play our bouncing sound effect by rewinding and then playing
      beepSFX.currentTime = 0;
      beepSFX.play();
    }
  }

  // handleteemoPaddleCollision(paddle)
  //
  // Checks if the teemo overlaps the specified paddle and if so
  // reverses the teemo's vx so it bounces
  function handleteemoPaddleCollision(paddle) {

    // Calculate edges of teemo for clearer if statements below
    var teemoTop = teemo.y - teemo.size / 2;
    var teemoBottom = teemo.y + teemo.size / 2;
    var teemoLeft = teemo.x - teemo.size / 2;
    var teemoRight = teemo.x + teemo.size / 2;

    // Calculate edges of paddle for clearer if statements below
    var paddleTop = paddle.y - paddle.h / 2;
    var paddleBottom = paddle.y + paddle.h / 2;
    var paddleLeft = paddle.x - paddle.w / 2;
    var paddleRight = paddle.x + paddle.w / 2;

    // First check it is in the vertical range of the paddle
    if (teemoBottom > paddleTop && teemoTop < paddleBottom) {
      // Then check if it is touching the paddle horizontally
      if (teemoLeft < paddleRight && teemoRight > paddleLeft) {
        // Then the teemo is touching the paddle so reverse its vx
        teemo.vx = -teemo.vx;
        // Play our bouncing sound effect by rewinding and then playing
        beepSFX.currentTime = 0;
        beepSFX.play();
      }
    }
  }

  // handleteemoOffScreen()
  //
  // Checks if the teemo has gone off screen to the left or right
  // and moves it back to the centre if so
  function handleteemoOffScreen() {

    // Calculate edges of teemo for clearer if statement below
    var teemoLeft = teemo.x - teemo.size / 2;
    var teemoRight = teemo.x + teemo.size / 2;
    ///////// NEW /////////
    // Check for teemo going off the sides
    if (teemoLeft > width) {
      //update score and display it at console
      leftPaddleScore++;
      leftWin = true;
      console.log("leftPaddle score: " + leftPaddleScore + "\n");
      console.log("rightPaddle score: " + rightPaddleScore + "\n" + teemo.vy);

      // If it went off either side, reset it to the centre
      teemo.x = width / 2;
      teemo.y = height / 2;
      //call reset function
      reset();

    }

    if (teemoRight < 0) {
      //update score and display it at console
      rightPaddleScore++;
      rightWin = true;
      console.log("leftPaddle score: " + leftPaddleScore + "\n");
      console.log("rightPaddle score: " + rightPaddleScore + "\n" + teemo.vy);

      // If it went off either side, reset it to the centre
      teemo.x = width / 2;
      teemo.y = height / 2;
      //call reset function
      reset();
      //call displayMashroom
      displayMashroom();
    }

    ///////// END NEW /////////
    // NOTE that we don't change its velocity here so it just
    // carries on moving with the same velocity after its
    // position is reset.
    // This is where we would count points etc!


  }
  ///////// NEW /////////
  function displayScore() {
    //change background color
    background(bgColorR, 130, bgColorB);
    //update paddle shape and background color
    //if left paddle win, background color will turn red
    //if right paddle win, background color will turn blue
    //using constrain method to prevent value overflow
    if (leftWin) {
      bgColorR += 50;
      bgColorB -= 100;
      bgColorB = constrain(bgColorB, 0, 255);
      bgColorR = constrain(bgColorR, 0, 255);
      leftPaddle.h -= 1.5;
      leftPaddle.w += 1.5;
      leftPaddle.h = constrain(leftPaddle.h, 35, 70);
      leftPaddle.w = constrain(leftPaddle.w, 30, 45);
      tlaugh1.play();
    }
    if (rightWin) {
      bgColorB += 50;
      bgColorR -= 100;
      bgColorB = constrain(bgColorB, 0, 255);
      bgColorR = constrain(bgColorR, 0, 255);
      rightPaddle.h -= 1.5;
      rightPaddle.w += 1.5;
      rightPaddle.h = constrain(rightPaddle.h, 35, 70);
      rightPaddle.w = constrain(rightPaddle.w, 30, 45);
      tlaugh2.play();
    }

  }
  //challenge 3 function reset
  //change its vx depending on leftPaddleScore and rightPaddleScore
  //change its vy to a random number
  function reset() {

    if (leftPaddleScore > rightPaddleScore) {
      if (teemo.vx > 0) teemo.vx = -teemo.vx;

    }
    if (rightPaddleScore > leftPaddleScore) {
      if (teemo.vx < 0) teemo.vx = -teemo.vx;

    }
    teemo.vy = map(random(0, 25), 0, 25, -teemo.speed, teemo.speed);
  }
  //challenge 4 function gameStartPlaY()
  function gameStartPlaY() {
    if (gameStartPlay == false) {
      gameStart.play();
      gameStartPlay = true;
    }
  }
  // challenge 4 function displaygrass()
  //
  // Draws grass on screen
  function displaygrass() {
    image(grass, width/2, -11, width, 200);

    image(grass, width/2, height-51, width, 200);

  }


  // challenge 4 function displayteemo()
  //
  // Draws teemo on screen based on its properties
  function displayteemo() {
    image(teemoImg, teemo.x, teemo.y, teemo.size, teemo.size);
  }
  // challenge 4 function displayMashroom()
  //
  // Draws the mashroom on the map
  function displayMashroom() {

      image(mashroom, random(0,width), random(0, height), 30, 30);
  }


  ///////// END NEW /////////
  // displayPaddle(paddle)
  //
  // Draws the specified paddle on screen based on its properties
  function displayPaddle(paddle) {
    ///////// NEW /////////
    push();
    fill(paddle.color);
    rect(paddle.x, paddle.y, paddle.w, paddle.h);
    pop();
    ///////// END NEW /////////
  }
