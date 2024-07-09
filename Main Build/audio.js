const ctx = new (window.AudioContext || window.webkitAudioContext)();
let audio;

fetch("./sounds/")
    .then(data => data.arrayBuffer())
    .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
    .then(decodedAudio => {
        audio = decodedAudio;
    });

    function playback( ) {
        const playSound = ctx.createBufferSource();
        playSound.buffer = audio;
        playSound.connect(ctx.destination);
        playSound.start(ctx.currentTime);
    }

    // window.addEventListener("mousedown", playback);
