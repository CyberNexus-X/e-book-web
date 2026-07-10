/* ==========================================================================
   Skill Library - Interactive Features JavaScript
   ========================================================================== */

// 1. Simulated Book Database (Real, premium titles from the cover bundles)
const bookDatabase = [
  // Business & Sales
  { title: "Zero to One", author: "Peter Thiel", category: "Business & Sales" },
  { title: "The 10X Rule", author: "Grant Cardone", category: "Business & Sales" },
  { title: "Sell or Be Sold", author: "Grant Cardone", category: "Business & Sales" },
  { title: "Sell Like Crazy", author: "Sabri Suby", category: "Business & Sales" },
  { title: "The Sales Bible", author: "Jeffrey Gitomer", category: "Business & Sales" },
  { title: "Blue Ocean Strategy", author: "W. Chan Kim", category: "Business & Sales" },
  { title: "The Millionaire Fastlane", author: "MJ DeMarco", category: "Business & Sales" },
  { title: "Rich Dad's Cashflow Quadrant", author: "Robert T. Kiyosaki", category: "Business & Sales" },
  { title: "Built to Last", author: "Jim Collins", category: "Business & Sales" },
  { title: "Money Magnet", author: "Tony Robbins", category: "Business & Sales" },
  { title: "How to Sell Without Selling", author: "Harry Beckwith", category: "Business & Sales" },
  
  // Hindi Biography
  { title: "एपीजे अब्दुल कलाम (अग्नि की उड़ान)", author: "डॉ. ए.पी.जे. अब्दुल कलाम", category: "हिंदी बायोग्राफी संग्रह" },
  { title: "स्टीव जॉब्स", author: "वॉल्टर आइजैकसन", category: "हिंदी बायोग्राफी संग्रह" },
  { title: "रतन टाटा", author: "थॉमस मैथ्यू", category: "हिंदी बायोग्राफी संग्रह" },
  { title: "धीरूभाई अंबानी", author: "रचना बिना", category: "हिंदी बायोग्राफी संग्रह" },
  { title: "भगत सिंह - क्रांति की लौ", author: "बी. आर. नंदा", category: "हिंदी बायोग्राफी संग्रह" },
  { title: "सद्गुरु - एक योगी, एक दृष्टि", author: "सद्गुरु जग्गी वासुदेव", category: "हिंदी बायोग्राफी संग्रह" },
  { title: "रॉबिन शर्मा बायोग्राफी", author: "रॉबिन शर्मा", category: "हिंदी बायोग्राफी संग्रह" },
  { title: "चाणक्य नीति", author: "आचार्य चाणक्य", category: "हिंदी बायोग्राफी संग्रह" },
  { title: "मैं नास्तिक क्यों हूँ?", author: "भगत सिंह", category: "हिंदी बायोग्राफी संग्रह" },
  
  // Hindi Business
  { title: "रिच डैड पुअर डैड (Hindi)", author: "रबर्ट टी. कियोसाकी", category: "हिंदी बिजनेस संग्रह" },
  { title: "शेयर मार्केट गाइड", author: "सुधांशु गुप्ता", category: "हिंदी बिजनेस संग्रह" },
  { title: "चाणक्य नेतृत्व के रहस्य", author: "राधाकृष्णन पिल्लई", category: "हिंदी बिजनेस संग्रह" },
  { title: "बिज़नेस स्कूल", author: "रॉबर्ट टी. कियोसाकी", category: "हिंदी बिजनेस संग्रह" },
  { title: "सोचिये और अमीर बनिए", author: "नेपोलियन हिल", category: "हिंदी बिजनेस संग्रह" },
  { title: "सबसे अमीर आदमी बेबीलोन का", author: "जॉर्ज एस क्लैसन", category: "हिंदी बिजनेस संग्रह" },

  // Hindi Self Help
  { title: "आपके अवचेतन मन की शक्ति", author: "डॉ. जोसेफ मर्फी", category: "हिंदी सेल्फ हेल्प" },
  { title: "बॉडी लैंग्वेज", author: "एलन पीज", category: "हिंदी सेल्फ हेल्प" },
  { title: "हर दिन 24 घंटे कैसे जिएं", author: "अर्नोल्ड बेनेट", category: "हिंदी सेल्फ हेल्प" },
  { title: "सोच बदलो जिंदगी बदलो", author: "डॉ. जोसेफ मर्फी", category: "हिंदी सेल्फ हेल्प" },
  { title: "माइंडसेट", author: "कैरल एस. डवेक", category: "हिंदी सेल्फ हेल्प" },
  { title: "माइंड मैनेजमेंट", author: "स्वामी मुकुंदानंद", category: "हिंदी सेल्फ हेल्प" },
  { title: "सफलता Unlimited", author: "डॉ. उल्लास धनकरे", category: "हिंदी सेल्फ हेल्प" },
  { title: "लक्ष्य!", author: "ब्रायन ट्रेसी", category: "हिंदी सेल्फ हेल्प" },
  { title: "जीत आपकी", author: "शिव खेड़ा", category: "हिंदी सेल्फ हेल्प" },
  { title: "स्मार्ट बनिए", author: "ब्रायन ट्रेसी", category: "हिंदी सेल्फ हेल्प" },
  { title: "24 घंटे में जिंदगी बदलें", author: "डॉ. जोसेफ मर्फी", category: "हिंदी सेल्फ हेल्प" },
  { title: "मैं कौन हूँ?", author: "ओशो", category: "हिंदी सेल्फ हेल्प" },
  { title: "धन को आकर्षित कैसे करें", author: "जो डिस्पेन्ज़ा", category: "हिंदी सेल्फ हेल्प" },
  { title: "5 AM क्लब", author: "रॉबिन शर्मा", category: "हिंदी सेल्फ हेल्प" },
  { title: "द पावर ऑफ हैबिट", author: "चार्ल्स डुहिंग", category: "हिंदी सेल्फ हेल्प" },
  { title: "80/20 प्रिंसिपल", author: "रिचर्ड कोच", category: "हिंदी सेल्फ हेल्प" },

  // Philosophy & Spiritual
  { title: "Ikigai: The Japanese Secret", author: "Héctor García", category: "Philosophy & Spiritual" },
  { title: "The Power of Now", author: "Eckhart Tolle", category: "Philosophy & Spiritual" },
  { title: "Ego is the Enemy", author: "Ryan Holiday", category: "Philosophy & Spiritual" },
  { title: "Man's Search for Meaning", author: "Viktor E. Frankl", category: "Philosophy & Spiritual" },
  { title: "Awaken the Giant Within", author: "Tony Robbins", category: "Philosophy & Spiritual" },
  { title: "Think and Grow Rich", author: "Napoleon Hill", category: "Philosophy & Spiritual" },
  { title: "The Richest Man in Babylon", author: "George S. Clason", category: "Philosophy & Spiritual" },
  { title: "The Miracle Morning", author: "Hal Elrod", category: "Philosophy & Spiritual" },
  
  // Productivity & Habits
  { title: "Atomic Habits", author: "James Clear", category: "Productivity & Habits" },
  { title: "Deep Work", author: "Cal Newport", category: "Productivity & Habits" },
  { title: "Hyperfocus", author: "Chris Bailey", category: "Productivity & Habits" },
  { title: "Finish What You Start", author: "Peter Hollins", category: "Productivity & Habits" },
  { title: "High Performance Habits", author: "Brendon Burchard", category: "Productivity & Habits" },
  { title: "The One Thing", author: "Gary Keller", category: "Productivity & Habits" },
  { title: "365 Days with Self-Discipline", author: "Martin Meadows", category: "Productivity & Habits" },
  { title: "Stop Talking, Start Doing", author: "Brian Tracy", category: "Productivity & Habits" },
  { title: "Can't Hurt Me", author: "David Goggins", category: "Productivity & Habits" }
];

