// TeleportSpot
//
// a new object of TeleportSpot, two teleport spot will transmitte object

// TeleportSpot constructor
//
// Sets the properties with the provided arguments
function TeleportSpot(x, y, type) {
  this.x = x;
  this.y = y;
  this.TeleportSpotSwitch = false;
  this.type = type;
}

//displayTeleportSpot()
//
//display TeleportSpot image on screen
TeleportSpot.prototype.display = function() {
  push();
  translate(this.x, this.y);
  if (this.type === "1") {
    fill(60, 237, 253, 200);
  }
  if (this.type === "2") {
    fill(240, 215, 255, 200);
  }
  quad(0 - 20, 0, 0, 0 - 50, 0 + 20, 0, 0, 0 + 50);
  fill(245, 188, 255, 150);
  triangle(0 - 20, 0, 0, 0 - 50, 0, 0);
  fill(230, 180, 239, 150);
  triangle(0, 0 - 50, 0 + 20, 0, 0, 0);
  fill(216, 173, 223, 150);
  triangle(0 + 20, 0, 0, 0 + 50, 0, 0);
  fill(201, 165, 207, 150);
  triangle(0 - 20, 0, 0, 0 + 50, 0, 0);
  pop();
}

//transmitte()
//
//when shooter overlap the teleportm, it will transmitte shooter to the other one
TeleportSpot.prototype.transmitte = function(shooter, anotherTeleportSpot) {
  var d = dist(this.x, this.y, shooter.x, shooter.y);
  if (d < (shooter.size / 2)) {
    shooter.x = anotherTeleportSpot.x + (this.x - shooter.x);
    shooter.y = anotherTeleportSpot.y + (this.y - shooter.y);
  }
}
