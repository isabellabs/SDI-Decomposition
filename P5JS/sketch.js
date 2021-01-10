let timer;
let plastic, paperbag;
const flock = [];
let alignSlider, cohesionSlider, separationSlider;


function preload() {
  natureza = loadImage('assets/plastic-2.jpg');
  naturezaEnd = loadImage('assets/plastic.png');

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
  setupOsc(9961, 3334);


  // Settings de arranque do sistema
  console.log("Zero");
  settingAtivo = 0;

  // Imagens a Usar
  image(natureza, 0, 0);
  imagemFim = naturezaEnd;

  // Titúlo e tempo de execução
  textoTitulo = "NATUREZA";
  timer = 1000000;

  // Parâmetros para boid.js  
  alignSlider = 1;
  cohesionSlider = 1;
  separationSlider = 1;


  for (let i = 0; i < 150; i++) {
    flock.push(new Boid());
  }
}

function draw() {

  if (settingAtivo > 0) {
    if (timer > 0) {
      timer = timer - 1;
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
      text(textoTitulo, width / 2, 40);
    }

    if (timer <= 0) {
      image(imagemFim, 0, 0);
    }
  }
}

function receiveOsc(address, value) {
  console.log("OSC recebido: " + address + ", " + value);

  if (address == '/rfidCard') {
    item = value[0];
    console.log('Item escolhido', item);

    switch (item) {
      case 0:
        console.log("Zero");

        settingAtivo = 0;

        // Imagens a Usar
        image(natureza, 0, 0);
        imagemFim = naturezaEnd;

        // Titúlo e tempo de execução
        textoTitulo = "NATUREZA";
        timer = 1000000;

        // Parâmetros para boid.js  
        alignSlider = 1;
        cohesionSlider = 1;
        separationSlider = 1;



        break;
      case 1:
        console.log("Um");

        settingAtivo = 1;

        // Imagens a Usar
        image(fruit, 0, 0);
        imagemFim = fruitEnd;

        // Titúlo e tempo de execução
        textoTitulo = "APPLE - 2 MONTHS TO DECOMPOSE";
        timer = 60;

        // Parâmetros para boid.js
        alignSlider = 1;
        cohesionSlider = 1;
        separationSlider = 1;

        break;
      case 2:
        console.log("Dois");

        settingAtivo = 2;

        // Imagens a Usar
        image(paperbag, 0, 0);
        imagemFim = paperbagEnd;

        // Titúlo e tempo de execução
        textoTitulo = "PAPERBAG - 8 WEEKS TO DECOMPOSE";
        timer = 80;

        // Parâmetros para boid.js    
        alignSlider = 1;
        cohesionSlider = 1;
        separationSlider = 1;


        break;
      case 3:
        console.log("Três");

        settingAtivo = 3;

        // Imagens a Usar
        image(can, 0, 0);
        imagemFim = canEnd;

        // Titúlo e tempo de execução
        textoTitulo = "ALUMINIUM CAN - 200 YEARS TO DECOMPOSE";
        timer = 8000;

        // Parâmetros para boid.js       
        alignSlider = 1;
        cohesionSlider = 1;
        separationSlider = 1;

        break;
      case 4:
        console.log("Quatro");

        settingAtivo = 4;

        // Imagens a Usar
        image(plastic, 0, 0);
        imagemFim = plasticEnd;

        // Titúlo e tempo de execução
        textoTitulo = "PLASTIC BOTTLE - 450 YEARS TO DECOMPOSE";
        timer = 18000;

        // Parâmetros para boid.js       
        alignSlider = 1;
        cohesionSlider = 1;
        separationSlider = 1;

        break;
      case 5:
        console.log("Cinco");

        settingAtivo = 5;

        // Imagens a Usar
        image(styrofoam, 0, 0);
        imagemFim = styrofoamEnd;

        // Titúlo e tempo de execução
        textoTitulo = "STYROFOAM - 1 MILLION YEARS TO DECOMPOSE";
        timer = 40000000;

        // Parâmetros para boid.js       
        alignSlider = 1;
        cohesionSlider = 1;
        separationSlider = 1;

        break;
      default:
        console.log("Qualquer outro");

        settingAtivo = 0;

        // Imagens a Usar
        image(natureza, 0, 0);
        imagemFim = naturezaEnd;

        // Titúlo e tempo de execução
        textoTitulo = "NATUREZA";
        timer = 1000000;

        // Parâmetros para boid.js  
        alignSlider = 1;
        cohesionSlider = 1;
        separationSlider = 1;
        break;
    }


  }

}

function sendOsc(address, value) {
  socket.emit('message', [address].concat(value));
}

function setupOsc(oscPortIn, oscPortOut) {
  var socket = io.connect('http://127.0.0.1:8081', { port: 8081, rememberTransport: false });
  socket.on('connect', function () {
    socket.emit('config', {
      server: { port: oscPortIn, host: '127.0.0.1' },
      client: { port: oscPortOut, host: '127.0.0.1' }
    });
  });
  socket.on('message', function (msg) {
    if (msg[0] == '#bundle') {
      for (var i = 2; i < msg.length; i++) {
        receiveOsc(msg[i][0], msg[i].splice(1));
      }
    } else {
      receiveOsc(msg[0], msg.splice(1));
    }
  });
}
