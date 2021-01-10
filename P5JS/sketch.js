let timer = 600;
let plastic, paperbag;
const flock = [];
let alignSlider, cohesionSlider, separationSlider;


function preload() {
  plastic = loadImage('assets/plastic-3.jpg');
  paperbag = loadImage('assets/paperbag-2.jpg');
}

function setup() {
  createCanvas(1920, 1080);
  setupOsc(9961, 3334);
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

function receiveOsc(address, value) {
	console.log("OSC recebido: " + address + ", " + value);
	
	if (address == '/rfidCard') {
		item = value[0];
		console.log('Item escolhido', item);
	}

}

function sendOsc(address, value) {
	socket.emit('message', [address].concat(value));
}

function setupOsc(oscPortIn, oscPortOut) {
	var socket = io.connect('http://127.0.0.1:8081', { port: 8081, rememberTransport: false });
	socket.on('connect', function() {
		socket.emit('config', {	
			server: { port: oscPortIn,  host: '127.0.0.1'},
			client: { port: oscPortOut, host: '127.0.0.1'}
		});
	});
	socket.on('message', function(msg) {
		if (msg[0] == '#bundle') {
			for (var i=2; i<msg.length; i++) {
				receiveOsc(msg[i][0], msg[i].splice(1));
			}
		} else {
			receiveOsc(msg[0], msg.splice(1));
		}
	});
}
