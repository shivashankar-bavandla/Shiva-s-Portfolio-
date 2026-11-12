/* =========================================================
   CENTRAL CONFIGURATION — edit your details here.
   Values wrapped in [ ] are placeholders: replace them.
   ========================================================= */
const CONFIG = {
  name: "Bavandla Shivashankar",
  title: "Python Developer",
  email: "shivashankarbavandla9@gmail.com",
  phone: "+91 7386513820",
  githubUrl: "https://github.com/shivashankar-bavandla",
  githubUsername: "shivashankar-bavandla",
  linkedinUrl: "https://www.linkedin.com/in/bavandlashivashankar",
  resumePath: "assets/resume/Bavandla-Shivashankar-Resume.pdf",
  profilePhoto: "assets/images/profile.jpg",
  location: "Hyderabad, Telangana, India",
  deepfakeRepoUrl: "https://github.com/shivashankar-bavandla/Deep-Fake-Audio-Detection"
};

/** True when a config value is still a [placeholder]. */
const isPlaceholder = (v) => !v || /^\[.*\]$/.test(String(v).trim());
const clean = (v) => String(v).replace(/^\[|\]$/g, "");

/**
 * Wire every element with data-config="key".
 * Links pointing at placeholders are disabled with an explanatory tooltip
 * instead of sending visitors to a fake URL.
 */
function applyConfig() {
  document.querySelectorAll("[data-config]").forEach((el) => {
    const key = el.dataset.config;
    const val = CONFIG[key];
    const ph = isPlaceholder(val);
    if (el.dataset.text !== undefined) {
      el.textContent = ph ? clean(val) : val;
      if (ph) el.classList.add("placeholder");
    }
    if (el.tagName !== "A") return;
    let href = val;
    if (key === "email") href = "mailto:" + val;
    if (key === "phone") href = "tel:" + String(val).replace(/\s/g, "");
    if (ph) {
      el.removeAttribute("href");
      el.setAttribute("aria-disabled", "true");
      el.title = "Link not configured yet — update CONFIG." + key + " in js/main.js";
      el.style.cursor = "not-allowed";
      el.addEventListener("click", (e) => e.preventDefault());
    } else {
      el.href = href;
      if (/^https?:/.test(href)) { el.target = "_blank"; el.rel = "noopener noreferrer"; }
    }
  });
}

/** Loader, back-to-top, footer year. */
function initChrome() {
  const loader = document.querySelector(".loader");
  window.addEventListener("load", () => setTimeout(() => loader && loader.classList.add("done"), 250));
  setTimeout(() => loader && loader.classList.add("done"), 2500); // safety
  document.body.classList.add("page-in");

  const top = document.querySelector(".to-top");
  if (top) {
    window.addEventListener("scroll", () => top.classList.toggle("show", window.scrollY > 500), { passive: true });
    top.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }
}

/** Live GitHub repositories via public REST API, with graceful fallback. */
async function initGitHub() {
  const box = document.getElementById("gh-repos");
  if (!box) return;
  const status = document.getElementById("gh-status");
  const user = CONFIG.githubUsername;
  if (!user) {
    status.textContent = "GitHub username not configured yet. Set CONFIG.githubUsername in js/main.js to show live repositories here.";
    return;
  }
  try {
    status.textContent = "Loading repositories…";
    const res = await fetch(`https://api.github.com/users/${encodeURIComponent(user)}/repos?sort=updated&per_page=6`);
    if (!res.ok) throw new Error(res.status);
    const repos = await res.json();
    if (!repos.length) { status.textContent = "No public repositories yet."; return; }
    status.textContent = "";
    box.innerHTML = repos.map((r) => `
      <article class="glass card reveal visible">
        <h3>${escapeHtml(r.name)}</h3>
        <p>${escapeHtml(r.description || "No description provided.")}</p>
        <div class="tags">${r.language ? `<span class="tag">${escapeHtml(r.language)}</span>` : ""}</div>
        <a class="btn btn-ghost btn-sm" style="margin-top:16px" href="${r.html_url}" target="_blank" rel="noopener noreferrer">View Repository</a>
      </article>`).join("");
  } catch (e) {
    status.textContent = "GitHub is unavailable right now. Please visit the profile directly.";
  }
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

document.addEventListener("DOMContentLoaded", () => {
  applyConfig();
  initChrome();
  initGitHub();
});
