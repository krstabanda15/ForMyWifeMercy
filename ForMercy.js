const envelope = document.querySelector(".envelope-wrapper");
const replayBtn = document.getElementById("replay-btn");
const audio = document.getElementById("valentines-audio");
const heartTrail = document.getElementById("heart-trail");

/* ===============================
   OPEN ENVELOPE
================================= */
envelope.addEventListener("click", () => {

  if (!envelope.classList.contains("is-open")) {

    envelope.classList.add("is-open");
    document.body.classList.add("opened");

    audio.play().catch(() => {});

  }

});

/* ===============================
   CLOSE & RESET
================================= */
replayBtn.addEventListener("click", (e) => {

  e.stopPropagation();

  envelope.classList.remove("is-open");
  document.body.classList.remove("opened");

  audio.pause();
  audio.currentTime = 0;

  heartTrail.innerHTML = ""; // clear hearts
});

/* ===============================
   HEART TRAIL
================================= */
document.addEventListener("mousemove", (e) => {

  if (!envelope.classList.contains("is-open")) return;

  const heart = document.createElement("div");
  heart.className = "trail-heart";
  heart.innerHTML = "❤️";
  heart.style.left = e.clientX + "px";
  heart.style.top = e.clientY + "px";

  heartTrail.appendChild(heart);

  setTimeout(() => heart.remove(), 1200);

});

/* ===============================
   BUTTERFLY FOLLOW EFFECT
================================= */
document.addEventListener("mousemove", (e) => {

  if (!envelope.classList.contains("is-open")) return;

  const butterflies = document.querySelectorAll(".butterfly");

  butterflies.forEach((b, i) => {

    let x = (e.clientX / window.innerWidth) * 200 - 100;
    let y = (e.clientY / window.innerHeight) * -150;

    b.style.transform = `translate(${x * (i + 1) * 0.3}px, ${y * (i + 1) * 0.3}px)`;

  });

});
