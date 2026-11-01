/**
 * Skill Library - 30-Day Python Learning SaaS Tracking Engine
 * Manages LocalStorage state, Streak calculation, Interactive MCQs & Certificate
 */

const STORAGE_KEY = "skilllib_py_tracker_v1";

let trackerState = {
  activeDay: 1,
  completedDays: [],
  quizAnswers: {}, // { "day-1": { 0: { chosen: 1, isCorrect: true } } }
  streak: 1,
  lastVisit: new Date().toISOString().split("T")[0],
  studentName: "Python Learner"
};

// ---------------- Initialize ----------------
document.addEventListener("DOMContentLoaded", () => {
  loadTrackerState();
  updateStreak();
  renderSidebar();
  renderDay(trackerState.activeDay);
  updateProgressUI();
  setupEventListeners();
});

function loadTrackerState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      trackerState = { ...trackerState, ...parsed };
    }
  } catch (e) {
    console.error("Error loading tracker state", e);
  }
}

function saveTrackerState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trackerState));
  } catch (e) {
    console.error("Error saving tracker state", e);
  }
}

function updateStreak() {
  const today = new Date().toISOString().split("T")[0];
  if (trackerState.lastVisit !== today) {
    const lastDate = new Date(trackerState.lastVisit);
    const currentDate = new Date(today);
    const diffDays = Math.round((currentDate - lastDate) / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      trackerState.streak += 1;
    } else if (diffDays > 1) {
      trackerState.streak = 1;
    }
    trackerState.lastVisit = today;
    saveTrackerState();
  }
}

// ---------------- Render Sidebar ----------------
function renderSidebar(filterQuery = "") {
  const container = document.getElementById("pySidebarContent");
  if (!container) return;
  container.innerHTML = "";

  const sections = [
    {
      phaseName: "🟢 Phase 1: Beginner (Days 1–15)",
      days: [1, 15]
    },
    {
      phaseName: "🟡 Phase 2: Intermediate (Days 16–30)",
      days: [16, 30]
    }
  ];

  sections.forEach(sec => {
    let secDays = PYTHON_COURSE.filter(d => d.day >= sec.days[0] && d.day <= sec.days[1]);
    if (filterQuery) {
      secDays = secDays.filter(d => 
        d.topic.toLowerCase().includes(filterQuery.toLowerCase()) || 
        d.concept.toLowerCase().includes(filterQuery.toLowerCase()) ||
        d.demo.toLowerCase().includes(filterQuery.toLowerCase()) ||
        `day ${d.day}`.includes(filterQuery.toLowerCase())
      );
    }
    if (secDays.length === 0) return;

    const group = document.createElement("div");
    group.className = "py-week-group";

    const titleEl = document.createElement("div");
    titleEl.className = "py-week-title";
    titleEl.innerHTML = `<span>${sec.phaseName}</span>`;
    group.appendChild(titleEl);

    secDays.forEach(item => {
      const isCompleted = trackerState.completedDays.includes(item.day);
      const isActive = trackerState.activeDay === item.day;

      const a = document.createElement("a");
      a.className = `py-day-item ${isActive ? "active" : ""}`;
      a.href = `#day-${item.day}`;
      a.onclick = (e) => {
        e.preventDefault();
        navigateToDay(item.day);
      };

      a.innerHTML = `
        <div class="py-day-left">
          <span class="py-day-num">D${item.day}</span>
          <span class="py-day-name">${item.topic}</span>
        </div>
        <span class="py-day-status ${isCompleted ? 'py-status-done' : 'py-status-locked'}">
          ${isCompleted ? '✅' : (isActive ? '⏳' : '○')}
        </span>
      `;
      group.appendChild(a);
    });

    container.appendChild(group);
  });

  // Coming soon teaser for Phase 3 (Days 31-90)
  if (!filterQuery) {
    const teaser = document.createElement("div");
    teaser.className = "py-week-group";
    teaser.style.marginTop = "16px";
    teaser.style.padding = "14px";
    teaser.style.background = "rgba(255, 255, 255, 0.03)";
    teaser.style.borderRadius = "8px";
    teaser.style.border = "1px dashed rgba(255, 255, 255, 0.1)";
    teaser.innerHTML = `
      <div style="font-size: 11.5px; font-weight: 700; color: var(--py-gold); margin-bottom: 4px; text-transform: uppercase;">
        ⚡ Coming Soon
      </div>
      <div style="font-size: 13px; font-weight: 600; color: var(--py-text-muted);">
        Phase 3: Advanced & Pro (Days 31–90)
      </div>
      <div style="font-size: 11px; color: var(--py-text-dim); margin-top: 4px;">
        Automation, Flask Web, APIs, Pandas & Real Projects unlocking soon!
      </div>
    `;
    container.appendChild(teaser);
  }
}

