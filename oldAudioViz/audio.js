//audio shit

const audioPack = {};

window.songBuffer = null;

window.getSong = function () {
  const url = 'mkultra.mp3';
  const req = new XMLHttpRequest();
  req.open('GET', url, true);
  req.responseType = 'arraybuffer';

  const onError = function () {
    console.log('error');
  };

  const audioContext = new AudioContext();

  req.onload = function () {
    audioContext.decodeAudioData(
      req.response,
      function (buffer) {
        songBuffer = buffer;
        audioInit(audioContext);

        console.log(songBuffer);
      },
      onError
    );
  };
  req.send();
};

async function audioInit(audioContext) {
  //getSong(audioContext);

  const length = songBuffer.length;

  const buffer = await audioContext.createBuffer(2, length, 44100);

  //analyzerNode.fftSize = songBuffer.length;

  //console.log(analyzerNode);

  //const buffer = songBuffer;

  //console.log(buffer.getChannelData(0));

  //const analyzerNode = new AnalyserNode();

  //const fBC = analyzerNode.fftSize;

  const channelData = buffer.getChannelData(0);

  for (let i = 0; i < buffer.length; i++) {
    channelData[i] = Math.random() * 2 - 1;
    //console.log(channelData[i]);
  }

  const channelData2 = buffer.getChannelData(1);

  for (let i = 0; i < buffer.length; i++) {
    channelData2[i] = Math.random() * 2 - 1;
  }

  const whiteNoiseSouce = audioContext.createBufferSource(songBuffer);
  console.log('65 ', whiteNoiseSouce);
  whiteNoiseSouce.buffer = songBuffer;

  const primaryGainControl = audioContext.createGain();
  primaryGainControl.gain.setValueAtTime(0.06, 0);

  whiteNoiseSouce.connect(primaryGainControl);
  primaryGainControl.connect(audioContext.destination);

  //whiteNoiseSouce.start();
  //audioContext.connect(analyzerNode);
  //analyzerNode.connect(whiteNoiseSouce);
  //whiteNoiseSouce.connect(analyzerNode);

  //audioContext.connect(analyzerNode);

  const button = document.createElement('button');
  button.innerHTML = 'Start';

  button.addEventListener('click', () => {
    let clicked = false;

    whiteNoiseSouce.start();

    const analyzerNode = audioContext.createAnalyser();

    console.log(analyzerNode.frequencyBinCount);

    const freqDomain = new Float32Array(analyzerNode.frequencyBinCount);
    const d = analyzerNode.getFloatFrequencyData(freqDomain);
    console.log('d', d);

    console.log('57 ', freqDomain);
    //audioSource.connect(analyzerNode);

    // analyzerNode.fftSize = 1024;

    console.log(analyzerNode);
  });

  document.body.appendChild(button);
}

window.onload = () => {
  // window.getSong();
};

export default audioPack;
