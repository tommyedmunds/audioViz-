// let sides = 3;
// let angle, px, py;

// var f;

// function preload(fileName) {
//   if (fileName) {
//     sound = loadSound(fileName);
//   } else {
//     sound = loadSound('../assets/myeyes1.wav');
//   }

//   f = loadFont(
//     'https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Bold.otf'
//   );

//   console.log('sound2 ', sound);
// }

// function setup() {
//   createFileInput((e) => {
//     sound = loadSound(e.data);
//   }, false);
//   let cnv = createCanvas(displayWidth, displayHeight / 1.2, WEBGL);
//   //let cnv = createCanvas(500, 500, WEBGL);
//   cnv.mouseClicked(togglePlay);
//   fft = new p5.FFT();
//   sound.amp(0.2);

//   setAttributes('antialias', true);
//   fill(237, 34, 93);
//   strokeWeight(3);
// }

// function draw() {
//   background(220);

//   let spectrum = fft.analyze();
//   noStroke();
//   //noFill();
//   fill(255, 0, 255);
//   //rotateX(frameCount * 0.001);
//   //rotateZ(frameCount * 0.01);
//   for (let i = 0; i < spectrum.length; i++) {
//     let x = map(i, 0, spectrum.length, 0, width);
//     let h = -height + map(spectrum[i], 0, 255, height, 0);
//     //ngon(6, x, h, 3);
//     rect(x, height, width / spectrum.length, h);
//     line(x, height, width / spectrum.length, h);
//   }

//   let waveform = fft.waveform();
//   noFill();
//   beginShape();
//   stroke(20);
//   for (let i = 0; i < waveform.length; i++) {
//     let x = map(i, 0, waveform.length, 0, width);
//     let y = map(waveform[i], -1, 1, 0, height);
//     vertex(x, y);
//     rect(x, y);
//   }

//   //ngon(sides, 0, 0, 80);
//   endShape();
//   textFont(f, 100);
//   text('tap to play', 20, 20);
// }

// function ngon(n, x, y, d) {
//   beginShape(TESS);
//   for (let i = 0; i < n + 1; i++) {
//     angle = (TWO_PI / n) * i;
//     px = x + (sin(angle) * d) / 2;
//     py = y - (cos(angle) * d) / 2;
//     vertex(px, py, 0);
//   }
//   for (let i = 0; i < n + 1; i++) {
//     angle = (TWO_PI / n) * i;
//     px = x + (sin(angle) * d) / 4;
//     py = y - (cos(angle) * d) / 4;
//     vertex(px, py, 0);
//   }
//   endShape();
// }

// function togglePlay() {
//   if (sound.isPlaying()) {
//     sound.pause();
//   } else {
//     sound.loop();
//   }
// }

let sides = 3;
let angle, px, py;

function setup() {
  let cnv = createCanvas(displayWidth, displayHeight / 1.2, WEBGL);
  setAttributes('antialias', true);
  fill(237, 34, 93);
  strokeWeight(3);
}

function draw() {
  background(200);
  rotateX(frameCount * 0.01);
  rotateZ(frameCount * 0.01);
  ngon(sides, 0, 0, 80);
}

function mouseClicked() {
  if (sides > 6) {
    sides = 3;
  } else {
    sides++;
  }
}

function ngon(n, x, y, d) {
  beginShape(TESS);
  for (let i = 0; i < n + 1; i++) {
    angle = (TWO_PI / n) * i;
    px = x + (sin(angle) * d) / 2;
    py = y - (cos(angle) * d) / 2;
    vertex(px, py, 0);
  }
  for (let i = 0; i < n + 1; i++) {
    angle = (TWO_PI / n) * i;
    px = x + (sin(angle) * d) / 4;
    py = y - (cos(angle) * d) / 4;
    vertex(px, py, 0);
  }
  endShape();
}
