// wormhole
//
// a new object of wormhole, wormhole will move in sin wave
// white wormhole will teleport ball to red wormhole. when ball overlap wormhole.

// wormhole constructor
//
// Sets the properties with the provided arguments
function Wormhole(x, y, size, vx) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.vx = vx;
  this.angle = 0;

}

//displayWormhole()
//
//display wormhole image on screen
Wormhole.prototype.displayWormhole = function(wormholeImage) {
  image(wormholeImage, this.x, this.y, this.size, this.size);
}

//overlap()
//
//detect , if the wormhole over lap ball, the static variable wormholeSwitch becomes true
Wormhole.prototype.overlap = function() {
  var d = dist(this.x, this.y, ball.x, ball.y);
  if (d < (ball.size / 2 + this.size / 2)) {
    wormholeSwitch = true;
  }
}

//updatePosition()
//
//wormhole move in a sin wave
Wormhole.prototype.updatePosition = function() {
  this.x += this.vx;
  this.y = this.y + (2 * sin(this.angle))
  this.angle += 0.15;
}

//warmp()
//
//warmp the screen
Wormhole.prototype.warmp = function() {
  if (this.x - this.size / 2 < 0) this.vx = -this.vx;
  if (this.x + this.size / 2 > width) this.vx = -this.vx;
}

//transmitte()
//
//when static variable wormholeSwitch is true, white wormhole will teleport ball
//to red wormhole. when ball overlap wormhole.
Wormhole.prototype.transmitte = function() {
  if (wormholeSwitch === true) {
    ball.x = this.x;
    ball.y = this.y;
    ball.vx = -ball.vx;
    ball.vy = -ball.vy;
    pinaoSound4.play();
    wormholeSwitch = false;
  }
}
