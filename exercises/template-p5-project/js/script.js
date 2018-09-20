/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

// setup()
//
// Description of setup
var x = 0;
function setup() {
  createCanvas(500,500);
}
function draw() {
}
function mousePressed() {
  // Increase x by 1 half the time
  if (random() < 0.5) {
    x = x + 1;
    console.log("x increased to " + x + "!");
  }
}
