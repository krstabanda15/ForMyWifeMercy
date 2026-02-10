const envelope = document.getElementById('envelope');
const replayBtn = document.getElementById('replay-btn');
const audio = document.getElementById('valentines-audio');

envelope.addEventListener('click', () => {
    if (!envelope.classList.contains('is-open')) {
        envelope.classList.add('is-open');
        audio.play().catch(e => console.log("Audio requires interaction"));
    }
});

replayBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    envelope.classList.remove('is-open');
    audio.pause();
    audio.currentTime = 0;
});
