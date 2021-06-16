var s; //snake variable
var scl = 20; //to define the scale of the game, and basically dividing complete canvas into grid
         // of 20 pixels; not using scale as var name because that is a built in function  
var food;

function setup(){
  createCanvas(1920, 940);
  s = new Snake();
  s.update();
  s.show();
  frameRate(12); //to manually change number of frames per second
                  //reducing it to give a retro feeling ;) //
  pickLocation(); 
}

function pickLocation(){
  cols = floor(width/scl);
  rows = floor(height/scl);
  
  food = createVector(floor(random(cols)), floor(random(rows)));  //quick and easy way to store                                                                      //both x and y
  food.mult(scl);
}

function draw(){     //draw function will be called everytime a frame updates
  background(51);
  s.update();
  s.death();
  s.show();
  
  if (s.eat(food)){
    pickLocation();
  }
  
  fill(255, 0, 100);
  rect(food.x, food.y, scl, scl);
  
}

function keyPressed(){
  if(keyCode === UP_ARROW){    //keyCode and UP_ARROW are predefined function of p5s.js library
    s.dir(0, -1);  //-1 is up; dir is function we have defined
  }else if(keyCode === DOWN_ARROW){
    s.dir(0, 1);
  }else if(keyCode === LEFT_ARROW){
    s.dir(-1, 0);  //-1 is left
  }else if(keyCode === RIGHT_ARROW){
    s.dir(1, 0);
  }
}

function Snake(){
  
  this.x = 0; //x coordinate of snake
  this.y = 0;
  this.xspeed = 1; //speed in x direction
  this.yspeed = 0;
  this.total = 0;
  this.tail = [];
  
  this.eat = function(pos){
    var d = dist(this.x, this.y, pos.x, pos.y);
    if (d < 1) {
      this.total++;
      return true;
    } else {
      return false;
    }
  }
  
  this.dir = function(x, y){  //to specify the direction of snake
    this.xspeed = x;
    this.yspeed = y;
  }
  
  this.death = function() {
    for(var i=0; i<this.tail.length; i++)
      {
        var pos = this.tail[i];
        var selfd = dist(this.x, this.y, pos.x, pos.y)
        if(selfd<1) {
          this.total = 0;
          this.tail = [];
          // print('game over ;) restart to play again');
          // noLoop();
        }
      }
  }
  
  this.update = function() {   //to update the snake each time draw is called
    for(var i=0; i<this.tail.length-1; i++){
      this.tail[i] = this.tail[i+1];
    }
    this.tail[this.total-1] = createVector(this.x, this.y);
    
    
    this.x = this.x + this.xspeed*scl;
    this.y = this.y + this.yspeed*scl;
    
    this.x = constrain(this.x, 0, width-scl);  //constrain is an inbuilt function which will
    this.y = constrain(this.y, 0, height-scl); //not let x and y coordinate to go out of frame
  }
  
  this.show = function() {
    fill(255); //white color
    for(var i = 0; i<this.tail.length; i++) {
      rect(this.tail[i].x, this.tail[i].y, scl, scl);
    }
    rect(this.x, this.y, scl, scl); //basic snake object 
  }
}

