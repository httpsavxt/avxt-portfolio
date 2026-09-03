const $ = (selector) => document.querySelector(selector);

document.title = `${CONFIG.personal.name} — ${CONFIG.personal.role}`;

$("#heroEyebrow").textContent = CONFIG.personal.heroEyebrow;
$("#heroDescription").textContent = CONFIG.personal.heroDescription;
$("#aboutOne").textContent = CONFIG.personal.aboutOne;
$("#aboutTwo").textContent = CONFIG.personal.aboutTwo;

$("#email").textContent = `${CONFIG.contact.email} ↗`;
$("#email").href = `mailto:${CONFIG.contact.email}`;
$("#year").textContent = new Date().getFullYear();

$("#socials").innerHTML = Object.entries(CONFIG.contact.socials)
  .map(([name, url]) => `<a href="${url}" target="_blank" rel="noopener">${name} ↗</a>`)
  .join("");

/* ================= PROJECTS ================= */

const projects = $("#projects");

projects.innerHTML = CONFIG.projects.map((project, index) => `
  <article class="project reveal" data-index="${index}">
    <div class="project-media">
      <img src="${project.image}" alt="${project.title}" loading="lazy"
        onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
      <div class="image-placeholder">
        <strong>ADD GAME IMAGE</strong>
        <small>${project.image}</small>
      </div>

      ${project.video ? `<video muted loop playsinline preload="metadata" src="${project.video}"></video>` : ""}

      <span class="project-number">${String(index + 1).padStart(2, "0")}</span>
      <span class="project-view">VIEW PROJECT ↗</span>
    </div>

    <div class="project-info">
      <div>
        <p>${project.category} · ${project.year}</p>
        <h3>${project.title}</h3>
      </div>
      <span class="round-arrow">↗</span>
    </div>
  </article>
`).join("");

/* Video hover */
document.querySelectorAll(".project-media").forEach(media => {
  const video = media.querySelector("video");
  if (!video) return;

  media.addEventListener("mouseenter", () => video.play().catch(() => {}));
  media.addEventListener("mouseleave", () => {
    video.pause();
    video.currentTime = 0;
  });
});

/* ================= PROJECT MODAL ================= */

const modal = $("#projectModal");
const modalContent = $("#modalContent");

document.querySelectorAll(".project").forEach(card => {
  card.addEventListener("click", () => {
    const project = CONFIG.projects[Number(card.dataset.index)];

    modalContent.innerHTML = `
      <p class="eyebrow">${project.category} · ${project.year}</p>
      <h2>${project.title}</h2>

      ${
        project.video
          ? `<video class="modal-media" controls autoplay src="${project.video}"></video>`
          : `<img class="modal-media" src="${project.image}" alt="${project.title}">`
      }

      <p class="modal-description">${project.description}</p>

      <div class="tags">
        ${project.tags.map(tag => `<span>${tag}</span>`).join("")}
      </div>

      ${
        project.playStore
          ? `<a class="btn btn-dark" href="${project.playStore}" target="_blank" rel="noopener">Play ↗</a>`
          : `<span class="no-link">Play Store link coming soon</span>`
      }
    `;

    modal.classList.add("open");
    document.body.classList.add("modal-open");
  });
});

function closeProjectModal() {
  modal.classList.remove("open");
  document.body.classList.remove("modal-open");
}

$("#closeModal").addEventListener("click", closeProjectModal);
document.querySelector(".modal-bg").addEventListener("click", closeProjectModal);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeProjectModal();
});

/* ================= SKILLS ================= */

$("#skills").innerHTML = CONFIG.skills.map((skill, index) => `
  <div class="skill reveal">
    <span>${String(index + 1).padStart(2, "0")}</span>
    <h3>${skill}</h3>
    <b>↗</b>
  </div>
`).join("");

/* ================= SCROLL ANIMATION ================= */

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(element => observer.observe(element));

/* ================= CUSTOM CURSOR ================= */

const cursor = $(".cursor");

window.addEventListener("mousemove", event => {
  cursor.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
});

document.querySelectorAll("a, button, .project").forEach(element => {
  element.addEventListener("mouseenter", () => cursor.classList.add("hover"));
  element.addEventListener("mouseleave", () => cursor.classList.remove("hover"));
});

/* ================= MOBILE MENU ================= */

const mobileMenu = $("#mobileMenu");

$("#menuButton").addEventListener("click", () => {
  mobileMenu.classList.toggle("open");
});

mobileMenu.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => mobileMenu.classList.remove("open"));
});

/* ================= HERO MINI GAME ================= */

