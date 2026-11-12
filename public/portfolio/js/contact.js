/* Contact form: validation + honest mailto fallback (no backend). */
(function () {
  const form = document.getElementById("contact-form");
  if (!form) return;
  const msg = document.getElementById("form-msg");
  const btn = form.querySelector("button[type=submit]");
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const show = (text, ok) => { msg.textContent = text; msg.className = "form-msg show " + (ok ? "ok" : "bad"); };
  const check = (f) => {
    const field = f.closest(".field"), err = field.querySelector(".err"), v = f.value.trim();
    let e = "";
    if (!v) e = "This field is required.";
    else if (f.type === "email" && !emailRe.test(v)) e = "Please enter a valid email address.";
    else if (f.name === "message" && v.length < 10) e = "Message should be at least 10 characters.";
    field.classList.toggle("invalid", !!e); err.textContent = e;
    f.setAttribute("aria-invalid", e ? "true" : "false");
    return !e;
  };
  form.querySelectorAll("input,textarea").forEach((f) => f.addEventListener("blur", () => check(f)));
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const fields = [...form.querySelectorAll("input,textarea")];
    const ok = fields.map(check).every(Boolean);
    if (!ok) { show("Please fix the highlighted fields.", false); fields.find((f) => f.getAttribute("aria-invalid") === "true").focus(); return; }
    if (isPlaceholder(CONFIG.email)) { show("The site owner hasn't configured an email address yet, so this message can't be sent. Please reach out via LinkedIn or GitHub instead.", false); return; }
    btn.classList.add("loading"); btn.disabled = true;
    const d = Object.fromEntries(new FormData(form));
    const body = `Name: ${d.name}\nEmail: ${d.email}\n\n${d.message}`;
    setTimeout(() => {
      window.location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent(d.subject)}&body=${encodeURIComponent(body)}`;
      btn.classList.remove("loading"); btn.disabled = false;
      show("Your email app should now open with the message pre-filled. Press send there to deliver it — nothing has been sent yet.", true);
    }, 500);
  });
})();
