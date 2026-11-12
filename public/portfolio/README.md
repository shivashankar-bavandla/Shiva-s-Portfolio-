# Bavandla Shivashankar — Portfolio

A multi-page static portfolio built with **only HTML5, CSS3 and Vanilla JavaScript** (no frameworks, no build step).

## Run locally
Open `index.html` in a browser, or serve the folder: `python -m http.server`.

## Deploy
Upload this folder to GitHub Pages, Netlify or Vercel (static). No build command needed.

## Personalise
1. **Contact & social links** — edit the `CONFIG` object at the top of `js/main.js`
   (email, phone, GitHub URL, `githubUsername`, LinkedIn URL, project repo URL).
   Values in `[brackets]` are placeholders; links stay disabled until replaced.
2. **Resume** — add your PDF at `assets/resume/Bavandla-Shivashankar-Resume.pdf`.
3. **Photo** — add `assets/images/profile.jpg` and replace the placeholder in `about.html`.
4. **Certificates, experience, education, blog** — replace items marked `[placeholder]` / `SAMPLE`.
5. **SEO** — replace `https://example.com` in `sitemap.xml` and `robots.txt` with your domain.

## Structure
- `css/style.css` design system & components · `css/animations.css` · `css/responsive.css`
- `js/main.js` config, GitHub API · `navigation.js` · `animations.js` · `projects.js` (filters/search) · `contact.js` · `chatbot.js` (rule-based, not AI)
