/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

// setup()
//
function setup() {
  createCanvas(500,500);
  // Default style settings for text, shape, and color
  textSize(32);
  textAlign(CENTER,CENTER);
  rectMode(CENTER);
  fill(255,0,0);
  noStroke();
}
function draw() {
  background(255);
  rect(width/2,height/2,100,100);
  push(); // Save the current settings (the defaults in this case)
  fill(0); // Make a change for this specific case
  text("This is nice!",width/2,height/2);
  pop(); // Restore the settings (the defaults)
  // fill() goes back to red)
  if (mouseIsPressed) {
    push(); // Save the current settings (still the defaults)
    textSize(200);
    textAlign(LEFT,CENTER);
    text("!!!!!!!!!!!!",0,height/2);
    pop(); // Restore the settings (the defaults)
    // textSize() goes back to 32
    // textAlign() goes back to CENTER, CENTER
  }
}
