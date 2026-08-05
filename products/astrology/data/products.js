const ASTROLOGY_PRODUCTS = [
  {
    id: 'astrology-bundle-199',
    slug: 'complete-astrology-collection',
    titleHindi: 'Complete Astrology eBook Collection',
    titleEnglish: 'Hindi + English',
    language: 'Hindi & English',
    description: 'जटिल ज्योतिषीय विषयों को आसान और व्यवस्थित हिंदी में समझने के लिए तैयार की गई हमारी Astrology eBook Collection।',
    price: 199,
    coverImage: 'books/astrology-basics.webp', // We will use a mockup in the hero instead, but this acts as a fallback
    checkoutUrl: null,
    featured: true,
    bundleIncluded: true
  },
  {
    id: 'astrology-basics',
    slug: 'astrology-basics',
    titleHindi: 'ज्योतिष की बुनियाद',
    titleEnglish: 'Astrology Basics',
    language: 'Hindi',
    description: 'ज्योतिष के मूल सिद्धांतों को आसान भाषा में समझें।',
    price: 99,
    coverImage: 'books/astrology-basics.webp',
    checkoutUrl: null,
    featured: false,
    bundleIncluded: true
  },
  {
    id: 'zodiac-signs',
    slug: 'zodiac-signs',
    titleHindi: '12 राशियाँ',
    titleEnglish: '12 Zodiac Signs',
    language: 'Hindi',
    description: 'सभी 12 राशियों के स्वभाव, विशेषताएं और भविष्यफल।',
    price: 99,
    coverImage: 'books/zodiac-signs.webp',
    checkoutUrl: null,
    featured: false,
    bundleIncluded: true
  },
  {
    id: 'planet-guide',
    slug: 'planet-guide',
    titleHindi: 'नवग्रह विज्ञान',
    titleEnglish: 'Planet Guide',
    language: 'Hindi',
    description: 'नवग्रहों का हमारे जीवन पर प्रभाव और उनके रहस्य।',
    price: 99,
    coverImage: 'books/planet-guide.webp',
    checkoutUrl: null,
    featured: false,
    bundleIncluded: true
  },
  {
    id: 'kundli-basics',
    slug: 'kundli-basics',
    titleHindi: 'कुंडली कैसे देखें',
    titleEnglish: 'Kundli Basics',
    language: 'Hindi',
    description: 'जन्म कुंडली पढ़ने और समझने का सरल तरीका।',
    price: 99,
    coverImage: 'books/kundli-basics.webp',
    checkoutUrl: null,
    featured: false,
    bundleIncluded: true
  },
  {
    id: 'numerology',
    slug: 'numerology',
    titleHindi: 'अंक ज्योतिष',
    titleEnglish: 'Numerology',
    language: 'Hindi',
    description: 'अंकों के रहस्य और उनका आपके भाग्य पर प्रभाव।',
    price: 99,
    coverImage: 'books/numerology.webp',
    checkoutUrl: null,
    featured: false,
    bundleIncluded: true
  },
  {
    id: 'palmistry',
    slug: 'palmistry',
    titleHindi: 'हस्तरेखा विज्ञान',
    titleEnglish: 'Palmistry',
    language: 'Hindi',
    description: 'हाथ की रेखाओं को पढ़ने और भविष्य जानने की कला।',
    price: 99,
    coverImage: 'books/palmistry.webp',
    checkoutUrl: null,
    featured: false,
    bundleIncluded: true
  },
  {
    id: 'lal-kitab',
    slug: 'lal-kitab',
    titleHindi: 'लाल किताब के अचूक उपाय',
    titleEnglish: 'Lal Kitab',
    language: 'Hindi',
    description: 'दैनिक जीवन की समस्याओं के लिए लाल किताब के सरल उपाय।',
    price: 99,
    coverImage: 'books/lal-kitab.webp',
    checkoutUrl: null,
    featured: false,
    bundleIncluded: true
  },
  {
    id: 'gemstone-guide',
    slug: 'gemstone-guide',
    titleHindi: 'रत्न विज्ञान',
    titleEnglish: 'Gemstone Guide',
    language: 'Hindi',
    description: 'सही रत्न का चुनाव और उसके चमत्कारी लाभ।',
    price: 99,
    coverImage: 'books/gemstone-guide.webp',
    checkoutUrl: null,
    featured: false,
    bundleIncluded: true
  },
  {
    id: 'mantras',
    slug: 'mantras',
    titleHindi: 'शक्तिशाली मंत्र',
    titleEnglish: 'Mantras',
    language: 'Hindi',
    description: 'विभिन्न समस्याओं के समाधान के लिए सिद्ध मंत्र।',
    price: 99,
    coverImage: 'books/mantras.webp',
    checkoutUrl: null,
    featured: false,
    bundleIncluded: true
  },
  {
    id: 'horoscope-guide',
    slug: 'horoscope-guide',
    titleHindi: 'दैनिक राशिफल',
    titleEnglish: 'Horoscope Guide',
    language: 'Hindi',
    description: 'अपना राशिफल कैसे निकालें और समझें।',
    price: 99,
    coverImage: 'books/horoscope-guide.webp',
    checkoutUrl: null,
    featured: false,
    bundleIncluded: true
  }
];

if (typeof window !== 'undefined') {
  window.ASTROLOGY_PRODUCTS = ASTROLOGY_PRODUCTS;
}
