/* Navigation: active page indicator + mobile menu */
(function () {
  const nav = document.querySelector(".nav");
  if (!nav) return;
  const page = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  const current = page.startsWith("project-") ? "projects.html" : page;
  nav.querySelectorAll(".nav-links a").forEach((a) => {
    if (a.getAttribute("href").toLowerCase() === current) {
      a.classList.add("active");
      a.setAttribute("aria-current", "page");
    }
  });
  const btn = nav.querySelector(".hamburger");
  const close = () => { nav.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); };
  btn.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    btn.setAttribute("aria-expanded", String(open));
  });
  nav.querySelectorAll(".nav-links a").forEach((a) => a.addEventListener("click", close));
  document.addEventListener("keydown", (e) => e.key === "Escape" && close());
  window.addEventListener("resize", () => window.innerWidth >= 1080 && close());
})();
