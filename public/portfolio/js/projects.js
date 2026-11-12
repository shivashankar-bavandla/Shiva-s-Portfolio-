/* Reusable filter for projects (and blog with search). */
function setupFilter({ buttons, items, search, empty }) {
  const btns = document.querySelectorAll(buttons);
  const cards = document.querySelectorAll(items);
  const input = search ? document.querySelector(search) : null;
  const emptyEl = empty ? document.querySelector(empty) : null;
  if (!btns.length || !cards.length) return;
  let cat = "all";
  const apply = () => {
    const q = input ? input.value.trim().toLowerCase() : "";
    let shown = 0;
    cards.forEach((c) => {
      const okCat = cat === "all" || (c.dataset.category || "").split(" ").includes(cat);
      const okQ = !q || c.textContent.toLowerCase().includes(q);
      const show = okCat && okQ;
      c.style.display = show ? "" : "none";
      if (show) shown++;
    });
    if (emptyEl) emptyEl.style.display = shown ? "none" : "block";
  };
  btns.forEach((b) => b.addEventListener("click", () => {
    btns.forEach((x) => { x.classList.remove("active"); x.setAttribute("aria-pressed", "false"); });
    b.classList.add("active"); b.setAttribute("aria-pressed", "true");
    cat = b.dataset.filter; apply();
  }));
  if (input) input.addEventListener("input", apply);
}
document.addEventListener("DOMContentLoaded", () => {
  setupFilter({ buttons: "#project-filters .filter-btn", items: ".project-item", empty: "#project-empty" });
  setupFilter({ buttons: "#blog-filters .filter-btn", items: ".blog-item", search: "#blog-search", empty: "#blog-empty" });
});
