document.addEventListener("DOMContentLoaded", () => {

  const envelope = document.querySelector(".envelope-wrapper");
  const replayBtn = document.getElementById("replay-btn");
  const audio = document.getElementById("valentines-audio");
  const heartTrail = document.getElementById("heart-trail");

  console.log("DOM READY");

  if (!envelope) {
    console.error("Envelope not found!");
    return;
  }

  /* ===============================
     HEART EXPLOSION
  ================================= */
  function heartExplosion() {
    console.log("BOOM");

    const rect = envelope.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < 25; i++) {
      const heart = document.createElement("div");
      heart.classList.add("heart-burst");
      heart.innerHTML = "💖";
      document.body.appendChild(heart);

      heart.style.position = "fixed";
      heart.style.left = centerX + "px";
      heart.style.top = centerY + "px";
      heart.style.pointerEvents = "none";
      heart.style.fontSize = "20px";

      const angle = Math.random() * 2 * Math.PI;
      const distance = 150 + Math.random() * 150;

      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance;

      heart.animate(
        [
          { transform: "translate(0,0) scale(1)", opacity: 1 },
          { transform: `translate(${dx}px, ${dy}px) scale(0.3)`, opacity: 0 }
        ],
        {
          duration: 1500,
          easing: "ease-out"
        }
      );

      setTimeout(() => heart.remove(), 1500);
    }
  }

  /* ===============================
     OPEN ENVELOPE
  ================================= */
  envelope.addEventListener("click", () => {
    console.log("ENVELOPE CLICKED");

    if (!envelope.classList.contains("is-open")) {
      envelope.classList.add("is-open");
      document.body.classList.add("opened");

      heartExplosion();
      createQuoteSparkles();
      magicalParticles();
      shootingStars();

      if (audio) {
        audio.play().catch(() =>
          console.log("Music requires interaction")
        );
      }
    }
  });

  /* ===============================
     CLOSE & RESET
  ================================= */
  if (replayBtn) {
    replayBtn.addEventListener("click", (e) => {
      e.stopPropagation();

      envelope.classList.remove("is-open");
      document.body.classList.remove("opened");

      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }

      if (heartTrail) {
        heartTrail.innerHTML = "";
      }
    });
  }

  /* ===============================
     HEART TRAIL
  ================================= */
  document.addEventListener("mousemove", (e) => {

    if (!envelope.classList.contains("is-open")) return;
    if (!heartTrail) return;

    const heart = document.createElement("div");
    heart.className = "trail-heart";
    heart.innerHTML = "❤️";

    heart.style.position = "fixed";
    heart.style.left = e.clientX + "px";
    heart.style.top = e.clientY + "px";
    heart.style.pointerEvents = "none";

    heartTrail.appendChild(heart);

    setTimeout(() => heart.remove(), 1000);
  });

  /* ===============================
     BUTTERFLY FOLLOW EFFECT
  ================================= */
  document.addEventListener("mousemove", (e) => {

    if (!envelope.classList.contains("is-open")) return;

    const butterflies = document.querySelectorAll(".butterfly");

    butterflies.forEach((b, i) => {
      const x = (e.clientX / window.innerWidth) * 200 - 100;
      const y = (e.clientY / window.innerHeight) * -150;

      b.style.transform =
        `translate(${x * (i + 1) * 0.3}px, ${y * (i + 1) * 0.3}px)`;
    });

  });

});

function createQuoteSparkles() {

  const quote = document.querySelector(".love-quote");
  const rect = quote.getBoundingClientRect();

  for (let i = 0; i < 15; i++) {

    const sparkle = document.createElement("div");
    sparkle.innerHTML = "✨";
    sparkle.style.position = "fixed";
    sparkle.style.left = rect.left + Math.random() * rect.width + "px";
    sparkle.style.top = rect.top + Math.random() * rect.height + "px";
    sparkle.style.pointerEvents = "none";
    sparkle.style.fontSize = "18px";
    sparkle.style.opacity = 1;
    sparkle.style.transition = "1.5s ease";

    document.body.appendChild(sparkle);

    setTimeout(() => {
      sparkle.style.transform = `translateY(-40px) scale(0.5)`;
      sparkle.style.opacity = 0;
    }, 50);

    setTimeout(() => sparkle.remove(), 1500);
  }
}
function magicalParticles() {
  setInterval(() => {

    const particle = document.createElement("div");
    particle.innerHTML = "✨";
    particle.style.position = "fixed";
    particle.style.left = Math.random() * window.innerWidth + "px";
    particle.style.top = window.innerHeight + "px";
    particle.style.fontSize = "16px";
    particle.style.pointerEvents = "none";
    particle.style.opacity = 0.8;

    document.body.appendChild(particle);

    particle.animate([
      { transform: "translateY(0px)", opacity: 0.8 },
      { transform: "translateY(-600px)", opacity: 0 }
    ], {
      duration: 6000,
      easing: "linear"
    });

    setTimeout(() => particle.remove(), 6000);

  }, 800);
}

function shootingStars() {

  setInterval(() => {

    // 50% chance to appear
    if (Math.random() > 0.5) return;

    const star = document.createElement("div");
    star.classList.add("shooting-star");

    // Start from random top position
    const startY = Math.random() * (window.innerHeight / 2);

    star.style.top = startY + "px";
    star.style.left = "-200px";

    document.body.appendChild(star);

    const distanceX = window.innerWidth + 400;
    const distanceY = window.innerHeight / 2;

    star.animate([
      { transform: "translateX(0px) translateY(0px) rotate(45deg)", opacity: 1 },
      { transform: `translateX(${distanceX}px) translateY(${distanceY}px) rotate(45deg)`, opacity: 0 }
    ], {
      duration: 2000,
      easing: "ease-out"
    });

    setTimeout(() => star.remove(), 2000);

  }, 5000);

}
