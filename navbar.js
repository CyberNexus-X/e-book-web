document.addEventListener("DOMContentLoaded", () => {
  // Navbar Mobile Toggle
  const hamburger = document.getElementById("navHamburger");
  const mobileMenu = document.getElementById("navMobileMenu");
  const overlay = document.getElementById("navOverlay");

  function toggleMenu() {
    const isActive = hamburger.classList.contains("active");
    if (isActive) {
      hamburger.classList.remove("active");
      mobileMenu.classList.remove("active");
      overlay.classList.remove("active");
      hamburger.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    } else {
      hamburger.classList.add("active");
      mobileMenu.classList.add("active");
      overlay.classList.add("active");
      hamburger.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
    }
  }

  if (hamburger && mobileMenu && overlay) {
    hamburger.addEventListener("click", toggleMenu);
    overlay.addEventListener("click", toggleMenu);
  }
});
