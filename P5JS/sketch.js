const flock = [];
let skMaxForce = 1;
let skMaxSpeed = 4;
let isConnected;
let socket;
let estado = 0;
let contador = 0;
let contaFrases;
let inicioT, duracaoT;

let contadorTrivia;


function preload() {
  natureza = [loadImage('assets/plastic-1.jpg'), loadImage('assets/plastic-2.jpg')];
  naturezaEnd = loadImage('assets/plastic.png');

  plastic = [loadImage('assets/plastic-1.jpg'), loadImage('assets/plastic-2.jpg')];
  plasticEnd = loadImage('assets/plastic.png');

  paperbag = [loadImage('assets/paperbag-1.jpg'), loadImage('assets/paperbag-2.jpg')];
  paperbagEnd = loadImage('assets/paperbag.png');

  can = [loadImage('assets/can-1.jpg'), loadImage('assets/can-2.jpg')];
  canEnd = loadImage('assets/can.png');

  fruit = [loadImage('assets/fruit-1.jpg'), loadImage('assets/fruit-2.jpg')];
  fruitEnd = loadImage('assets/apple.png');

  styrofoam = [loadImage('assets/styrofoam-1.jpg'), loadImage('assets/styrofoam-2.jpg')];
  styrofoamEnd = loadImage('assets/styrofoam.png');
}

function setup() {
  createCanvas(1900, 1060);
  setupOsc(9961, 9962);
  frameRate(10);


  // Settings de arranque do sistema
  console.log("Dez");
  estado = 10;


  vid = createVideo("assets/video.mp4");
  vid.position(0, 0);
  vid.size(1920, 1080);
  //vid.loop();
  // vid.hide();
  // vid.pause();


  for (let i = 0; i < 150; i++) {
    flock.push(new Boid());
  }

  if (isConnected) {
    sendOsc('/rfidCard', 0);
  }


}

function mousePressed() {
  if (mouseX > 0 && mouseX < 100 && mouseY > 0 && mouseY < 100) {
    let fs = fullscreen();
    fullscreen(!fs);
  }
}

function draw() {
  switch (estado) {
    case 1:

      var x1 = random(width);
      var y1 = random(height);

      var x2 = round(x1 + random(-incremento, incremento));
      var y2 = round(y1 + random(-incremento, incremento));

      var w = largura;
      var h = altura;

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

      contador++;


      text(frasesTitulo[contaFrases], width / 2, 40);

      if (contaFrases <= (frasesTitulo.length - 2)) {
        if (contador % contadorTrivia == 0) {
          contaFrases++;
        }
      }
      temporizador();
      break;

    case 2:
      inicioT = millis();
      duracaoT = 10000; //tim,e for the last screen

      estado++;
      break;

    case 3:
      image(imagemFim, 0, 0);

      temporizador();

      break;

    case 4:
      if (isConnected) {
        sendOsc('/rfidCard', 0);
      }
      break;

    case 9:
      vid.show();
      vid.loop();
      estado = 0;

      break;

    case 10:
      if (isConnected) {
        sendOsc('/rfidCard', 0);
      }
      break;
    
    default:


      break;
  }
}

function temporizador() {
  if (millis() > inicioT + duracaoT) {
    console.log('Temporizador acabou');
    estado++;
  }
}

