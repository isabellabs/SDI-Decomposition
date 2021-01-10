let timer = 600;
let plastic;
const flock = [];
let alignSlider, cohesionSlider, separationSlider;


function preload() {
  plastic = loadImage('assets/plastic-3.jpg');
}

function setup() {
  createCanvas(1920, 1080);
  image(plastic, 0, 0);
  alignSlider = createSlider(0, 2, 1, 0.1);
  cohesionSlider = createSlider(0, 2, 1, 0.1);
  separationSlider = createSlider(0, 2, 1, 0.1);
  for (let i = 0; i < 150; i++) {
    flock.push(new Boid());
  }
}

function draw() { 
    if (timer > 0) {
      timer = timer-1;
      print(timer);
      var x1 = random(width);
      var y1 = random(height);

      var x2 = round(x1 + random(-5, 5));
      var y2 = round(y1 + random(-5, 5));

      var w = 150;
      var h = 50;

      set(x2, y2, get(x1, y1, w, h));
      
      for (let boid of flock) {
        boid.edges();
        boid.flock(flock);
        boid.update();
        boid.show();
      }
    }
    
    if (timer <= 0) {
      textSize(20);
      background(0);
      fill(255);
      text("Did you know that plastic takes 800 years to decompose?", width/2, height/2);
    }
}