// ---------------- Navigate To Day ----------------
function navigateToDay(dayNum) {
  trackerState.activeDay = dayNum;
  saveTrackerState();
  renderSidebar(document.getElementById("pySearchInput")?.value || "");
  renderDay(dayNum);
  updateProgressUI();

  // Close mobile sidebar if open
  closeSidebar();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ---------------- Render Day Content & MCQs ----------------
function renderDay(dayNum) {
  const lesson = PYTHON_COURSE.find(d => d.day === dayNum);
  if (!lesson) return;

  const titleEl = document.getElementById("pyLessonTitle");
  const subEl = document.getElementById("pyLessonSubtitle");
  const badgeDayEl = document.getElementById("pyBadgeDay");
  const badgeTimeEl = document.getElementById("pyBadgeTime");
  const bodyEl = document.getElementById("pyArticleBody");
  const quizContainer = document.getElementById("pyQuizQuestions");
  const prevBtn = document.getElementById("pyBtnPrev");
  const nextBtn = document.getElementById("pyBtnNext");
  const completeBtn = document.getElementById("pyBtnComplete");

  if (titleEl) titleEl.textContent = `Day ${lesson.day}: ${lesson.topic}`;
  if (subEl) subEl.textContent = `${lesson.phase} Phase • Reel Curriculum by Skill Library`;
  if (badgeDayEl) badgeDayEl.textContent = `Day ${lesson.day} of 30`;
  if (badgeTimeEl) badgeTimeEl.textContent = `⏱️ ${lesson.readTime}`;
  if (bodyEl) bodyEl.innerHTML = lesson.contentHtml;

  // Render 5 Reel Breakdown Pills
  const reelGrid = document.getElementById("pyReelGrid");
  if (reelGrid) {
    reelGrid.innerHTML = `
      <span class="py-badge" style="background: rgba(16, 185, 129, 0.12); color: var(--py-emerald); border: 1px solid rgba(16, 185, 129, 0.3);">💡 Concept: ${lesson.concept}</span>
      <span class="py-badge" style="background: rgba(56, 189, 248, 0.12); color: var(--py-blue); border: 1px solid rgba(56, 189, 248, 0.3);">💻 Demo: ${lesson.demo}</span>
      <span class="py-badge" style="background: rgba(245, 158, 11, 0.12); color: var(--py-gold); border: 1px solid rgba(245, 158, 11, 0.3);">⚠️ Mistake: ${lesson.mistake}</span>
      <span class="py-badge" style="background: rgba(168, 85, 247, 0.12); color: var(--py-purple); border: 1px solid rgba(168, 85, 247, 0.3);">💼 Interview/Life: ${lesson.interview}</span>
      <span class="py-badge" style="background: rgba(239, 68, 68, 0.12); color: var(--py-red); border: 1px solid rgba(239, 68, 68, 0.3);">✍️ Quiz: ${lesson.quiz}</span>
    `;
  }

  // Previous & Next Day buttons
  if (prevBtn) {
    prevBtn.disabled = lesson.day <= 1;
    prevBtn.onclick = () => navigateToDay(lesson.day - 1);
  }
  if (nextBtn) {
    nextBtn.disabled = lesson.day >= 30;
    nextBtn.onclick = () => navigateToDay(lesson.day + 1);
  }

  // Complete button state
  const isCompleted = trackerState.completedDays.includes(lesson.day);
  if (completeBtn) {
    if (isCompleted) {
      completeBtn.innerHTML = `✅ Day ${lesson.day} Completed! Click to Revise`;
      completeBtn.classList.add("py-btn-completed");
    } else {
      completeBtn.innerHTML = `Mark Day ${lesson.day} Complete & Next 🚀`;
      completeBtn.classList.remove("py-btn-completed");
    }
    completeBtn.onclick = () => handleCompleteDay(lesson.day);
  }

  // Render MCQs
  renderMCQs(lesson);
}

// ---------------- Render MCQs ----------------
function renderMCQs(lesson) {
  const container = document.getElementById("pyQuizQuestions");
  const scoreBadge = document.getElementById("pyQuizScore");
  if (!container) return;
  container.innerHTML = "";

  const savedDayAnswers = trackerState.quizAnswers[`day-${lesson.day}`] || {};
  let totalScore = 0;
  const totalMCQs = lesson.mcqs.length;

  lesson.mcqs.forEach((mcq, qIdx) => {
    const card = document.createElement("div");
    card.className = "py-mcq-card";

    const savedAnswer = savedDayAnswers[qIdx];
    const hasAnswered = savedAnswer !== undefined;

    let optionsHtml = "";
    const letters = ["A", "B", "C", "D"];

    mcq.options.forEach((opt, optIdx) => {
      let stateClass = "";
      if (hasAnswered) {
        if (optIdx === mcq.correct) {
          stateClass = "correct";
        } else if (savedAnswer.chosen === optIdx && !savedAnswer.isCorrect) {
          stateClass = "wrong";
        }
      }

      optionsHtml += `
        <button 
          class="py-option-btn ${stateClass}" 
          ${hasAnswered ? "disabled" : ""} 
          onclick="handleAnswerMCQ(${lesson.day}, ${qIdx}, ${optIdx}, ${mcq.correct})"
        >
          <span class="py-option-key">${letters[optIdx]}</span>
          <span class="py-option-text">${opt}</span>
        </button>
      `;
    });

    if (hasAnswered && savedAnswer.isCorrect) totalScore++;

    card.innerHTML = `
      <div class="py-mcq-question">
        <span class="py-mcq-qnum">Q${qIdx + 1}.</span>
        <span>${mcq.q}</span>
      </div>
      <div class="py-mcq-options">
        ${optionsHtml}
      </div>
      <div class="py-mcq-explanation ${hasAnswered ? 'show' : ''}">
        <strong>💡 Explanation:</strong> ${mcq.explanation}
      </div>
    `;

    container.appendChild(card);
  });

  if (scoreBadge) {
    scoreBadge.textContent = `${totalScore} / ${totalMCQs} Score`;
  }
}

// ---------------- Handle MCQ Selection ----------------
function handleAnswerMCQ(dayNum, qIndex, selectedIndex, correctIndex) {
  const isCorrect = selectedIndex === correctIndex;
  const dayKey = `day-${dayNum}`;

  if (!trackerState.quizAnswers[dayKey]) {
    trackerState.quizAnswers[dayKey] = {};
  }

  trackerState.quizAnswers[dayKey][qIndex] = {
    chosen: selectedIndex,
    isCorrect: isCorrect
  };

  saveTrackerState();
  const lesson = PYTHON_COURSE.find(d => d.day === dayNum);
  if (lesson) renderMCQs(lesson);
}

// ---------------- Handle Complete Day ----------------
function handleCompleteDay(dayNum) {
  if (!trackerState.completedDays.includes(dayNum)) {
    trackerState.completedDays.push(dayNum);
    saveTrackerState();
  }

  updateProgressUI();
  renderSidebar(document.getElementById("pySearchInput")?.value || "");

  // If final day (Day 30), show certificate celebration
  if (dayNum === 30 || trackerState.completedDays.length === 30) {
    openCertificateModal();
  } else if (dayNum < 30) {
    navigateToDay(dayNum + 1);
  }
}

// ---------------- Update Progress UI ----------------
function updateProgressUI() {
  const count = trackerState.completedDays.length;
  const percent = Math.round((count / 30) * 100);

  const fillEl = document.getElementById("pyBarFill");
  const textEl = document.getElementById("pyProgressText");
  const streakEl = document.getElementById("pyStreakCount");

  if (fillEl) fillEl.style.width = `${percent}%`;
  if (textEl) textEl.innerHTML = `<strong>${percent}%</strong> (${count}/30 Days)`;
  if (streakEl) streakEl.textContent = trackerState.streak;

  // Mobile progress elements
  const mobileFill = document.getElementById("pyBarFillMobile");
  const mobileText = document.getElementById("pyMobileProgressText");
  const mobileStreak = document.getElementById("pyStreakCountMobile");

  if (mobileFill) mobileFill.style.width = `${percent}%`;
  if (mobileText) mobileText.textContent = `${percent}% Complete (${count}/30)`;
  if (mobileStreak) mobileStreak.textContent = trackerState.streak;
}

// ---------------- Certificate Modal ----------------
function openCertificateModal() {
  const modal = document.getElementById("pyCertModal");
  const nameInput = document.getElementById("pyStudentNameInput");
  const certNameDisplay = document.getElementById("pyCertStudentName");
  const certDateDisplay = document.getElementById("pyCertDate");

  if (nameInput) nameInput.value = trackerState.studentName || "Python Learner";
  if (certNameDisplay) certNameDisplay.textContent = trackerState.studentName || "Python Learner";
  if (certDateDisplay) certDateDisplay.textContent = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  if (modal) modal.classList.add("active");
}

function closeCertificateModal() {
  document.getElementById("pyCertModal")?.classList.remove("active");
}

function updateCertName(newName) {
  trackerState.studentName = newName.trim() || "Python Learner";
  saveTrackerState();
  const certNameDisplay = document.getElementById("pyCertStudentName");
  if (certNameDisplay) certNameDisplay.textContent = trackerState.studentName;
}

// ---------------- Copy Code Helper ----------------
function copyCode(btn) {
  const codeBlock = btn.closest(".py-code-block");
  if (!codeBlock) return;
  const pre = codeBlock.querySelector("pre");
  if (!pre) return;

  const textToCopy = pre.textContent;

  function onSuccess() {
    const originalText = btn.textContent;
    btn.textContent = "Copied! ✓";
    btn.style.borderColor = "var(--py-emerald)";
    btn.style.color = "var(--py-emerald)";
    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.borderColor = "";
      btn.style.color = "";
    }, 2000);
  }

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(textToCopy).then(onSuccess).catch(() => {
      fallbackCopyText(textToCopy, onSuccess);
    });
  } else {
    fallbackCopyText(textToCopy, onSuccess);
  }
}

