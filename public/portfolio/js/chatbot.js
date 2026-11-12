/* Portfolio assistant — rule-based, predefined answers (not AI).
   To plug in an API later, replace getReply() with an async fetch. */
(function () {
  const KB = [
    { q: "Who is Shiva?", k: ["who", "shiva", "about", "yourself"], a: () => `${CONFIG.name} is a Computer Science graduate specialising in Artificial Intelligence and Machine Learning. He completed his B.Tech in May 2026 and is interested in entry-level Python Developer and Software Developer roles. <a href="about.html">Read more</a>.` },
    { q: "What are his technical skills?", k: ["skill", "tech", "language", "stack"], a: () => `Python, Object-Oriented Programming, JavaScript, HTML, CSS, MySQL, SQL and DBMS. His DeepFake Audio Detection project also uses CNN, LSTM and MFCC. <a href="skills.html">See skills</a>.` },
    { q: "What project has he developed?", k: ["project", "deepfake", "built", "work"], a: () => `His featured academic project is <strong>DeepFake Audio Detection Using Deep Learning</strong>, using MFCC features and a hybrid CNN-LSTM model. <a href="project-deepfake-audio.html">View project</a>.` },
    { q: "What is his educational background?", k: ["education", "degree", "college", "study", "b.tech"], a: () => `B.Tech in Computer Science and Engineering (Artificial Intelligence and Machine Learning) from Sree Dattha Institute of Engineering and Science, completed May 2026. CGPA: 6.89. <a href="education.html">Education</a>.` },
    { q: "Does he have internship experience?", k: ["internship", "experience", "jyesta"], a: () => `He completed a Machine Learning internship at Jyesta Corporate Entity from 12 July to 12 September 2025. <a href="experience.html">View experience</a>.` },
    { q: "What certificates has he completed?", k: ["certificate", "certification", "deloitte", "great learning"], a: () => `His portfolio includes the Jyesta Machine Learning Internship Certificate and Deloitte Data Analytics Job Simulation Certificate. Great Learning Introduction to Artificial Intelligence is also listed in his resume. <a href="certifications.html">View credentials</a>.` },
    { q: "How can I contact him?", k: ["contact", "email", "reach", "phone", "hire"], a: () => `Email: <a href="mailto:${CONFIG.email}">${CONFIG.email}</a><br>Phone: <a href="tel:${CONFIG.phone.replace(/\s/g, "")}">${CONFIG.phone}</a><br>GitHub: <a href="${CONFIG.githubUrl}" target="_blank" rel="noopener noreferrer">View profile</a><br>LinkedIn: <a href="${CONFIG.linkedinUrl}" target="_blank" rel="noopener noreferrer">Connect</a><br><a href="contact.html">Contact page</a>.` },
    { q: "How can I download his resume?", k: ["resume", "cv", "download"], a: () => `<a href="${CONFIG.resumePath}" download="Bavandla-Shivashankar-Resume.pdf">Download the resume</a> or use the Resume button in the navigation.` }
  ];
  const getReply = (text) => {
    const t = text.toLowerCase();
    const hit = KB.find((e) => e.k.some((k) => t.includes(k)));
    return hit ? hit.a() : "I can answer questions about Shiva's skills, projects, education, resume and contact details. Try one of the suggestions below!";
  };

  const fab = document.createElement("button");
  fab.className = "chat-fab"; fab.setAttribute("aria-label", "Open portfolio assistant"); fab.setAttribute("aria-expanded", "false");
  fab.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`;
  const win = document.createElement("div");
  win.className = "chat-win glass"; win.setAttribute("role", "dialog"); win.setAttribute("aria-label", "Portfolio assistant");
  win.innerHTML = `
    <div class="chat-head"><div class="av">SD</div><div><strong>Portfolio Assistant</strong><small>Predefined answers</small></div>
      <button class="icon-btn" aria-label="Close assistant"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg></button></div>
    <div class="chat-body" aria-live="polite"></div>
    <div class="chips"></div>
    <form class="chat-form"><input aria-label="Type your question" placeholder="Ask about Shiva…" /><button class="btn btn-primary btn-sm" type="submit">Send</button></form>
    <p class="chat-note">Rule-based assistant · no AI service is used</p>`;
  document.body.append(fab, win);
  const body = win.querySelector(".chat-body"), chips = win.querySelector(".chips"), form = win.querySelector("form"), input = form.querySelector("input");
  const add = (html, who) => { const m = document.createElement("div"); m.className = "msg " + who; if (who === "user") m.textContent = html; else m.innerHTML = html; body.appendChild(m); body.scrollTop = body.scrollHeight; };
  const ask = (t) => { add(t, "user"); setTimeout(() => add(getReply(t), "bot"), 350); };
  KB.forEach((e) => { const c = document.createElement("button"); c.type = "button"; c.className = "chip"; c.textContent = e.q; c.onclick = () => ask(e.q); chips.appendChild(c); });
  let greeted = false;
  const toggle = (open) => {
    win.classList.toggle("open", open); fab.setAttribute("aria-expanded", String(open));
    if (open && !greeted) { add("Hi! I'm Shiva's portfolio assistant. What would you like to know?", "bot"); greeted = true; }
    if (open) input.focus();
  };
  fab.onclick = () => toggle(!win.classList.contains("open"));
  win.querySelector(".chat-head button").onclick = () => { toggle(false); fab.focus(); };
  document.addEventListener("keydown", (e) => e.key === "Escape" && win.classList.contains("open") && toggle(false));
  form.onsubmit = (e) => { e.preventDefault(); const v = input.value.trim(); if (v) { ask(v); input.value = ""; } };
})();
