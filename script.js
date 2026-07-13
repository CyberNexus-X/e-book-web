/* ==========================================================================
   Skill Library - Interactive Features JavaScript
   ========================================================================== */

// 1. Initial Setup when DOM loads
document.addEventListener("DOMContentLoaded", () => {
  setupFAQAccordion();
  setupCountdownTimer();
  startPurchaseToasts();
});

// 2. Smooth FAQ Accordion (with Accessibility updates)
function setupFAQAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const header = item.querySelector(".faq-header");
    const body = item.querySelector(".faq-body");

    if (!header || !body) return;

    header.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // Close all other FAQ items
      faqItems.forEach((otherItem) => {
        otherItem.classList.remove("active");
        const otherBody = otherItem.querySelector(".faq-body");
        const otherHeader = otherItem.querySelector(".faq-header");
        if (otherBody) otherBody.style.maxHeight = null;
        if (otherHeader) otherHeader.setAttribute("aria-expanded", "false");
      });

      // Toggle current item
      if (!isActive) {
        item.classList.add("active");
        body.style.maxHeight = body.scrollHeight + "px";
        header.setAttribute("aria-expanded", "true");
      } else {
        header.setAttribute("aria-expanded", "false");
      }
    });
  });
}

// 6. Urgency Countdown Timer (Ends in 2 Hours 14 Minutes, resets on finish)
// Optimized: Pauses when tab is hidden to reduce CPU usage
function setupCountdownTimer() {
  const timerElements = document.querySelectorAll(".timer-countdown");
  if (timerElements.length === 0) return;

  const storageKey = "skill_library_timer_end";
  let targetTime = localStorage.getItem(storageKey);

  // If no timer exists, or it has expired in the past, set a new one for 2h 14m in the future
  const now = new Date().getTime();
  const duration = (2 * 60 + 14) * 60 * 1000; // 2h 14m in milliseconds

  if (!targetTime || parseInt(targetTime) < now) {
    targetTime = now + duration;
    localStorage.setItem(storageKey, targetTime);
  } else {
    targetTime = parseInt(targetTime);
  }

  let timerInterval = null;

  const updateTimer = () => {
    const currentTime = new Date().getTime();
    let diff = targetTime - currentTime;

    if (diff <= 0) {
      // Reset timer if finished
      targetTime = currentTime + duration;
      localStorage.setItem(storageKey, targetTime);
      diff = duration;
    }

    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const formattedTime = `${String(hours).padStart(2, "0")}h : ${String(minutes).padStart(2, "0")}m : ${String(seconds).padStart(2, "0")}s`;

    timerElements.forEach((el) => {
      el.textContent = formattedTime;
    });
  };

  const startTimer = () => {
    if (!timerInterval) {
      updateTimer();
      timerInterval = setInterval(updateTimer, 1000);
    }
  };

  const stopTimer = () => {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  };

  // Start immediately
  startTimer();

  // Pause timer when tab is hidden, resume when visible (reduces CPU on mobile)
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopTimer();
    } else {
      startTimer();
    }
  });
}

// 7. Simulated Live Purchase Toast Notifications (Social Proof)
function startPurchaseToasts() {
  const toast = document.getElementById("purchaseToast");
  const nameEl = document.getElementById("toastName");
  const cityEl = document.getElementById("toastCity");
  
  if (!toast || !nameEl || !cityEl) return;

  const buyers = [
    { name: "Rahul", city: "Delhi" },
    { name: "Sneha", city: "Mumbai" },
    { name: "Amit", city: "Bangalore" },
    { name: "Priya", city: "Pune" },
    { name: "Vikram", city: "Hyderabad" },
    { name: "Anjali", city: "Jaipur" },
    { name: "Rohan", city: "Ahmedabad" },
    { name: "Neha", city: "Kolkata" },
    { name: "Deepak", city: "Lucknow" },
    { name: "Shalini", city: "Indore" },
    { name: "Kunal", city: "Nagpur" },
    { name: "Pooja", city: "Chandigarh" },
    { name: "Suresh", city: "Chennai" },
    { name: "Meera", city: "Surat" },
    { name: "Abhishek", city: "Patna" }
  ];

  const showToast = () => {
    // Don't show toasts when tab is hidden
    if (document.hidden) return;

    // Pick a random buyer
    const buyer = buyers[Math.floor(Math.random() * buyers.length)];
    
    // Set content
    nameEl.textContent = buyer.name;
    cityEl.textContent = buyer.city;

    // Show toast
    toast.classList.add("show");

    // Hide toast after 6 seconds
    setTimeout(() => {
      toast.classList.remove("show");
    }, 6000);
  };

  // Initial delay before first toast, then run periodically
  setTimeout(showToast, 8000);
  
  // Show a toast every 22 to 35 seconds randomly
  const triggerNext = () => {
    const delay = Math.floor(Math.random() * (35000 - 22000)) + 22000;
    setTimeout(() => {
      showToast();
      triggerNext();
    }, delay);
  };

  triggerNext();
}

// 8. Dynamic Checkout Redirection Handler
function goToCheckout(event) {
  if (event) event.preventDefault();
  window.location.href = "https://superprofile.bio/vp/6a4bfe807b38a6001304753d";
}
