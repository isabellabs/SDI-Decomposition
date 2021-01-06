let timer = 4
var plastic;
// timer = 60 equivale a 1s

//timer paperbag = 60
//timer fruta = 60
//timer can = 8000
//timer plastic = 18000
//timer styrofoam = infinite

function preload() {
  plastic = loadImage('assets/plastic.jpeg');
  paperbag = loadImage('assets/paperbag-2.jpg');
  can = loadImage('assets/can-3.jpg');
  fruit = loadImage('assets/fruit-3.jpg');
  styrofoam = loadImage('assets/styrofoam-2.jpg');
}

function setup() {
  createCanvas(800, 600);
  image(plastic, 0, 0);
  //frameRate(10)
}

function draw() { 
    if (timer > 0) {
      timer = timer-1;
      
      var x1 = random(width);
      var y1 = random(height);

      var x2 = round(x1 + random(-10, 10));
      var y2 = round(y1 + random(-10, 10));

      var w = 150;
      var h = 50;

      set(x2, y2, get(x1, y1, w, h));
      
    }
    
    if (timer <= 0) {
      textSize(20);
      background(200);
      text("Did you know that plastic takes 800 years to decompose?", width/2, height*0.7);
    }
}