(() => {
  const settings = CONFIG.miniGame;

  if (!settings || !settings.enabled) {
    const game = $(".hero-game-wrap");
    if (game) game.style.display = "none";
    return;
  }

  const canvas = $("#gameCanvas");
  const ctx = canvas.getContext("2d");

  canvas.width = settings.canvasWidth;
  canvas.height = settings.canvasHeight;

  const W = canvas.width;
  const H = canvas.height;

  let player;
  let obstacles;
  let score;
  let lives;
  let frame;
  let running;
  let keys = {};
  let animation;

  function reset() {
    player = {
      x: W / 2,
      y: H - 42,
      width: 38,
      height: 22
    };

    obstacles = [];
    score = 0;
    lives = settings.maxLives;
    frame = 0;
    running = true;

    cancelAnimationFrame(animation);
    animation = requestAnimationFrame(loop);
  }

  function spawnObstacle() {
    const radius = 8 + Math.random() * 11;

    obstacles.push({
      x: radius + Math.random() * (W - radius * 2),
      y: -radius,
      radius,
      speed: settings.obstacleSpeed * (0.75 + Math.random() * 0.6),
      rotation: Math.random() * Math.PI,
      rotationSpeed: (Math.random() - 0.5) * 0.08
    });
  }

  function collision(object) {
    return (
      Math.abs(object.x - player.x) < object.radius + 17 &&
      Math.abs(object.y - player.y) < object.radius + 10
    );
  }

  function update() {
    if (keys.ArrowLeft || keys.a) player.x -= settings.playerSpeed;
    if (keys.ArrowRight || keys.d) player.x += settings.playerSpeed;

    player.x = Math.max(24, Math.min(W - 24, player.x));

    frame++;

    if (frame % Math.max(12, settings.spawnRate) === 0) {
      spawnObstacle();
    }

    obstacles.forEach(object => {
      object.y += object.speed;
      object.rotation += object.rotationSpeed;
    });

    for (let i = obstacles.length - 1; i >= 0; i--) {
      const object = obstacles[i];

      if (collision(object)) {
        obstacles.splice(i, 1);
        lives--;

        if (lives <= 0) {
          running = false;
        }
      } else if (object.y > H + 30) {
        obstacles.splice(i, 1);
        score++;
      }
    }

    $("#score").textContent = String(score).padStart(3, "0");
    $("#lives").textContent =
      "♥ ".repeat(Math.max(0, lives)).trim() || "♡";
  }

  function drawGrid() {
    ctx.strokeStyle = "rgba(17,17,17,.06)";
    ctx.lineWidth = 1;

    for (let x = 0; x < W; x += 28) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, H);
      ctx.stroke();
    }

    for (let y = 0; y < H; y += 28) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }
  }

  function drawPlayer() {
    ctx.save();
    ctx.translate(player.x, player.y);

    ctx.strokeStyle = settings.ink;
    ctx.fillStyle = settings.playerFill;
    ctx.lineWidth = 3;

    ctx.beginPath();
    ctx.moveTo(-20, 10);
    ctx.lineTo(0, -15);
    ctx.lineTo(20, 10);
    ctx.lineTo(8, 7);
    ctx.lineTo(0, 14);
    ctx.lineTo(-8, 7);
    ctx.closePath();

    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 0, 3, 0, Math.PI * 2);
    ctx.fillStyle = settings.ink;
    ctx.fill();

    ctx.restore();
  }

  function drawObstacle(object) {
    ctx.save();

    ctx.translate(object.x, object.y);
    ctx.rotate(object.rotation);

    ctx.fillStyle = settings.ink;

    ctx.beginPath();

    for (let i = 0; i < 9; i++) {
      const angle = i * Math.PI * 2 / 8;
      const radius =
        object.radius * (i % 2 === 0 ? 0.72 : 1);

      ctx.lineTo(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius
      );
    }

    ctx.fill();
    ctx.restore();
  }

  function drawGameOver() {
    ctx.fillStyle = "rgba(247,246,240,.91)";
    ctx.fillRect(0, 0, W, H);

    ctx.textAlign = "center";
    ctx.fillStyle = settings.ink;

    ctx.font = "700 34px Caveat";
    ctx.fillText("GAME OVER", W / 2, H / 2 - 5);

    ctx.font = "12px DM Sans";
    ctx.fillText(
      `Score ${score} · press RESTART`,
      W / 2,
      H / 2 + 24
    );
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    ctx.fillStyle = settings.background;
    ctx.fillRect(0, 0, W, H);

    drawGrid();

    ctx.strokeStyle = "rgba(17,17,17,.16)";
    ctx.setLineDash([3, 6]);
    ctx.beginPath();
    ctx.moveTo(0, H - 24);
    ctx.lineTo(W, H - 24);
    ctx.stroke();
    ctx.setLineDash([]);

    obstacles.forEach(drawObstacle);
    drawPlayer();

    if (!running) drawGameOver();
  }

  function loop() {
    if (running) update();
    draw();

    if (running) {
      animation = requestAnimationFrame(loop);
    }
  }

  window.addEventListener("keydown", event => {
    if (["ArrowLeft", "ArrowRight", "a", "d"].includes(event.key)) {
      keys[event.key] = true;
      event.preventDefault();
    }
  });

  window.addEventListener("keyup", event => {
    keys[event.key] = false;
  });

  function pointerMove(clientX) {
    const rect = canvas.getBoundingClientRect();
    const x = (clientX - rect.left) * W / rect.width;
    player.x = Math.max(24, Math.min(W - 24, x));
  }

  canvas.addEventListener("pointerdown", event => {
    canvas.setPointerCapture?.(event.pointerId);
    pointerMove(event.clientX);
  });

  canvas.addEventListener("pointermove", event => {
    if (event.pointerType !== "mouse" || event.buttons) {
      pointerMove(event.clientX);
    }
  });

  $("#restartGame").addEventListener("click", reset);

  reset();
})();