//import audioPack from './audio.js';

//drawing stuff
const CRYSTAL_SIZE = 100;
const SIDES = 6;
const PALETTE = [];

window.setup = function () {
  createCanvas(1920, 800);
  loop();
  window.getSong();
  angleMode(DEGREES);
  rectMode(CENTER);
};

window.draw = function () {
  testLines();
};

function testLines() {
  const INNER_CIRCLE = Math.round(Math.random() * CRYSTAL_SIZE);
  const rando = random(1);
  let numShapes;
  //console.log(rando, rando.toFixed(1));

  switch (Number(rando.toFixed(1))) {
    case 0.1:
      numShapes = SIDES;
      break;
    case 0.2:
      numShapes = SIDES * 2;
      break;
    case 0.3:
      numShapes = SIDES * 3;
      break;
    case 0.4:
      numShapes = SIDES * 4;
      break;
    case 0.5:
      numShapes = SIDES * 5;
      break;
    case 0.6:
      numShapes = SIDES * 6;
      break;
    case 0.7:
      numShapes = SIDES * 7;
      break;
    case 0.8:
      numShapes = SIDES * 8;
      break;
    default:
      numShapes = SIDES * 9;
      break;
  }

  // if (rando > 0.5 && rando < 0.6) {
  //   numShapes = SIDES;
  // } else {
  //   numShapes = SIDES * 2;
  // }

  noFill();

  translate(Math.random() * width, Math.random() * height);

  push();

  ellipse(0, 0, CRYSTAL_SIZE, CRYSTAL_SIZE);

  const angle = 360 / numShapes;
  for (let i = 0; i < numShapes; i++) {
    line(INNER_CIRCLE, 0, 0, CRYSTAL_SIZE);

    rotate(angle);
    stroke(1);

    //setTimeout(() => fill(255), 750);
  }

  for (let i = 0; i < numShapes; i++) {
    setTimeout(() => erase(), 200);
  }

  pop();

  noErase();
}
