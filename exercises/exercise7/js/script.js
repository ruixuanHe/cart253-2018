/*============description==================
the idea is about a fighter pass through time and shot the enemy
1.I want to use simailar background which made by color block in my final project
2.fighter's operating sysment spend me a lot of time, I will implement it in final project
3.the collison handle of bullet doesnot work well, but the code is correct.
need to spend more time on the visual modification.
4.the idea of supplyCarte is interesting, case different effect on fighter. This will increase
user interaction
*/
//array of bullter
var bullet = [];

//vairable of supplyCarte
var bounceBulletSwitch = false;
var fasterBulletSwitch = false;
var biggerBulletSwitch = false;
//array of ColorBlock
var colorBlock = [];
//array of Enemy
var enemy = [];
// setup()
//
// Set up the canvas, position the images, set the image mode.
function setup() {
  noStroke();
  rectMode(CENTER);
  createCanvas(640, 640);
  angleMode(DEGREES);
  fighter = new Fighter(width / 2, height / 2, 50, 50);
  supplyCarte = new SupplyCarte();
  createEnemy();
}

// draw() method
// Moves the felt image linearly
// Moves the clown face toward the current mouse location
function draw() {
  background(0, 0, 0);
  createColorBlock();

  for (var i = 0; i < colorBlock.length; i++) {
    colorBlock[i].update();
    colorBlock[i].display();
  }
  for (var i = 0; i < enemy.length; i++) {
    enemy[i].update();
    enemy[i].display();
    console.log(bullet.length);
  }
  for (var i = 0; i < bullet.length; i++) {
    bullet[i].display();
    bullet[i].update();
    for (var j = 0; j < enemy.length; j++) {
      bullet[i].handleCollision(enemy[j]);
    }
    if (bounceBulletSwitch == true) {
      bullet[i].bounceBullet();
    }
    if (fasterBulletSwitch == true) {
      bullet[i].fasterBullet();
    }
    if (biggerBulletSwitch == true) {
      bullet[i].biggerBullet();
    }
  }
  fill(255, 255, 255);
  supplyCarte.update();
  supplyCarte.display();
  supplyCarte.handleCollision(fighter);
  fighter.update();
  fighter.handleInput();
  fighter.display();
}

// keyPressed()
//
// check user's input
function keyPressed() {
  fighter.keyPressed();
}

//createColorBlock()
//
//create color blocks for background
function createColorBlock() {
  for (var i = 0; i < 1; i++) {
    colorBlock.push(new ColorBlock());
  }
}

//createEnemy()
//
//create five enemies
function createEnemy() {
  for (var i = 0, j = 50; i < 5; i++) {
    enemy.push(new Enemy(j, 30, 50));
    j = j + 130;
  }
}
