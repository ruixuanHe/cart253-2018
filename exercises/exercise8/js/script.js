/*****************

exercise8
Ruixuan He 40000330

I create a new kind of shooting game at this time, the effects of bullet, enemy and gun will be used in the final project
1. this prototype is also about the shooting, last time I use key contorl and this time is about mouse contorl
2. use p5.vector to create a new bullet object, it will have better performance
3. the bullet becomes more smooth and will gradually disappear
4. the enemy will has a explosion effect
5. the prototype using too many space, so program becomes pretty slow after 20s. need to fix this problem in final project
******************/

var gun
var bullet = [];
var enemy = [];
// setup()
//
// setup the canvas
function setup() {
  background(255, 200, 255);
  noStroke();
  rectMode(CENTER);
  ellipseMode(CENTER);
  createCanvas(800, 800);
  angleMode(DEGREES);
  gun = new Gun(width / 2, height / 2, 60);
  //enemy = new Enemy();
  for (var i = 0; i < 20; i++) {
    enemy.push(new Enemy());
  }
}

// draw()
//
// draw the canvas
function draw() {
  background(50, 40, 55);
  bullet.push(new Bullet(gun.x, gun.y, (gun.angle - 270)));

  for (var j = enemy.length - 1; j >= 0; j--) {
    enemy[j].update();
    enemy[j].display();
  }

  for (var i = bullet.length - 1; i >= 0; i--) {
    bullet[i].update();
    bullet[i].display();
    bullet[i].screenWramp();
    for (var j = enemy.length - 1; j >= 0; j--) {
      bullet[i].handleCollision(enemy[j]);
    }
    //console.log(enemy.crushSwitch);
    if(bullet[i].alive === false){
      bullet.splice(i,1);
    }
  }
  console.log(bullet.length);
  gun.update();
  gun.display();
}
