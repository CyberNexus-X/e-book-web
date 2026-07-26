document.addEventListener("DOMContentLoaded", () => {
  // Navbar Mobile Toggle Elements
  const hamburger = document.getElementById("navHamburger");
  const mobileMenu = document.getElementById("navMobileMenu");
  const overlay = document.getElementById("navOverlay");

  function closeMenu(restoreFocus = false) {
    if (hamburger) {
      hamburger.classList.remove("active");
      hamburger.setAttribute("aria-expanded", "false");
      if (restoreFocus) {
        hamburger.focus();
      }
    }
    if (mobileMenu) mobileMenu.classList.remove("active");
    if (overlay) overlay.classList.remove("active");
    document.body.style.overflow = "";
    document.body.classList.remove("nav-open");
  }

  function openMenu() {
    if (hamburger) {
      hamburger.classList.add("active");
      hamburger.setAttribute("aria-expanded", "true");
    }
    if (mobileMenu) mobileMenu.classList.add("active");
    if (overlay) overlay.classList.add("active");
    document.body.style.overflow = "hidden";
    document.body.classList.add("nav-open");

    if (mobileMenu) {
      const firstLink = mobileMenu.querySelector("a, button");
      if (firstLink) firstLink.focus();
    }
  }

  function toggleMenu() {
    const isActive = hamburger && hamburger.classList.contains("active");
    if (isActive) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  if (hamburger) {
    hamburger.addEventListener("click", toggleMenu);
  }
  if (overlay) {
    overlay.addEventListener("click", () => closeMenu());
  }

  // Close mobile menu when tapping any link inside mobile drawer
  if (mobileMenu) {
    const menuLinks = mobileMenu.querySelectorAll("a, button");
    menuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        closeMenu();
      });
    });
  }

  // Close mobile menu with Escape key on keyboard
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileMenu && mobileMenu.classList.contains("active")) {
      closeMenu(true);
    }
  });

  // Active link highlighter
  const currentPath = window.location.pathname.toLowerCase();
  const allNavLinks = document.querySelectorAll(".nav-desktop-link, .nav-mobile-link");

  allNavLinks.forEach((link) => {
    link.classList.remove("active");
    const href = link.getAttribute("href");
    if (!href) return;
    const lowerHref = href.toLowerCase().replace(/^\.\//, "").replace(/^\.\.\//, "");

    // Check matching routes
    if (
      (currentPath.endsWith("/height-blueprint/") || currentPath.includes("height-blueprint")) &&
      (lowerHref.includes("height-blueprint") || lowerHref === "" || lowerHref === "index.html")
    ) {
      if (currentPath.includes("height-blueprint") && (lowerHref.includes("height-blueprint") || lowerHref === "index.html" && href.includes("height-blueprint"))) {
        link.classList.add("active");
      }
    } else if (
      currentPath.includes("ebook-bundle") &&
      lowerHref.includes("ebook-bundle")
    ) {
      link.classList.add("active");
    } else if (
      currentPath.includes("about") &&
      lowerHref.includes("about")
    ) {
      link.classList.add("active");
    } else if (
      currentPath.includes("contact") &&
      lowerHref.includes("contact")
    ) {
      link.classList.add("active");
    } else if (
      currentPath.includes("privacy-policy") &&
      lowerHref.includes("privacy-policy")
    ) {
      link.classList.add("active");
    } else if (
      currentPath.includes("terms") &&
      lowerHref.includes("terms")
    ) {
      link.classList.add("active");
    } else if (
      currentPath.includes("refund-policy") &&
      lowerHref.includes("refund-policy")
    ) {
      link.classList.add("active");
    } else if (
      (currentPath.endsWith("/") || currentPath.endsWith("index.html")) &&
      !currentPath.includes("height-blueprint") &&
      (lowerHref === "index.html" || lowerHref === "" || lowerHref === "/")
    ) {
      link.classList.add("active");
    }
  });
});
