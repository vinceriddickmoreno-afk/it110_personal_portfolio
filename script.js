// 1. Dynamic Year
document.getElementById("year").textContent = new Date().getFullYear();

// 2. Light / Dark Mode Toggle
const themeToggle = document.getElementById("theme-toggle");
const root = document.documentElement;

const savedTheme = localStorage.getItem("portfolio-theme") || "dark";
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

// 3. Interactive Parallax on Hero Portrait & Code Card
const heroVisual = document.querySelector(".hero-visual");
if (heroVisual) {
  const dotGrid = heroVisual.querySelector(".dot-grid");
  const portraitOrb = heroVisual.querySelector(".portrait-orb");
  const portraitCutout = heroVisual.querySelector(".portrait-cutout");
  const codeCard = heroVisual.querySelector(".floating-code-card");

  heroVisual.addEventListener("mousemove", (e) => {
    if (window.innerWidth <= 620) return;
    const rect = heroVisual.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    if (dotGrid) dotGrid.style.transform = `translate(${x * -16}px, ${y * -16}px)`;
    if (portraitOrb) portraitOrb.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
    if (portraitCutout) portraitCutout.style.transform = `translate(${x * 18}px, ${y * 8}px)`;
    if (codeCard) codeCard.style.transform = `translate(${x * -22}px, ${y * -14}px)`;
  });

  heroVisual.addEventListener("mouseleave", () => {
    [dotGrid, portraitOrb, portraitCutout, codeCard].forEach((el) => {
      if (el) el.style.transform = "";
    });
  });
}

// 4. Skills Progress Bars (3x3 Grid with Scroll-Triggered Bar & Counter Animation)
const skills = [
  { badge: "HT", name: "HTML5 & Semantic Web", pct: 95 },
  { badge: "OO", name: "Backend & OOP (CSC 104)", pct: 90 },
  { badge: "NW", name: "Cisco Networking (IT 104/105)", pct: 92 },

  { badge: "CS", name: "CSS3 & Responsive UI", pct: 90 },
  { badge: "DB", name: "DBMS & SQL (ITE 16 / IT 108)", pct: 88 },
  { badge: "AI", name: "DeepSeek AI & CSC 126 Vision", pct: 86 },

  { badge: "JS", name: "JavaScript (ES6+)", pct: 88 },
  { badge: "SI", name: "Systems Integration (IT 109)", pct: 85 },
  { badge: "GT", name: "Git, GitHub & Vercel", pct: 90 },
];

const skillsGrid = document.getElementById("skills-grid");
skills.forEach((s) => {
  const el = document.createElement("div");
  el.className = "skill-item";
  el.innerHTML = `
    <div class="skill-top">
      <span class="skill-name-wrap">
        <span class="skill-badge">${s.badge}</span>
        <span>${s.name}</span>
      </span>
      <span class="skill-pct" data-target="${s.pct}">0%</span>
    </div>
    <div class="progress-track">
      <div class="progress-fill" data-target="${s.pct}" style="width: 0%"></div>
    </div>
  `;
  skillsGrid.appendChild(el);
});

let skillTimers = [];

function animateSkills(show) {
  skillTimers.forEach((id) => cancelAnimationFrame(id));
  skillTimers = [];

  const fills = document.querySelectorAll(".progress-fill");
  const counters = document.querySelectorAll(".skill-pct");

  if (!show) {
    fills.forEach((bar) => (bar.style.width = "0%"));
    counters.forEach((c) => (c.textContent = "0%"));
    return;
  }

  fills.forEach((bar, idx) => {
    setTimeout(() => {
      bar.style.width = `${bar.dataset.target}%`;
    }, idx * 55);
  });

  counters.forEach((counter, idx) => {
    const target = parseInt(counter.dataset.target, 10);
    const duration = 1100;
    const delay = idx * 55;
    let startTime = null;

    function tick(now) {
      if (!startTime) startTime = now + delay;
      const elapsed = now - startTime;
      if (elapsed < 0) {
        skillTimers.push(requestAnimationFrame(tick));
        return;
      }
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      counter.textContent = `${Math.round(eased * target)}%`;
      if (progress < 1) {
        skillTimers.push(requestAnimationFrame(tick));
      }
    }

    skillTimers.push(requestAnimationFrame(tick));
  });
}

// 5. Section Scroll Reveal, Active Nav Link & Skill Trigger
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll(".page-section");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const id = entry.target.getAttribute("id");

      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.dataset.section === id);
        });
        if (id === "skills") animateSkills(true);
      } else if (id === "skills") {
        animateSkills(false);
      }
    });
  },
  { threshold: 0.35 }
);