function fallbackCopyText(text, callback) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.left = "-9999px";
  textArea.style.top = "0";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand("copy");
    if (callback) callback();
  } catch (e) {
    console.error("Fallback copy failed", e);
  }
  document.body.removeChild(textArea);
}

// ---------------- Reset Progress ----------------
function resetTrackerProgress() {
  if (confirm("Kya aap sach me apna sara Python 30-Day progress reset karna chahte hain?")) {
    trackerState = {
      activeDay: 1,
      completedDays: [],
      quizAnswers: {},
      streak: 1,
      lastVisit: new Date().toISOString().split("T")[0],
      studentName: "Python Learner"
    };
    saveTrackerState();
    renderSidebar();
    renderDay(1);
    updateProgressUI();
  }
}

// ---------------- Setup Event Listeners ----------------
function setupEventListeners() {
  const searchInput = document.getElementById("pySearchInput");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      renderSidebar(e.target.value);
    });
  }

  const menuToggle = document.getElementById("pyMenuToggle");
  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      toggleSidebar();
    });
  }
  
  // Close sidebar on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeSidebar();
  });
  
  // Handle swipe gestures for sidebar
  let touchStartX = 0;
  let touchEndX = 0;
  
  document.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  
  document.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const swipeDistance = touchEndX - touchStartX;
    
    // Swipe right from left edge → open sidebar
    if (swipeDistance > 80 && touchStartX < 40) {
      openSidebar();
    }
    // Swipe left → close sidebar
    if (swipeDistance < -80) {
      closeSidebar();
    }
  }, { passive: true });
}

function toggleSidebar() {
  const sidebar = document.getElementById("pySidebar");
  const overlay = document.getElementById("pySidebarOverlay");
  if (!sidebar) return;
  
  const isOpen = sidebar.classList.contains("open");
  if (isOpen) {
    closeSidebar();
  } else {
    openSidebar();
  }
}

function openSidebar() {
  const sidebar = document.getElementById("pySidebar");
  const overlay = document.getElementById("pySidebarOverlay");
  if (sidebar) sidebar.classList.add("open");
  if (overlay) overlay.classList.add("active");
  document.body.classList.add("nav-open");
}

function closeSidebar() {
  const sidebar = document.getElementById("pySidebar");
  const overlay = document.getElementById("pySidebarOverlay");
  if (sidebar) sidebar.classList.remove("open");
  if (overlay) overlay.classList.remove("active");
  document.body.classList.remove("nav-open");
}
