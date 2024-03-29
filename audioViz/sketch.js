let noiseScale = 0.02;
let easing = 0.05;

function preload(fileName) {
  if (fileName) {
    sound = loadSound(fileName);
  } else {
    sound = loadSound('../assets/myeyes1.wav');
  }

  console.log('sound2 ', sound);
}

function setup() {
  createFileInput((e) => {
    sound = loadSound(e.data);
  }, false);
  button = createButton('play');
  button.mousePressed(togglePlaying);
  let cnv = createCanvas(displayWidth, displayHeight / 1.2);
  //cnv.mouseClicked(togglePlay);
  fft = new p5.FFT();
  sound.amp(0.2);
}

function draw() {
  background(220);

  // let spectrum = fft.analyze();
  // noStroke();
  // fill(255, 0, 255);
  // for (let i = 0; i < spectrum.length; i++) {
  //   let x = map(i, 0, spectrum.length, 0, width);
  //   let h = -height + map(spectrum[i], 0, 255, height, 0);
  //   rect(x, height, width / spectrum.length, h);
  //   line(x, height, width / spectrum.length, h);
  // }

  let waveform = fft.waveform();
  noFill();
  beginShape();
  stroke(20);
  for (let i = 0; i < waveform.length; i++) {
    let x = map(i, 0, waveform.length, 0, width);
    let y = map(waveform[i], -1, 1, 0, height);
    let noiseVal = noise(x * noiseScale, y * noiseScale);
    stroke(noiseVal * 255);
    line(x, y + noiseVal * 80, x, height);
    // vertex(x, y);
    // rect(x, y);
  }
  endShape();

  text('tap to play', 20, 20);
}

function togglePlaying() {
  if (!song.isPlaying()) {
    song.play();
    song.setVolume(0.3);
    button.html('pause');
  } else {
    song.pause();
    button.html('play');
  }
}
