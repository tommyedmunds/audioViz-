var cols, rows;
var scl = 15;
var w = 1200;
var h = 400;
var zoff = 0;
var inc = 0.1;
var zinc = 0.02;
var start = 0;
var minVal = -60;
var maxVal = 60;
var startInc = 0;
var button;

Array.prototype.random = function () {
  return this[Math.floor(Math.random() * this.length)];
};

function preload(fileName) {
  if (fileName) {
    sound = loadSound(fileName);
  } else {
    sound = loadSound('../assets/myeyes1.wav');
  }

  console.log('sound ', sound);
}

function setup() {
  createCanvas(width * 0.8, height * 0.4, WEBGL);
  cols = w / scl;
  rows = h / scl;
  createFileInput((e) => {
    sound = loadSound(e.data);
  }, false);
  let cnv = createCanvas(displayWidth, displayHeight / 1.2);
  button = createButton('play');
  button.mousePressed(togglePlaying);
  fft = new p5.FFT();
  sound.amp(0.2);
}

function draw() {
  background(0);
  stroke(255);
  noFill();
  orbitControl();
  rotateX(PI / 3);
  translate(-w / 2, -h / 2);

  let yoff = -start;
  let waveform = fft.waveform();
  let randWaveform = waveform[Math.floor(Math.random() * waveform.length)] * 0.5;
  let positioning = 0;
  //console.log(randWaveform);
  for (let y = 0; y < rows - 1; y++) {
    let xoff = 0;
    beginShape(TRIANGLE_STRIP);
    for (let x = 0; x < cols; x++) {
      //let a = waveform.random;
      let xFFT = map(x, 0, waveform.length, 0, width);
      let yFFT = map(waveform.random, -1, 1, 0, height);

      vertex(
        x * scl + positioning,
        y * scl,
        map(noise(xFFT, yFFT, zoff), 0, 1, minVal, maxVal)
      );
      vertex(
        x * scl + positioning,
        (y + 1) * scl,
        map(noise(xoff, yoff, zoff), 0, 1, minVal, maxVal)
      );

      //rotateZ(frameCount * 0.01);
      //rotateX(frameCount * 0.01);
      //rotateZ(-frameCount * 0.0000041);
      xoff += inc;
    }
    if (y % 10 === 0) zoff += waveform[y];
    yoff += inc;
    endShape();
  }

  zoff += zinc;
  start += startInc;
}

function togglePlaying() {
  if (!sound.isPlaying()) {
    sound.play();
    sound.setVolume(0.3);
    button.html('pause');
  } else {
    sound.pause();
    button.html('play');
  }
}
