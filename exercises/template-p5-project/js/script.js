/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

// setup()
//
// Description of setup

var xiaogang;
function preload(){
  xiaogang = loadImage("assets/images/xiaogang.png");
}
function setup() {
createCanvas(800,800);

}


// draw()
//
// Description of draw()

function draw() {
imageMode(CENTER);
image(xiaogang,mouseX,mouseY,250,250);

}
