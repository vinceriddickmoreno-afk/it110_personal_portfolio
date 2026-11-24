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

// 3. Real GitHub Repositories & Projects
const projects = [
  {
    title: "CSC126-Lost-and-Found (Capstone R&D)",
    type: "AI & Visual Computing • Future Capstone",
    summary:
      "Campus Lost & Found system integrating a deconstructed DeepSeek AI model for automated object identification (CSC 126).",
    description:
      "Flagship project under active R&D for my future BSIT Capstone. Combines Graphics and Visual Computing (CSC 126) with a deconstructed DeepSeek AI pipeline to identify, classify, and match lost and found items automatically.",
    tags: ["DeepSeek AI", "CSC 126 Visual Computing", "Full-Stack", "Backend"],
    repoUrl: "https://github.com/vinceriddickmoreno-afk/CSC126-Lost-and-Found",
  },
  {
    title: "Agrifishery Customer Feedback System",
    type: "Full-Stack Management System",
    summary:
      "Customer feedback and satisfaction analytics platform inspired by my 2023 BSAF background at Caraga State University.",
    description:
      "Bridges agricultural/fishery domain insights with structured information management (ITE 16) and software engineering (CSC 106) to collect, track, and analyze stakeholder satisfaction metrics.",
    tags: ["Information Management", "Software Eng.", "Database"],
    repoUrl: "https://github.com/vinceriddickmoreno-afk/AgrifisheryCustomerFeedbackAndSatisfactionManagementSystem",
  },
  {
    title: "SecureBank",
    type: "Backend & Information Assurance",
    summary:
      "Core banking transaction system emphasizing data integrity, validation, and security fundamentals.",
    description:
      "Explores secure backend architecture, account transaction workflows, and defensive programming aligned with Information Assurance and Security (IT 107) and Object-Oriented Programming (CSC 104).",
    tags: ["Backend", "IT 107 Security", "OOP", "DBMS"],
    repoUrl: "https://github.com/vinceriddickmoreno-afk/securebank",
  },
  {
    title: "IT109 Systems Integration Skeleton",
    type: "Systems Architecture (IT 109)",
    summary:
      "Modular integration starter architecture built for Systems Integration and Architecture 1.",
    description:
      "Structured baseline repository demonstrating clean separation of concerns, API readiness, and component integration for IT 109 coursework.",
    tags: ["IT 109", "Integrative Programming", "Architecture"],
    repoUrl: "https://github.com/vinceriddickmoreno-afk/it109-skeleton",
  },
  {
    title: "RPG Games Engine",
    type: "OOP & Algorithms (CSC 104 / ITE 14)",
    summary:
      "Turn-based RPG mechanics implementing character classes, state management, and game loops.",
    description:
      "Built to reinforce Object-Oriented Programming (CSC 104) and Data Structures & Algorithms (ITE 14) through modular combat logic and inventory structures.",
    tags: ["OOP", "Data Structures", "Game Logic"],
    repoUrl: "https://github.com/vinceriddickmoreno-afk/rpggames",
  },
  {
    title: "IT110 Personal Portfolio",
    type: "Web Systems & Technologies (IT 110)",
    summary:
      "Responsive, SEO-indexed personal portfolio deployed via GitHub and Vercel.",
    description:
      "Built with semantic HTML5, modern CSS Grid, and vanilla JavaScript with structured JSON-LD metadata for Google Search discoverability.",
    tags: ["HTML5", "CSS3", "JavaScript", "Vercel"],
    repoUrl: "https://github.com/vinceriddickmoreno-afk/it110_personal_portfolio",
  },
];

const projectsContainer = document.getElementById("projects-container");
const projectModal = document.getElementById("project-modal");

