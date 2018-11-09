// StarLight
//
// A class of star light, use for the background, use array to store 150 starLight
// and display star light

// StarLight constructor
//
// Sets the properties with the provided arguments
function StarLight(x, y, vx, vy, size, speed) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.size = size;
  this.speed = speed;
}

//update()
//
//update star light's position
StarLight.prototype.update = function() {
  this.x += this.vx;
  this.y += this.vy;
  if (this.x + this.size / 2 < 0) {
    this.x += width;
  }
  if (this.x - this.size / 2 > width) {
    this.x -= width;
  }
  if (this.y + this.size / 2 < 0) {
    this.y += height;
  }
  if (this.y - this.size / 2 > height) {
    this.y -= height;
  }
}

//display
//
//display star light on screen
StarLight.prototype.display = function() {
  fill(255);
  ellipse(this.x, this.y, this.size, this.size);
}
