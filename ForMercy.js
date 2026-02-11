const envelope = document.querySelector('.envelope-wrapper');

envelope.addEventListener('click', () => {
    envelope.classList.toggle('is-open');
});

document.addEventListener("mousemove", (e) => {
  if (!envelope.classList.contains("is-open")) return;

  const heart = document.createElement("div");
  heart.className = "trail-heart";
  heart.innerHTML = "❤️";
  heart.style.left = e.clientX + "px";
  heart.style.top = e.clientY + "px";

  document.getElementById("heart-trail").appendChild(heart);

  setTimeout(() => heart.remove(), 1500);
});

document.addEventListener("mousemove", (e) => {
  if (!envelope.classList.contains("is-open")) return;

  document.querySelectorAll(".butterfly").forEach((b, i) => {
    let x = (e.clientX / window.innerWidth) * 200 - 100;
    let y = (e.clientY / window.innerHeight) * -150;

    b.style.transform = `translate(${x}px, ${y}px)`;
  });
});
