// 1. Dynamic Footer Year
document.getElementById("year").textContent = new Date().getFullYear();

// 2. Light / Dark Theme Toggle
const themeToggle = document.getElementById("theme-toggle");
const root = document.documentElement;

const savedTheme = localStorage.getItem("portfolio-theme") || "light";
applyTheme(savedTheme);

themeToggle.addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  applyTheme(next);
  localStorage.setItem("portfolio-theme", next);
});

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  themeToggle.textContent = theme === "dark" ? "☀️ Light" : "🌙 Dark";
}

// 3. Projects Data & Interactive Modal
const projects = [
  {
    title: "TaskFlow Kanban App",
    type: "Full-Stack Web App",
    summary: "Drag-and-drop project board with real-time status filters and local persistence.",
    description:
      "Built a minimalist productivity board designed for student teams. Features task prioritization, instant search, and responsive mobile layouts.",
    tags: ["JavaScript", "CSS Grid", "REST API"],
    liveUrl: "https://your-portfolio.vercel.app/",
    repoUrl: "https://github.com/yourusername/taskflow",
  },
  {
    title: "Campus Event Portal",
    type: "Frontend + Database",
    summary: "Centralized directory for university org events with QR check-in support.",
    description:
      "Streamlined event registration for 400+ students with automated schedule filtering and admin attendance exports.",
    tags: ["HTML5", "Node.js", "PostgreSQL"],
    liveUrl: "https://your-portfolio.vercel.app/",
    repoUrl: "https://github.com/yourusername/campus-events",
  },
  {
    title: "Expense Tracker Dashboard",
    type: "Web Utility",
    summary: "Clean personal finance tracker with category breakdowns and CSV export.",
    description:
      "Helps users monitor monthly budgets with instant calculations, visual progress bars, and zero-login local storage.",
    tags: ["JavaScript", "Charts", "Vercel"],
    liveUrl: "https://your-portfolio.vercel.app/",
    repoUrl: "https://github.com/yourusername/expense-tracker",
  },
  {
    title: "Developer Link Hub",
    type: "Open Source Template",
    summary: "Fast, SEO-friendly link-in-bio page scoring 100/100 on Lighthouse.",
    description:
      "Created a lightweight static template optimized for fast load times, accessibility, and clean social previews.",
    tags: ["HTML5", "CSS3", "SEO"],
    liveUrl: "https://your-portfolio.vercel.app/",
    repoUrl: "https://github.com/yourusername/link-hub",
  },
];

const projectsContainer = document.getElementById("projects-container");
const projectModal = document.getElementById("project-modal");

projects.forEach((proj) => {
  const card = document.createElement("button");
  card.className = "project-card";
  card.innerHTML = `
    <h3>${proj.title}</h3>
    <p>${proj.summary}</p>
    <div class="tags">
      ${proj.tags.map((t) => `<span class="tag">${t}</span>`).join("")}
    </div>
  `;
  card.addEventListener("click", () => openProjectModal(proj));
  projectsContainer.appendChild(card);
});

function openProjectModal(proj) {
  document.getElementById("modal-proj-type").textContent = proj.type;
  document.getElementById("modal-proj-title").textContent = proj.title;
  document.getElementById("modal-proj-desc").textContent = proj.description;
  document.getElementById("modal-proj-tags").innerHTML = proj.tags
    .map((t) => `<span class="tag">${t}</span>`)
    .join("");
  document.getElementById("modal-proj-live").href = proj.liveUrl;
  document.getElementById("modal-proj-repo").href = proj.repoUrl;
  projectModal.classList.remove("hidden");
}

document.getElementById("close-project-modal").addEventListener("click", () => {
  projectModal.classList.add("hidden");
});

// 4. Recommendations Carousel
const recommendations = [
  {
    text: "“Consistently delivers clean, well-structured code ahead of deadlines. Great eye for UI details and very easy to collaborate with.”",
    name: "Prof. Maria Santos",
    role: "Capstone Adviser, Computer Science Department",
  },
  {
    text: "“Quick learner who takes initiative. Turned our rough wireframes into a fast, mobile-ready web app in less than two weeks.”",
    name: "Mark Reyes",
    role: "Lead Developer, Tech Studio Inc.",
  },
];

let recIndex = 0;
function renderRecommendation() {
  const rec = recommendations[recIndex];
  document.getElementById("rec-text").textContent = rec.text;
  document.getElementById("rec-name").textContent = rec.name;
  document.getElementById("rec-role").textContent = rec.role;
}
renderRecommendation();

document.getElementById("prev-rec").addEventListener("click", () => {
  recIndex = (recIndex - 1 + recommendations.length) % recommendations.length;
  renderRecommendation();
});

document.getElementById("next-rec").addEventListener("click", () => {
  recIndex = (recIndex + 1) % recommendations.length;
  renderRecommendation();
});

// 5. Click-to-Copy Email
const copyBtn = document.getElementById("copy-email-btn");
const copyHint = document.getElementById("copy-hint");

copyBtn.addEventListener("click", async () => {
  const email = copyBtn.getAttribute("data-email");
  try {
    await navigator.clipboard.writeText(email);
    copyHint.textContent = "Copied to clipboard!";
    setTimeout(() => (copyHint.textContent = "Click to copy"), 2000);
  } catch {
    copyHint.textContent = email;
  }
});

// 6. Resume Modal & Print
const resumeModal = document.getElementById("resume-modal");
document.getElementById("resume-btn").addEventListener("click", () => {
  resumeModal.classList.remove("hidden");
});
document.getElementById("open-resume-tile").addEventListener("click", () => {
  resumeModal.classList.remove("hidden");
});
document.getElementById("close-resume-modal").addEventListener("click", () => {
  resumeModal.classList.add("hidden");
});
document.getElementById("print-resume-btn").addEventListener("click", () => {
  window.print();
});

// Close modals on backdrop click
[projectModal, resumeModal].forEach((modal) => {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.add("hidden");
  });
});