sections.forEach((sec) => sectionObserver.observe(sec));

// 6. Featured GitHub Projects (Paginated 3 per view + 3D Tilt Hover + Modal)
const projects = [
  {
    num: "01",
    title: "CSC126-Lost-and-Found",
    type: "DeepSeek AI + CSC 126 • Capstone R&D",
    summary:
      "AI-powered campus lost & found system deconstructing DeepSeek AI for automated visual object identification.",
    description:
      "My flagship repository being developed toward my future BSIT Capstone at Caraga State University. Combines Graphics and Visual Computing (CSC 126) with a deconstructed DeepSeek AI pipeline to identify and match lost and found items automatically.",
    tags: ["DeepSeek AI", "CSC 126 Visual Computing", "Backend", "Full-Stack"],
    gradient: "linear-gradient(135deg, #312e81 0%, #6d28d9 100%)",
    mockText: "> deepseek.detect(item_img)\n✓ Object: Campus ID / Laptop [98.4%]",
    repoUrl: "https://github.com/vinceriddickmoreno-afk/CSC126-Lost-and-Found",
  },
  {
    num: "02",
    title: "Agrifishery Feedback System",
    type: "Full-Stack Management System",
    summary:
      "Customer feedback and satisfaction analytics platform inspired by my 2023 BSAF foundation at CSU.",
    description:
      "Bridges my 2023 BS in Agroforestry background with Information Management (ITE 16) and Software Engineering (CSC 106) to collect, track, and analyze stakeholder satisfaction records.",
    tags: ["Information Management", "Software Eng.", "Database"],
    gradient: "linear-gradient(135deg, #065f46 0%, #0284c7 100%)",
    mockText: "SELECT AVG(rating) FROM feedback;\n> Satisfaction Index: 96.2%",
    repoUrl: "https://github.com/vinceriddickmoreno-afk/AgrifisheryCustomerFeedbackAndSatisfactionManagementSystem",
  },
  {
    num: "03",
    title: "SecureBank",
    type: "Backend & Information Assurance",
    summary:
      "Core banking transaction system emphasizing data integrity, validation, and security principles.",
    description:
      "Explores secure backend architecture, account transaction workflows, and defensive validation aligned with Information Assurance & Security (IT 107) and Object-Oriented Programming (CSC 104).",
    tags: ["Backend", "IT 107 Security", "OOP", "DBMS"],
    gradient: "linear-gradient(135deg, #0f172a 0%, #1d4ed8 100%)",
    mockText: "POST /api/v1/transfer [200 OK]\n✓ Ledger Checksum Verified",
    repoUrl: "https://github.com/vinceriddickmoreno-afk/securebank",
  },
  {
    num: "04",
    title: "IT109 Systems Skeleton",
    type: "Systems Integration & Architecture 1",
    summary:
      "Modular baseline repository built for Systems Integration and Architecture 1 (IT 109).",
    description:
      "Structured starter architecture demonstrating clean separation of concerns, API integration readiness, and maintainable component boundaries.",
    tags: ["IT 109", "Integrative Programming", "Architecture"],
    gradient: "linear-gradient(135deg, #3730a3 0%, #0ea5e9 100%)",
    mockText: "module.exports = { gateway, service };\n✓ Integration Layer Ready",
    repoUrl: "https://github.com/vinceriddickmoreno-afk/it109-skeleton",
  },
  {
    num: "05",
    title: "RPG Games Engine",
    type: "OOP & Data Structures (CSC 104 / ITE 14)",
    summary:
      "Turn-based RPG mechanics implementing character classes, state loops, and inventory structures.",
    description:
      "Built to reinforce Object-Oriented Programming (CSC 104) and Data Structures & Algorithms (ITE 14) through modular combat logic and state management.",
    tags: ["OOP", "Data Structures", "Algorithms"],
    gradient: "linear-gradient(135deg, #4c1d95 0%, #be185d 100%)",
    mockText: "class Hero extends Entity {\n  castSkill(target) { ... }\n}",
    repoUrl: "https://github.com/vinceriddickmoreno-afk/rpggames",
  },
  {
    num: "06",
    title: "IT110 Personal Portfolio",
    type: "Web Systems & Technologies (IT 110)",
    summary:
      "Responsive, SEO-indexed personal portfolio deployed via GitHub and Vercel.",
    description:
      "Built with semantic HTML5, modern CSS Grid, and vanilla JavaScript with structured JSON-LD metadata and Google Search Console indexing.",
    tags: ["HTML5", "CSS3", "JavaScript", "Vercel"],
    gradient: "linear-gradient(135deg, #1e293b 0%, #4f46e5 100%)",
    mockText: "git push origin main\n✓ Deployed to Vercel Edge",
    repoUrl: "https://github.com/vinceriddickmoreno-afk/it110_personal_portfolio",
  },
];

