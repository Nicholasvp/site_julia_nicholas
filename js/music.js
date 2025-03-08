var audio = new Audio('audio/so_nos_dois.mp3'); 

function toggleAudio() {
    var playButton = document.getElementById('playButton');
    if (audio.paused) {
        audio.play();
        playButton.textContent = '⏸️';
    } else {
        audio.pause();
        playButton.textContent = '▶️';
    }
}

window.addEventListener('load', function() {
    var playButton = document.getElementById('playButton');
    playButton.textContent = '⏸️';
    playButton.addEventListener('click', toggleAudio);

    // Try to play audio automatically
    audio.play().catch(function(error) {
        // Autoplay was prevented, show play button
        playButton.textContent = '▶️';
    });
});