projects.forEach((proj) => {
  const card = document.createElement("button");
  card.className = "project-card";
  card.innerHTML = `
    <div>
      <h3>${proj.title}</h3>
      <p>${proj.summary}</p>
    </div>
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
  document.getElementById("modal-proj-repo").href = proj.repoUrl;
  projectModal.classList.remove("hidden");
}

document.getElementById("close-project-modal").addEventListener("click", () => {
  projectModal.classList.add("hidden");
});

// 4. Engineering Focus Carousel
const focusItems = [
  {
    text: "Currently deconstructing DeepSeek AI to understand model inference and feature extraction—applying CSC 126 Visual Computing concepts so my Lost & Found system can automatically identify uploaded objects.",
    title: "DeepSeek AI & Visual Computing (CSC 126)",
    tag: "Future BSIT Capstone R&D",
  },
  {
    text: "Backed by completed coursework in Networking 1 & 2 (IT 104, IT 105) and a Cisco Networking Certificate, I design backend services with clear awareness of network protocols, latency, and security.",
    title: "Networking & Backend Infrastructure",
    tag: "Cisco Certified • IT 104 & IT 105",
  },
  {
    text: "Combining Relational & Advanced DBMS (ITE 16, IT 108) with Systems Integration (IT 109) and Web Systems (IT 110) to build reliable end-to-end applications.",
    title: "Full-Stack & Database Architecture",
    tag: "Caraga State University — 3rd Year BSIT",
  },
];

let focusIndex = 0;
function renderFocus() {
  const item = focusItems[focusIndex];
  document.getElementById("focus-text").textContent = item.text;
  document.getElementById("focus-title").textContent = item.title;
  document.getElementById("focus-tag").textContent = item.tag;
}
renderFocus();

document.getElementById("prev-focus").addEventListener("click", () => {
  focusIndex = (focusIndex - 1 + focusItems.length) % focusItems.length;
  renderFocus();
});

document.getElementById("next-focus").addEventListener("click", () => {
  focusIndex = (focusIndex + 1) % focusItems.length;
  renderFocus();
});

// 5. Curriculum Progress Data (Passed & Currently Enrolled)
const passedCourses = [
  "CSC 102 — Discrete Structures I",
  "ITE 10 — Introduction to Computing",
  "ITE 11 — Mathematical Applications for ITE",
  "ITE 12 — Fundamentals of Programming",
  "ITE 13 — Intermediate Programming",
  "ITE 14 — Data Structures and Algorithms",
  "ITE 15 — Social & Professional Issues",
  "ITE 16 — Information Management",
  "CSC 104 — Object-Oriented Programming",
  "CSC 106 — Software Engineering 1",
  "IT 104 — Networking 1",
  "IT 105 — Networking 2",
  "IT 106 — Integrative Programming & Tech 1",
  "IS 105 — Organization & Management Concepts",
  "IS 106 — Quantitative Methods",
];

const enrolledCourses = [
  "CSC 126 — Graphics and Visual Computing",
  "IT 107 — Information Assurance and Security 1",
  "IT 108 — Advanced Database Management Systems",
  "IT 109 — Systems Integration and Architecture 1",
  "IT 110 — Web Systems and Technologies",
  "ITE 18 — Applications Dev & Emerging Tech",
  "LIE — Living in the IT Era",
  "LWR — Life and Works of Rizal",
  "SE 105 — Career Readiness 1",
];

const passedList = document.getElementById("passed-courses");
passedCourses.forEach((c) => {
  const li = document.createElement("li");
  li.textContent = c;
  passedList.appendChild(li);
});

const enrolledList = document.getElementById("enrolled-courses");
enrolledCourses.forEach((c) => {
  const li = document.createElement("li");
  li.textContent = c;
  enrolledList.appendChild(li);
});

const curriculumModal = document.getElementById("curriculum-modal");
document.getElementById("curriculum-btn").addEventListener("click", () => {
  curriculumModal.classList.remove("hidden");
});
document.getElementById("close-curriculum-modal").addEventListener("click", () => {
  curriculumModal.classList.add("hidden");
});

// 6. Click-to-Copy Email
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

// 7. Reserved Resume Modal & Print
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

// Close any modal on backdrop click
[projectModal, curriculumModal, resumeModal].forEach((modal) => {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.add("hidden");
  });
});