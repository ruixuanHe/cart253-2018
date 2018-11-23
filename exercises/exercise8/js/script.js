/*****************

exercise8
Ruixuan He 40000330

******************/

var gun
var bullet = [];
// setup()
//
// setup the canvas
function setup() {
  background(255, 200, 255);
  noStroke();
  rectMode(CENTER);
  createCanvas(800, 800);
  angleMode(DEGREES);
  gun = new Gun(width / 2, height / 2, 60);
}

// draw()
//
// draw the canvas
function draw() {
  background(50, 40, 55);
  bullet.push(new Bullet(gun.x, gun.y, (gun.angle - 270)));
  for (var i = bullet.length - 1; i >= 0; i--) {
    bullet[i].update();
    bullet[i].display();
    bullet[i].screenWramp();
    if (bullet[i].velocity.mag() < 0.1) {
      bullet.splice(i, 1);
    }
  }
  gun.update();
  gun.display();
}
