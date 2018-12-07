/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/
var angle = 0;
var x = 500 / 2;
var y = 500 / 2;
var j = 0;
var c;

// setup()
//
function setup() {
  createCanvas(500, 500);
  angleMode(DEGREES);
  c = color(111,111,250);
}

function draw() {
  noStroke();
  //fill(240, 215, 255,200);
  fill(60, 237, 253,200);
  quad(x-35,y,x,y-50,x+35,y,x,y+50);
  fill(245, 188, 255,150);
  triangle(x-35,y,x,y-50,x,y);
  fill(230, 180, 239,150);
  triangle(x,y-50,x+35,y,x,y);
  fill(216, 173, 223,150);
  triangle(x+35,y,x,y+50,x,y);
  fill(201, 165, 207,150);
  triangle(x-35,y,x,y+50,x,y);
}
