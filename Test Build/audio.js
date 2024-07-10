const ctx = new (window.AudioContext || window.webkitAudioContext)();
let audio;

fetch("./sounds/damage.wav")
fetch("./sounds/eat.wav")
fetch("./sounds/gameover.wav")
fetch("./sounds/ghost.wav")
fetch("./sounds/light.wav")
fetch("./sounds/reset.wav")
fetch("./sounds/slow.wav")
fetch("./sounds/speed.wav")
fetch("./sounds/thunder.wav")
fetch("./sounds/ambience_loop.wav")
fetch("./sounds/theme_loop.wav")
    
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

    window.addEventListener("mousedown", playback);