function receiveOsc(address, value) {
  console.log("OSC recebido(endereço): " + address);
  console.log("OSC recebido(valor): " + value);

  if (address == '/rfidCard') {
    item = value[0];
    console.log('Item escolhido', item);

    estado = 1;
    contaFrases = 0;
    contador = 1;
    inicioT = millis();
    contadorTrivia = 600; //trivia sub titles. not miliseconds


    switch (item) {
      case 1: //apple
        console.log("Um");
        vid.pause();
        vid.hide();

        settingAtivo = 1;

        // Duração da imagem
        duracaoT = 5000; //miliseconds

        // Imagens a Usar
        image(fruit[Math.floor(Math.random() * fruit.length)], 0, 0);
        imagemFim = fruitEnd;

        //Dados de baralhamento
        incremento = 160;
        largura = 200;
        altura = 100;

        // Títulos
        frasesTitulo = ["APPLE - 2 MONTHS TO DECOMPOSE"];

        // Parâmetros para boid.js
        alignSlider = 1; //0 to 2
        cohesionSlider = 1;
        separationSlider = 1;
        skMaxForce = 1;
        skMaxSpeed = 4;

        break;
      case 2: //paper
        console.log("Dois");
        vid.pause();
        vid.hide();

        settingAtivo = 2;

        // Duração da imagem
        duracaoT = 5500;

        // Imagens a Usar
        image(paperbag[Math.floor(Math.random() * paperbag.length)], 0, 0);
        imagemFim = paperbagEnd;

        //Dados de baralhamento
        incremento = 150;
        largura = 210;
        altura = 110;

        // Titúlo e tempo de execução
        frasesTitulo = ["PAPERBAG - 8 WEEKS TO DECOMPOSE"];

        // Parâmetros para boid.js    
        alignSlider = 1;
        cohesionSlider = 1;
        separationSlider = 1;
        skMaxForce = 1;
        skMaxSpeed = 4;

        break;
      case 3: // can
        console.log("Três");
        vid.pause();
        vid.hide();

        settingAtivo = 3;

        // Duração da imagem
        duracaoT = 133000;

        // Imagens a Usar
        image(can[Math.floor(Math.random() * can.length)], 0, 0);
        imagemFim = canEnd;

        //Dados de baralhamento
        incremento = 10;
        largura = 150;
        altura = 50;

        // Titúlo e tempo de execução
        frasesTitulo = ["ALUMINIUM CAN - 200 YEARS TO DECOMPOSE"];

        // Parâmetros para boid.js       
        alignSlider = 1;
        cohesionSlider = 1;
        separationSlider = 1;
        skMaxForce = 1;
        skMaxSpeed = 4;

        break;
      case 4: //plastic
        console.log("Quatro");
        vid.pause();
        vid.hide();

        settingAtivo = 4;

        // Duração da imagem
        duracaoT = 300000;

        // Imagens a Usar
        image(plastic[Math.floor(Math.random() * plastic.length)], 0, 0);
        imagemFim = plasticEnd;

        // Titúlo e tempo de execução
        frasesTitulo = ["PLASTIC BOTTLE - 450 YEARS TO DECOMPOSE"];

        //Dados de baralhamento
        incremento = 5;
        largura = 100;
        altura = 25;

        // Parâmetros para boid.js       
        alignSlider = 1;
        cohesionSlider = 1;
        separationSlider = 1;
        skMaxForce = 1;
        skMaxSpeed = 4;

        break;
      case 5:
        console.log("Cinco"); //styrofoam
        vid.pause();
        vid.hide();

        settingAtivo = 5;

        // Duração da imagem
        duracaoT = 666666;

        // Imagens a Usar
        image(styrofoam[Math.floor(Math.random() * styrofoam.length)], 0, 0);
        imagemFim = styrofoamEnd;

        //Dados de baralhamento
        incremento = 2;
        largura = 100;
        altura = 25;

        // Titúlo e tempo de execução
        frasesTitulo = ["STYROFOAM - 1 MILLION YEARS TO DECOMPOSE", "1 MILLION YEARS AGO, HOMO ERECTUS WAS THE CURRENT SPECIES OF THE HOMO GENUS TO ROAM THE EARTH, AND WERE OUR EARLIEST ANCESTOR CAPABLE TO USE FIRE", "1 MILLION YEARS AGO, THE HOMO SAPIENS WOULD NOT APPEAR UNTIL AROUND 650.000 YEARS LATER"];

        // Parâmetros para boid.js       
        alignSlider = 1;
        cohesionSlider = 1;
        separationSlider = 1;
        skMaxForce = 1;
        skMaxSpeed = 4;

        break;
      default:
        console.log("Qualquer outro");

        estado = 9;

        break;
    }


  }

}

function sendOsc(address, value) {
  socket.emit('message', [address].concat(value));
}

function setupOsc(oscPortIn, oscPortOut) {
  socket = io.connect('http://127.0.0.1:8081', { port: 8081, rememberTransport: false });
  socket.on('connect', function () {
    socket.emit('config', {
      server: { port: oscPortIn, host: '127.0.0.1' },
      client: { port: oscPortOut, host: '127.0.0.1' }
    });
  });

  socket.on('connect', function () {
    isConnected = true;
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
