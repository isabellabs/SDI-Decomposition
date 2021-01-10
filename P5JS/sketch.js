let timer;
let plastic, paperbag;
const flock = [];
let alignSlider, cohesionSlider, separationSlider;
let skMaxForce = 1;
let skMaxSpeed = 2;

function preload() {
  natureza = [loadImage('assets/plastic-1.jpg'),loadImage('assets/plastic-2.jpg')];
  naturezaEnd = loadImage('assets/plastic.png');

  plastic = [loadImage('assets/plastic-1.jpg'), loadImage('assets/plastic-2.jpg')] ;
  plasticEnd = loadImage('assets/plastic.png');

  paperbag = [loadImage('assets/paperbag-1.jpg'),loadImage('assets/paperbag-2.jpg')];
  paperbagEnd = loadImage('assets/paperbag.png');

  can = [loadImage('assets/can-1.jpg'),loadImage('assets/can-2.jpg')];
  canEnd = loadImage('assets/can.png');

  fruit = [loadImage('assets/fruit-1.jpg'), loadImage('assets/fruit-2.jpg')];
  fruitEnd = loadImage('assets/apple.png');

  styrofoam = [loadImage('assets/styrofoam-1.jpg'),loadImage('assets/styrofoam-2.jpg')];
  styrofoamEnd = loadImage('assets/styrofoam.png');
}

function setup() {
  createCanvas(1920, 1080);
  setupOsc(9961, 3334);


  // Settings de arranque do sistema
  console.log("Zero");
  settingAtivo = 0;

  // Imagens a Usar
//  image(natureza[Math.floor(Math.random() * natureza.length)], 0, 0);
//  imagemFim = naturezaEnd;

// Vídeo loop pré escolha
  vid = createVideo("assets/video.mp4");
  vid.position(0, 0); 
  vid.loop()

  //Dados de baralhamento
  incremento = 5;
  largura = 150;
  altura = 50;

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
  contador = 1;
  contaFrases = 0;
}

function draw() {

  if (settingAtivo > 0) {
    
    if (timer > 0) {
      timer = timer - 1;
      //print(timer);
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
      if (settingAtivo == 5){
        //print(contaFrases);
        text(frasesTitulo[contaFrases], width / 2, 40);       
        
        if (contador % 1000 == 0 && contaFrases < totalFrases-1){
          contaFrases++
          contador = 1;
        }
      } else{
        text(textoTitulo, width / 2, 40);        
      }
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
      case 1:
        console.log("Um");
        vid.pause();
        vid.hide();
        settingAtivo = 1;

        // Imagens a Usar
        image(fruit[Math.floor(Math.random() * fruit.length)], 0, 0);
        imagemFim = fruitEnd;

        //Dados de baralhamento
        incremento = 150;
        largura = 200;
        altura = 100;

        // Titúlo e tempo de execução
        textoTitulo = "APPLE - 2 MONTHS TO DECOMPOSE";
        timer = 60;

        // Parâmetros para boid.js
        alignSlider = 1;
        cohesionSlider = 1;
        separationSlider = 1;
        skMaxForce = 1;
        skMaxSpeed = 2;

        break;
      case 2:
        console.log("Dois");
        vid.pause();
        vid.hide();
        settingAtivo = 2;

        // Imagens a Usar
        image(paperbag[Math.floor(Math.random() * paperbag.length)], 0, 0);
        imagemFim = paperbagEnd;

        //Dados de baralhamento
        incremento = 160;
        largura = 210;
        altura = 110;        
        
        // Titúlo e tempo de execução
        textoTitulo = "PAPERBAG - 8 WEEKS TO DECOMPOSE";
        timer = 80;

        // Parâmetros para boid.js    
        alignSlider = 1;
        cohesionSlider = 1;
        separationSlider = 1;
        skMaxForce = 1;
        skMaxSpeed = 2;

        break;
      case 3:
        console.log("Três");
        vid.pause();
        vid.hide();
        settingAtivo = 3;

        // Imagens a Usar
        image(can[Math.floor(Math.random() * can.length)], 0, 0);
        imagemFim = canEnd;

        //Dados de baralhamento
        incremento = 10;
        largura = 150;
        altura = 50;        

        // Titúlo e tempo de execução
        textoTitulo = "ALUMINIUM CAN - 200 YEARS TO DECOMPOSE";
        timer = 8000;

        // Parâmetros para boid.js       
        alignSlider = 1;
        cohesionSlider = 1;
        separationSlider = 1;
        skMaxForce = 1;
        skMaxSpeed = 2;

        break;
      case 4:
        console.log("Quatro");
        vid.pause();
        vid.hide();
        settingAtivo = 4;

        // Imagens a Usar

        image(plastic[Math.floor(Math.random() * plastic.length)], 0, 0);
        imagemFim = plasticEnd;

        // Titúlo e tempo de execução
        textoTitulo = "PLASTIC BOTTLE - 450 YEARS TO DECOMPOSE";
        timer = 18000;

        //Dados de baralhamento
        incremento = 5;
        largura = 100;
        altura = 25;        

        // Parâmetros para boid.js       
        alignSlider = 1;
        cohesionSlider = 1;
        separationSlider = 1;
        skMaxForce = 1;
        skMaxSpeed = 2;

        break;
      case 5:
        console.log("Cinco");
        vid.pause();
        vid.hide();
        settingAtivo = 5;

        // Imagens a Usar
        image(styrofoam[Math.floor(Math.random() * styrofoam.length)], 0, 0);
        imagemFim = styrofoamEnd;

        //Dados de baralhamento
        incremento = 1;
        largura = 100;
        altura = 25;        

        // Titúlo e tempo de execução
        frasesTitulo = ["STYROFOAM - 1 MILLION YEARS TO DECOMPOSE", "1 MILLION YEARS AGO, HOMO ERECTUS WAS THE CURRENT SPECIES OF THE HOMO GENUS TO ROAM THE EARTH, AND WERE OUR EARLIEST ANCESTOR CAPABLE TO USE FIRE", "1 MILLION YEARS AGO, THE HOMO SAPIENS WOULD NOT APPEAR UNTIL AROUND 650.000 YEARS LATER"];
        totalFrases = 3
    
        timer = 40000000;

        // Parâmetros para boid.js       
        alignSlider = 1;
        cohesionSlider = 1;
        separationSlider = 1;
        skMaxForce = 1;
        skMaxSpeed = 2;

        break;
      default:
        console.log("Qualquer outro");

        vid.show();
        vid.play();

        settingAtivo = 0;

        // Imagens a Usar
        image(natureza[Math.floor(Math.random() * natureza.length)], 0, 0);
        imagemFim = naturezaEnd;

        // Titúlo e tempo de execução
        textoTitulo = "NATUREZA";
        timer = 1000000;

        // Parâmetros para boid.js  
        alignSlider = 1;
        cohesionSlider = 1;
        separationSlider = 1;
        skMaxForce = 1;
        skMaxSpeed = 2;

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