// Spines details for Shelf Rendering (categorized color presets)
const categoryColors = {
  "Business & Sales": "#8a3b2e",          // Deep Terracotta
  "हिंदी बायोग्राफी संग्रह": "#2f3b2f",    // Sage Forest
  "हिंदी बिजनेस संग्रह": "#1f2a3d",        // Navy
  "हिंदी सेल्फ हेल्प": "#7a4a1e",          // Amber Brown
  "Leadership & Communication": "#3a2f1a", // Dark Bronze
  "Mindset & Psychology": "#3f2f2b",      // Coffee Espresso
  "Money & Investing": "#2b3a2e",         // Pine Green
  "Philosophy & Spiritual": "#4a3b1e",    // Ochre Gold
  "Productivity & Habits": "#1e2a1e"      // Deep Emerald
};

// 2. Initial Setup when DOM loads
document.addEventListener("DOMContentLoaded", () => {
  renderBookshelfSpines();
  setupSearchEngine();
  setupFAQAccordion();
  setupCountdownTimer();
  startPurchaseToasts();
});

// 3. Render Bookshelf Spines Dynamically
function renderBookshelfSpines() {
  const shelfBooks = document.getElementById("shelfBooks");
  if (!shelfBooks) return;

  // Curate a subset of books to show on the bookshelf
  const shelfTitles = [
    { title: "Atomic Habits", cat: "Productivity & Habits" },
    { title: "अग्नि की उड़ान", cat: "हिंदी बायोग्राफी संग्रह" },
    { title: "Zero to One", cat: "Business & Sales" },
    { title: "अवचेतन मन की शक्ति", cat: "हिंदी सेल्फ हेल्प" },
    { title: "The Power of Now", cat: "Philosophy & Spiritual" },
    { title: "रिच डैड पुअर डैड", cat: "हिंदी बिजनेस संग्रह" },
    { title: "Deep Work", cat: "Productivity & Habits" },
    { title: "रतन टाटा जीवनी", cat: "हिंदी बायोग्राफी संग्रह" },
    { title: "The Secret", cat: "Mindset & Psychology" },
    { title: "बॉडी लैंग्वेज", cat: "हिंदी सेल्फ हेल्प" },
    { title: "Psychology of Money", cat: "Mindset & Psychology" },
    { title: "चाणक्य नीति", cat: "हिंदी बायोग्राफी संग्रह" },
    { title: "Hyperfocus", cat: "Productivity & Habits" },
    { title: "Think & Grow Rich", cat: "Philosophy & Spiritual" },
    { title: "जीत आपकी", cat: "हिंदी सेल्फ हेल्प" }
  ];

  shelfTitles.forEach((item) => {
    const spineWrapper = document.createElement("div");
    spineWrapper.className = "spine-wrapper";

    const spine = document.createElement("div");
    spine.className = "spine";
    spine.style.backgroundColor = categoryColors[item.cat] || "#2d3748";
    spine.textContent = item.title;
    
    // Add clickable functionality to show search results for that book
    spine.addEventListener("click", () => {
      const searchInput = document.getElementById("bookSearchInput");
      if (searchInput) {
        searchInput.value = item.title;
        // Trigger input event to run search
        searchInput.dispatchEvent(new Event("input"));
        searchInput.focus();
        // Scroll to search section
        document.getElementById("search-demo").scrollIntoView({ behavior: "smooth" });
      }
    });

    spineWrapper.appendChild(spine);
    shelfBooks.appendChild(spineWrapper);
  });
}

