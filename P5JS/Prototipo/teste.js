let timer = 60
var plastic;
const flock = [];
let alignSlider, cohesionSlider, separationSlider;
// timer = 60 equivale a 1s

//timer paperbag = 60
//timer fruta = 60
//timer can = 8000
//timer plastic = 18000
//timer styrofoam = 40000000

function preload() {

  plastic = loadImage('assets/plastic-2.jpg');
  plasticEnd = loadImage('assets/plastic.png');
  paperbag = loadImage('assets/paperbag-2.jpg');
  paperbagEnd = loadImage('assets/paperbag.png');
  can = loadImage('assets/can-1.jpg');
  canEnd = loadImage('assets/can.png');
  fruit = loadImage('assets/fruit-1.jpg');
  fruitEnd = loadImage('assets/apple.png');
  styrofoam = loadImage('assets/styrofoam-2.jpg');
  styrofoamEnd = loadImage('assets/styrofoam.png');
}

function setup() {
  createCanvas(1920, 1080);
  //neutral - case 0
  //image(neutral, 0, 0);

  //fruit - case 1
  //image(fruit, 0, 0);

  //paperbag - case 2
  //image(paperbag, 0, 0);

  //can - case 3
  //image(can, 0, 0);

  //plastic - case 4
  image(plastic, 0, 0);

  //styrofoam - case 5
  //image(styrofoam, 0, 0);

  alignSlider = createSlider(0, 2, 1, 0.1);
  cohesionSlider = createSlider(0, 2, 1, 0.1);
  separationSlider = createSlider(0, 2, 1, 0.1);
  for (let i = 0; i < 100; i++) {
    flock.push(new Boid());
  }
}

function draw() { 

  //fruta case 1
  timer = 60
  if (timer > 0) {
    timer = timer-1;
    print(timer);
    var x1 = random(width);
    var y1 = random(height);

    var x2 = round(x1 + random(-150, 150));
    var y2 = round(y1 + random(-150, 150));

    var w = 200;
    var h = 100;

    set(x2, y2, get(x1, y1, w, h));
    
    for (let boid of flock) {
      boid.edges();
      boid.flock(flock);
      boid.update();
      boid.show();
    }

    fill(0, 0, 0, 255);
    rect(0, 0, 1920, 56);
    fill(255, 255, 255, 255);
    textAlign(CENTER);
    textSize(20);
    text("APPLE - 2 MONTHS TO DECOMPOSE", width/2, 40);
  }
    
  if (timer <= 0) {
    image(fruitEnd, 0, 0);
  }

  //paperbag - case 2
  timer = 60
  if (timer > 0) {
    timer = timer-1;
    print(timer);
    var x1 = random(width);
    var y1 = random(height);

    var x2 = round(x1 + random(-160, 160));
    var y2 = round(y1 + random(-160, 160));

    var w = 210;
    var h = 110;

    set(x2, y2, get(x1, y1, w, h));
    
    for (let boid of flock) {
      boid.edges();
      boid.flock(flock);
      boid.update();
      boid.show();
    }

    fill(0, 0, 0, 255);
    rect(0, 0, 1920, 56);
    fill(255, 255, 255, 255);
    textAlign(CENTER);
    textSize(20);
    text("PAPERBAG - 8 WEEKS TO DECOMPOSE", width/2, 40);
  }
    
  if (timer <= 0) {
    image(paperbagEnd, 0, 0);
  }

  //can - case 3
  timer = 8000
  if (timer > 0) {
    timer = timer-1;
    print(timer);
    var x1 = random(width);
    var y1 = random(height);

    var x2 = round(x1 + random(-10, 10));
    var y2 = round(y1 + random(-10, 10));

    var w = 150;
    var h = 50;

    set(x2, y2, get(x1, y1, w, h));
    
    for (let boid of flock) {
      boid.edges();
      boid.flock(flock);
      boid.update();
      boid.show();
    }

    fill(0, 0, 0, 255);
    rect(0, 0, 1920, 56);
    fill(255, 255, 255, 255);
    textAlign(CENTER);
    textSize(20);
    text("ALUMINIUM CAN - 200 YEARS TO DECOMPOSE", width/2, 40);
  }
    
  if (timer <= 0) {
    image(canEnd, 0, 0);
  }

  //plastic - case 4
  timer = 18000
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

    fill(0, 0, 0, 255);
    rect(0, 0, 1920, 56);
    fill(255, 255, 255, 255);
    textAlign(CENTER);
    textSize(20);
    text("PLASTIC BOTTLE - 450 YEARS TO DECOMPOSE", width/2, 40);
  }
    
  if (timer <= 0) {
    image(plasticEnd, 0, 0);
  }

  //styrofoam - case 5
  timer = 40000000
  if (timer >= 39999000) {
    timer = timer-1;
    print(timer);
    var x1 = random(width);
    var y1 = random(height);

    var x2 = round(x1 + random(-1, 1));
    var y2 = round(y1 + random(-1, 1));

    var w = 100;
    var h = 25;

    set(x2, y2, get(x1, y1, w, h));
    
    for (let boid of flock) {
      boid.edges();
      boid.flock(flock);
      boid.update();
      boid.show();
    }

    fill(0, 0, 0, 255);
    rect(0, 0, 1920, 56);
    fill(255, 255, 255, 255);
    textAlign(CENTER);
    textSize(20);
    text("STYROFOAM - 1 MILLION YEARS TO DECOMPOSE", width/2, 40);

  }

  if (timer > 0 && timer <= 39999000) {
    timer = timer-1;
    print(timer);
    var x1 = random(width);
    var y1 = random(height);

    var x2 = round(x1 + random(-1, 1));
    var y2 = round(y1 + random(-1, 1));

    var w = 150;
    var h = 50;

    set(x2, y2, get(x1, y1, w, h));
    
    for (let boid of flock) {
      boid.edges();
      boid.flock(flock);
      boid.update();
      boid.show();
    }
    
    fill(0, 0, 0, 255);
    rect(0, 0, 1920, 56);
    fill(255, 255, 255, 255);
    textAlign(CENTER);
    textSize(20);
    text("1 MILLION YEARS AGO, HOMO ERECTUS WAS THE CURRENT SPECIES OF THE HOMO GENUS TO ROAM THE EARTH, AND WERE OUR EARLIEST ANCESTOR CAPABLE TO USE FIRE", width/2, 40);
  }

  if (timer > 0 && timer <= 39998000) {
    timer = timer-1;
    print(timer);
    var x1 = random(width);
    var y1 = random(height);

    var x2 = round(x1 + random(-1, 1));
    var y2 = round(y1 + random(-1, 1));

    var w = 150;
    var h = 50;

    set(x2, y2, get(x1, y1, w, h));
    
    for (let boid of flock) {
      boid.edges();
      boid.flock(flock);
      boid.update();
      boid.show();
    }
    
    fill(0, 0, 0, 255);
    rect(0, 0, 1920, 56);
    fill(255, 255, 255, 255);
    textAlign(CENTER);
    textSize(20);
    text("1 MILLION YEARS AGO, THE HOMO SAPIENS WOULD NOT APPEAR UNTIL AROUND 650.000 YEARS LATER", width/2, 40);
  }

  if (timer <= 0) {
    image(styrofoamEnd, 0, 0);
  }
}

