let timer = 4
var plastic;


function preload() {
  plastic = loadImage('assets/plastic.jpeg');

}

function setup() {
  createCanvas(800, 600);
  image(plastic, 0, 0);
  plastic.resize(0.5,0.5);
  frameRate(10)
}

function draw() { 
    if (timer > 0) {
      timer = timer-0.1;
      
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
      text("Did you know that plastic takes 800years to decompose?", width/2, height*0.7);
    }
}

