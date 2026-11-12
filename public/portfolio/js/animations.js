/* Animations: reveal, typing, particles, cursor, terminal, tilt */
(function () {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Scroll reveal
  const items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduced) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    items.forEach((el) => io.observe(el));
  } else items.forEach((el) => el.classList.add("visible"));

  // Typing effect
  const typed = document.getElementById("typed-text");
  if (typed) {
    const words = ["Python Developer", "Software Developer", "AI & Machine Learning Enthusiast", "Problem Solver"];
    if (reduced) typed.textContent = words[0];
    else {
      let w = 0, c = 0, del = false;
      (function tick() {
        const word = words[w];
        typed.textContent = word.slice(0, c);
        if (!del && c === word.length) { del = true; return setTimeout(tick, 1600); }
        if (del && c === 0) { del = false; w = (w + 1) % words.length; }
        c += del ? -1 : 1;
        setTimeout(tick, del ? 40 : 80);
      })();
    }
  }

  // Particles (lightweight canvas)
  const canvas = document.getElementById("particles");
  if (canvas && !reduced) {
    const ctx = canvas.getContext("2d");
    let W, H, pts;
    const resize = () => {
      W = canvas.width = innerWidth; H = canvas.height = innerHeight;
      const n = Math.min(60, Math.floor((W * H) / 25000));
      pts = Array.from({ length: n }, () => ({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .3, vy: (Math.random() - .5) * .3, r: Math.random() * 1.6 + .4 }));
    };
    resize(); addEventListener("resize", resize);
    (function draw() {
      ctx.clearRect(0, 0, W, H);
      pts.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        ctx.fillStyle = i % 2 ? "rgba(0,212,255,.6)" : "rgba(139,92,246,.6)";
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j], d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < 120) { ctx.strokeStyle = `rgba(0,212,255,${.08 * (1 - d / 120)})`; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke(); }
        }
      });
      requestAnimationFrame(draw);
    })();
  }

  // Custom cursor (desktop with fine pointer only; pointer-events:none so clicks pass through)
  if (window.matchMedia("(pointer: fine)").matches && !reduced) {
    const dot = document.createElement("div"), ring = document.createElement("div");
    dot.className = "cursor-dot"; ring.className = "cursor-ring";
    document.body.append(dot, ring); document.body.classList.add("has-cursor");
    let rx = 0, ry = 0, mx = 0, my = 0;
    addEventListener("mousemove", (e) => { mx = e.clientX; my = e.clientY; dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`; });
    (function loop() { rx += (mx - rx) * .18; ry += (my - ry) * .18; ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`; requestAnimationFrame(loop); })();
    document.addEventListener("mouseover", (e) => ring.classList.toggle("hover", !!e.target.closest("a,button,input,textarea,.card")));
  }

  // Subtle 3D tilt on cards
  if (!reduced && window.matchMedia("(pointer: fine)").matches) {
    document.querySelectorAll("[data-tilt]").forEach((el) => {
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
        el.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-6px)`;
      });
      el.addEventListener("mouseleave", () => (el.style.transform = ""));
    });
  }

  // Interactive terminal
  const term = document.getElementById("term-body");
  const input = document.getElementById("term-cmd");
  if (term) {
    const seq = [["whoami", "Bavandla Shivashankar"], ["role", "Python Developer"], ["location", "Hyderabad, India"], ["status", "Open to Opportunities"]];
    const cmds = Object.fromEntries(seq);
    cmds.help = "Commands: whoami, role, location, status, skills, project, clear";
    cmds.skills = "Python · OOP · JavaScript · HTML · CSS · SQL · MySQL";
    cmds.project = "DeepFake Audio Detection Using Deep Learning";
    const line = (cmd, out) => {
      const d = document.createElement("div");
      d.innerHTML = `<div class="ln"><span class="pr">$</span> <span class="cmd"></span></div><div class="ln out"></div>`;
      d.querySelector(".cmd").textContent = cmd; d.querySelector(".out").textContent = out;
      term.appendChild(d); term.scrollTop = term.scrollHeight;
    };
    let i = 0;
    const play = () => { if (i < seq.length) { line(...seq[i++]); setTimeout(play, reduced ? 0 : 700); } };
    setTimeout(play, reduced ? 0 : 900);
    if (input) input.addEventListener("keydown", (e) => {
      if (e.key !== "Enter") return;
      const c = input.value.trim().toLowerCase(); input.value = "";
      if (!c) return;
      if (c === "clear") { term.innerHTML = ""; return; }
      line(c, cmds[c] || `command not found: ${c} — try "help"`);
    });
  }
})();