let projectPage = 0;
const perPage = 3;
const totalPages = Math.ceil(projects.length / perPage);

const projectsGrid = document.getElementById("projects-grid");
const dotsContainer = document.getElementById("carousel-dots");
const projectModal = document.getElementById("project-modal");

function renderProjects() {
  projectsGrid.innerHTML = "";
  const start = projectPage * perPage;
  const slice = projects.slice(start, start + perPage);

  slice.forEach((proj) => {
    const card = document.createElement("article");
    card.className = "project-card";
    card.innerHTML = `
      <div class="project-preview" style="background: ${proj.gradient};">
        <span class="project-num">${proj.num}</span>
        <pre class="project-mock-ui">${proj.mockText}</pre>
      </div>
      <div class="project-body">
        <h3>${proj.title}</h3>
        <p>${proj.summary}</p>
        <button type="button" class="project-link-btn">View Project <span>→</span></button>
      </div>
    `;

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(800px) rotateY(${x * 7}deg) rotateX(${y * -7}deg) translateY(-6px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });

    card.querySelector(".project-link-btn").addEventListener("click", () => openProjectModal(proj));
    projectsGrid.appendChild(card);
  });

  dotsContainer.innerHTML = "";
  for (let i = 0; i < totalPages; i++) {
    const dot = document.createElement("button");
    dot.className = `dot-btn ${i === projectPage ? "active" : ""}`;
    dot.setAttribute("aria-label", `Project page ${i + 1}`);
    dot.addEventListener("click", () => {
      projectPage = i;
      renderProjects();
    });
    dotsContainer.appendChild(dot);
  }
}

renderProjects();

document.getElementById("prev-projects").addEventListener("click", () => {
  projectPage = (projectPage - 1 + totalPages) % totalPages;
  renderProjects();
});

document.getElementById("next-projects").addEventListener("click", () => {
  projectPage = (projectPage + 1) % totalPages;
  renderProjects();
});

function openProjectModal(proj) {
  document.getElementById("modal-proj-type").textContent = proj.type;
  document.getElementById("modal-proj-title").textContent = proj.title;
  document.getElementById("modal-proj-desc").textContent = proj.description;
  document.getElementById("modal-proj-tags").innerHTML = proj.tags
    .map((t) => `<span class="modal-tag">${t}</span>`)
    .join("");
  document.getElementById("modal-proj-repo").href = proj.repoUrl;
  projectModal.classList.remove("hidden");
}

document.getElementById("close-project-modal").addEventListener("click", () => {
  projectModal.classList.add("hidden");
});

// 7. Curriculum Progress Lists
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
["nav-curriculum-btn", "about-curriculum-btn", "social-curriculum-btn"].forEach((id) => {
  document.getElementById(id).addEventListener("click", () => {
    curriculumModal.classList.remove("hidden");
  });
});
document.getElementById("close-curriculum-modal").addEventListener("click", () => {
  curriculumModal.classList.add("hidden");
});

// 8. Reserved Resume Slot Modal
const resumeModal = document.getElementById("resume-modal");
["hero-resume-btn", "bottom-resume-btn", "social-resume-btn"].forEach((id) => {
  document.getElementById(id).addEventListener("click", () => {
    resumeModal.classList.remove("hidden");
  });
});
document.getElementById("close-resume-modal").addEventListener("click", () => {
  resumeModal.classList.add("hidden");
});
document.getElementById("print-resume-btn").addEventListener("click", () => {
  window.print();
});

// 9. Click-to-Copy Email
const copyEmailBtn = document.getElementById("copy-email-btn");
const copyBtnLabel = document.getElementById("copy-btn-label");

copyEmailBtn.addEventListener("click", async () => {
  const email = copyEmailBtn.getAttribute("data-email");
  try {
    await navigator.clipboard.writeText(email);
    copyBtnLabel.textContent = "Copied!";
    setTimeout(() => (copyBtnLabel.textContent = "Copy Email"), 2000);
  } catch {
    copyBtnLabel.textContent = email;
  }
});

// Close modals on backdrop click
[projectModal, curriculumModal, resumeModal].forEach((modal) => {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.add("hidden");
  });
});