// 4. Live Search Engine Functionality
function setupSearchEngine() {
  const searchInput = document.getElementById("bookSearchInput");
  const resultsContainer = document.getElementById("searchResults");
  const tagButtons = document.querySelectorAll(".search-tag-btn");

  if (!searchInput || !resultsContainer) return;

  const performSearch = (query) => {
    resultsContainer.innerHTML = "";
    const cleanQuery = query.toLowerCase().trim();

    if (cleanQuery.length === 0) {
      // Show default placeholder state
      resultsContainer.innerHTML = `
        <div class="search-placeholder">
          <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <p>Type above to instantly search <strong>12,000+</strong> eBooks inside our database...</p>
        </div>
      `;
      return;
    }

    // Filter books matching Title, Author, or Category
    const matches = bookDatabase.filter((book) => {
      return (
        book.title.toLowerCase().includes(cleanQuery) ||
        book.author.toLowerCase().includes(cleanQuery) ||
        book.category.toLowerCase().includes(cleanQuery)
      );
    });

    if (matches.length === 0) {
      resultsContainer.innerHTML = `
        <div class="search-placeholder">
          <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
          <p>No direct matches found. However, we have <strong>12,000+ files</strong> in our full Google Drive bundle! This title is highly likely included.</p>
        </div>
      `;
      return;
    }

    // Render results cards
    matches.forEach((book) => {
      const card = document.createElement("div");
      card.className = "book-row-card";
      card.innerHTML = `
        <div class="book-row-icon">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </svg>
        </div>
        <div class="book-row-info">
          <div class="book-row-title">${book.title}</div>
          <div class="book-row-author">by ${book.author}</div>
        </div>
        <div class="book-row-cat">${book.category}</div>
      `;
      resultsContainer.appendChild(card);
    });
  };

  // Listen to inputs
  searchInput.addEventListener("input", (e) => performSearch(e.target.value));

  // Connect quick search tags
  tagButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const searchTerm = btn.getAttribute("data-search");
      searchInput.value = searchTerm;
      performSearch(searchTerm);
      searchInput.focus();
    });
  });

  // Load initial placeholder state
  performSearch("");
}

// 5. Smooth FAQ Accordion
function setupFAQAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const header = item.querySelector(".faq-header");
    const body = item.querySelector(".faq-body");

    header.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // Close all other FAQ items
      faqItems.forEach((otherItem) => {
        otherItem.classList.remove("active");
        otherItem.querySelector(".faq-body").style.maxHeight = null;
      });

      // Toggle current item
      if (!isActive) {
        item.classList.add("active");
        body.style.maxHeight = body.scrollHeight + "px";
      }
    });
  });
}

// 6. Urgency Countdown Timer (Ends in 2 Hours 14 Minutes, resets on finish)
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

  updateTimer();
  setInterval(updateTimer, 1000);
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
  window.location.href = "https://superprofile.bio/vp/10000-e-book-bundle";
}
