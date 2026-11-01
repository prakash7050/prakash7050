// Renders public/Jyoti_Prakash_Resume.pdf from src/data.js using headless Chrome.
import { writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { skills, experience, projects, education, summary } from "../src/data.js";

const esc = (t) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;");
const html = `<!doctype html><meta charset="utf-8"><style>
@page{size:A4;margin:14mm}body{font:10.5px/1.45 Georgia,serif;color:#111}
h1{text-align:center;font-size:24px;margin:0;letter-spacing:1px}.c{text-align:center;font-size:10px;margin:4px 0 8px}
h2{font-size:12px;border-bottom:1px solid #999;margin:12px 0 5px;letter-spacing:.5px}
.row{display:flex;justify-content:space-between;font-weight:bold}ul{margin:2px 0 6px 16px;padding:0}li{margin:1px 0}
</style>
<h1>JYOTI PRAKASH</h1>
<div class="c">Gurugram, Haryana • +91-7907221941 • prak5682@gmail.com • linkedin.com/in/prakash7050 • github.com/prakash7050</div>
<h2>SUMMARY</h2><div>${esc(summary)}</div>
<h2>SKILLS</h2>${Object.entries(skills).map(([k, v]) => `<div><b>${esc(k)}:</b> ${esc(v.join(", "))}</div>`).join("")}
<h2>WORK EXPERIENCE</h2>${experience.map((e) => `<div class="row"><span>${esc(e.company)} (${esc(e.role)})</span><span>${esc(e.period)}</span></div><ul>${e.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>`).join("")}
<h2>PROJECTS / CLIENTS</h2><div>${esc(projects.map((p) => p.name).join(" · "))}</div>
<h2>EDUCATION</h2><div class="row"><span>${esc(education.school)}</span><span>${esc(education.period)}</span></div><div>${esc(education.degree)}</div>`;
writeFileSync("scripts/resume.html", html);
execFileSync("google-chrome", ["--headless=new", "--no-sandbox", "--disable-gpu", "--no-pdf-header-footer", "--print-to-pdf=public/Jyoti_Prakash_Resume.pdf", "file://" + process.cwd() + "/scripts/resume.html"], { stdio: "ignore" });
