// products/astrology/astrology.js

document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  setupFAQ();
  setupScrollLinks();
});

function renderProducts() {
  const grid = document.getElementById('astro-hindi-grid');
  if (!grid || !window.ASTROLOGY_PRODUCTS) return;
  
  // Filter individual Hindi products (price 99)
  const hindiBooks = window.ASTROLOGY_PRODUCTS.filter(p => p.language === 'Hindi' && p.price === 99);
  
  grid.innerHTML = hindiBooks.map(book => `
    <div class="astro-card">
      <div class="astro-card-image">
        <img src="${book.coverImage}" alt="Astrology books in Hindi - ${book.titleHindi}" loading="lazy">
      </div>
      <div class="astro-card-content">
        <span class="astro-badge">हिंदी</span>
        <h3 class="astro-card-title">${book.titleHindi}</h3>
        <p class="astro-card-desc">${book.description}</p>
        <div class="astro-card-footer">
          <span class="astro-card-price">₹${book.price}</span>
          <button class="astro-card-btn" onclick="alert('This is a preview. Payment links will be added soon!')">Book देखें</button>
        </div>
      </div>
    </div>
  `).join('');
}

function setupFAQ() {
  const faqItems = document.querySelectorAll('.astro-faq-item');
  faqItems.forEach(item => {
    const q = item.querySelector('.astro-faq-q');
    q.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

function setupScrollLinks() {
  const scrollLinks = document.querySelectorAll('a[href^="#"]');
  scrollLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}
