/**
 * Minimal client-side i18n for the EN/HI toggle in the navbar.
 *
 * The server renders English by default (best for SEO). On load the script
 * swaps any element carrying a `data-i18n` key to the chosen language and
 * remembers the choice in localStorage. Keys missing from the Hindi
 * dictionary gracefully fall back to English.
 */

export type Lang = 'en' | 'hi';

export const LANGS: { id: Lang; label: string; long: string }[] = [
  { id: 'en', label: 'EN', long: 'English' },
  { id: 'hi', label: 'हि', long: 'हिन्दी' },
];

type Dict = Record<string, { en: string; hi?: string }>;

/** Every translatable string on the site lives here. */
export const strings: Dict = {
  /* ---------- Navigation ---------- */
  'nav.home': { en: 'Home', hi: 'होम' },
  'nav.jobs': { en: 'Jobs', hi: 'नौकरी' },
  'nav.categories': { en: 'Categories', hi: 'श्रेणियाँ' },
  'nav.locations': { en: 'Locations', hi: 'स्थान' },
  'nav.employers': { en: 'Employers', hi: 'नियोक्ता' },
  'nav.about': { en: 'About', hi: 'हमारे बारे में' },
  'nav.forEmployers': { en: 'For Employers', hi: 'नियोक्ताओं के लिए' },
  'nav.postJob': { en: 'Post a Job', hi: 'नौकरी पोस्ट करें' },

  /* ---------- Hero ---------- */
  'hero.kicker': { en: 'Verified Jobs Across India & Abroad', hi: 'भारत और विदेशों में सत्यापित नौकरियाँ' },
  'hero.title': {
    en: 'Land Verified Jobs in India, Dubai, Uzbekistan & Beyond',
    hi: 'भारत, दुबई, उज़्बेकिस्तान और दुनिया भर में सत्यापित नौकरी पाएँ',
  },
  'hero.subtitle': {
    en: '100% verified employers, direct HR contact and visa support — with zero hidden agent fees. Apka Career, Ab Global.',
    hi: '100% सत्यापित नियोक्ता, सीधे HR से संपर्क और वीज़ा सहायता — बिना किसी छिपी फीस के। आपका करियर, अब ग्लोबल।',
  },
  'hero.searchPlaceholder': { en: 'Job title or skill…', hi: 'नौकरी का शीर्षक या कौशल…' },
  'hero.locationLabel': { en: 'Location', hi: 'स्थान' },
  'hero.locationAll': { en: 'All India', hi: 'पूरा भारत' },
  'hero.searchBtn': { en: 'Search Jobs', hi: 'नौकरी खोजें' },
  'hero.popular': { en: 'Popular:', hi: 'लोकप्रिय:' },

  /* ---------- Category chips ---------- */
  'chip.all': { en: 'All Jobs', hi: 'सभी नौकरियाँ' },
  'chip.it': { en: 'IT & Software', hi: 'आईटी और सॉफ़्टवेयर' },
  'chip.construction': { en: 'Construction & Engineering', hi: 'निर्माण और इंजीनियरिंग' },
  'chip.hospitality': { en: 'Hospitality & Hotel', hi: 'हॉस्पिटैलिटी और होटल' },
  'chip.healthcare': { en: 'Healthcare & Nursing', hi: 'हेल्थकेयर और नर्सिंग' },
  'chip.drivers': { en: 'Drivers & Logistics', hi: 'ड्राइवर और लॉजिस्टिक्स' },
  'chip.trades': { en: 'Skilled Trades', hi: 'स्किल्ड ट्रेड्स' },
  'chip.wfh': { en: 'Work From Home', hi: 'घर से काम' },

  /* ---------- Trust strip ---------- */
  'trust.jobs': { en: '15,000+ Active Jobs', hi: '15,000+ सक्रिय नौकरियाँ' },
  'trust.jobsSub': { en: 'Updated every day', hi: 'हर दिन अपडेट' },
  'trust.verified': { en: '100% Verified Employers', hi: '100% सत्यापित नियोक्ता' },
  'trust.verifiedSub': { en: 'Trade licence checked', hi: 'लाइसेंस की जाँच की गई' },
  'trust.visa': { en: 'Visa & Relocation Support', hi: 'वीज़ा और रिलोकेशन सहायता' },
  'trust.visaSub': { en: 'Flights, permit & paperwork', hi: 'फ्लाइट, परमिट और कागज़ी काम' },
  'trust.hr': { en: 'Direct HR Contact', hi: 'सीधा HR संपर्क' },
  'trust.hrSub': { en: 'WhatsApp the hiring manager', hi: 'हायरिंग मैनेजर से WhatsApp करें' },

  /* ---------- Sections ---------- */
  'section.featuredKicker': { en: 'Hand-picked openings', hi: 'चुनिंदा मौके' },
  'section.featuredTitle': { en: 'Featured Jobs This Week', hi: 'इस सप्ताह की फ़ीचर्ड नौकरियाँ' },
  'section.featuredSub': {
    en: '3 roles in India and 3 international roles with visa sponsorship — every employer verified.',
    hi: 'भारत में 3 और वीज़ा स्पॉन्सरशिप के साथ 3 अंतरराष्ट्रीय नौकरियाँ — हर नियोक्ता सत्यापित।',
  },
  'section.viewAll': { en: 'View all jobs', hi: 'सभी नौकरियाँ देखें' },
  'section.howKicker': { en: 'Simple & transparent', hi: 'सरल और पारदर्शी' },
  'section.howTitle': { en: 'How It Works', hi: 'यह कैसे काम करता है' },
  'section.pricingKicker': { en: 'Choose your plan', hi: 'अपना प्लान चुनें' },
  'section.pricingTitle': { en: 'Simple Plans, Big Opportunities', hi: 'सरल प्लान, बड़े मौके' },
  'section.pricingSub': {
    en: 'Unlock direct HR contacts, priority applications and international job alerts.',
    hi: 'सीधे HR संपर्क, प्राथमिकता आवेदन और अंतरराष्ट्रीय नौकरी अलर्ट अनलॉक करें।',
  },
  'section.testiKicker': { en: 'Real people, real offers', hi: 'असली लोग, असली ऑफ़र' },
  'section.testiTitle': { en: 'Candidates Who Made It', hi: 'जिन्होंने कामयाबी पाई' },

  /* ---------- Apply / lock ---------- */
  'job.viewContact': { en: 'View HR Contact & Apply', hi: 'HR संपर्क देखें और आवेदन करें' },
  'job.locked': { en: 'Subscribe to unlock direct HR contact, WhatsApp number and Apply Instantly.',
    hi: 'सीधे HR संपर्क, WhatsApp नंबर और तुरंत आवेदन अनलॉक करने के लिए सब्सक्राइब करें।' },
  'job.unlocked': { en: 'HR contact unlocked — message them directly. Good luck!',
    hi: 'HR संपर्क अनलॉक हो गया — सीधे संदेश भेजें। शुभकामनाएँ!' },
  'job.applyNow': { en: 'Apply Instantly', hi: 'अभी आवेदन करें' },
  'job.whatsappHr': { en: 'Unlock Direct HR WhatsApp', hi: 'सीधा HR WhatsApp अनलॉक करें' },
  'job.verifiedEmployer': { en: 'Verified Employer', hi: 'सत्यापित नियोक्ता' },
  'job.visaSponsored': { en: 'Visa Sponsored', hi: 'वीज़ा स्पॉन्सर्ड' },
  'job.immediate': { en: 'Immediate Joining', hi: 'तुरंत ज्वाइनिंग' },
  'job.openings': { en: 'openings', hi: 'पद' },
  'job.posted': { en: 'Posted', hi: 'पोस्ट किया गया' },
  'job.aboutRole': { en: 'About This Role', hi: 'इस भूमिका के बारे में' },
  'job.responsibilities': { en: 'Responsibilities', hi: 'ज़िम्मेदारियाँ' },
  'job.requirements': { en: 'Requirements', hi: 'आवश्यकताएँ' },
  'job.benefits': { en: 'Benefits & Perks', hi: 'लाभ और सुविधाएँ' },
  'job.package': { en: 'Salary & Package Breakdown', hi: 'सैलरी और पैकेज विवरण' },
  'job.label.accommodation': { en: 'Accommodation', hi: 'रहने की व्यवस्था' },
  'job.label.food': { en: 'Food', hi: 'खाना' },
  'job.label.visa': { en: 'Visa', hi: 'वीज़ा' },
  'job.label.transport': { en: 'Transport', hi: 'ट्रांसपोर्ट' },
  'job.label.hours': { en: 'Working Hours', hi: 'काम के घंटे' },
  'job.label.contract': { en: 'Contract', hi: 'कॉन्ट्रैक्ट' },
  'job.similar': { en: 'Similar Jobs', hi: 'मिलती-जुलती नौकरियाँ' },

  /* ---------- Search page ---------- */
  'search.title': { en: 'Find Your Next Job', hi: 'अपनी अगली नौकरी खोजें' },
  'search.filters': { en: 'Filters', hi: 'फ़िल्टर' },
  'search.region': { en: 'Region', hi: 'क्षेत्र' },
  'search.india': { en: 'India', hi: 'भारत' },
  'search.international': { en: 'International', hi: 'अंतरराष्ट्रीय' },
  'search.perks': { en: 'Visa & Perks', hi: 'वीज़ा और सुविधाएँ' },
  'search.salary': { en: 'Salary Range', hi: 'सैलरी रेंज' },
  'search.experience': { en: 'Experience', hi: 'अनुभव' },
  'search.fresher': { en: 'Fresher', hi: 'फ़्रेशर' },
  'search.exp13': { en: '1 – 3 years', hi: '1 – 3 साल' },
  'search.exp35': { en: '3 – 5 years', hi: '3 – 5 साल' },
  'search.exp5p': { en: '5+ years', hi: '5+ साल' },
  'search.jobType': { en: 'Job Type', hi: 'नौकरी का प्रकार' },
  'search.results': { en: 'jobs found', hi: 'नौकरियाँ मिलीं' },
  'search.clear': { en: 'Clear all', hi: 'सब हटाएँ' },
  'search.apply': { en: 'Apply', hi: 'आवेदन' },

  /* ---------- Pricing ---------- */
  'plan.subscribe': { en: 'Subscribe Now', hi: 'अभी सब्सक्राइब करें' },
  'plan.mostPopular': { en: 'Most Popular', hi: 'सबसे लोकप्रिय' },
  'plan.perMonth': { en: '/month', hi: '/माह' },
  'plan.noHiddenFees': { en: 'No hidden agent fees. Direct company jobs.',
    hi: 'कोई छिपी फीस नहीं। सीधी कंपनी की नौकरियाँ।' },

  /* ---------- Checkout ---------- */
  'checkout.title': { en: 'Complete Your Subscription', hi: 'अपनी सब्सक्रिप्शन पूरी करें' },
  'checkout.payWith': { en: 'Pay with', hi: 'भुगतान विधि' },
  'checkout.upi': { en: 'UPI', hi: 'UPI' },
  'checkout.card': { en: 'Card', hi: 'कार्ड' },
  'checkout.netbanking': { en: 'NetBanking', hi: 'नेटबैंकिंग' },
  'checkout.summary': { en: 'Order Summary', hi: 'ऑर्डर सारांश' },
  'checkout.pay': { en: 'Pay Securely', hi: 'सुरक्षित भुगतान करें' },
  'checkout.processing': { en: 'Processing…', hi: 'प्रोसेस हो रहा है…' },
  'checkout.success': { en: 'Payment successful! Your plan is now active. Time to apply — best of luck!',
    hi: 'भुगतान सफल! आपका प्लान अब सक्रिय है। आवेदन शुरू करें — शुभकामनाएँ!' },
  'checkout.secureNote': { en: '256-bit encrypted · Razorpay-grade security', hi: '256-बिट एन्क्रिप्टेड · Razorpay-स्तर की सुरक्षा' },

  /* ---------- Dashboard ---------- */
  'dash.title': { en: 'My Dashboard', hi: 'मेरा डैशबोर्ड' },
  'dash.overview': { en: 'Overview', hi: 'अवलोकन' },
  'dash.profile': { en: 'Profile', hi: 'प्रोफ़ाइल' },
  'dash.resume': { en: 'Resume', hi: 'रिज़्यूमे' },
  'dash.applications': { en: 'Applications', hi: 'आवेदन' },
  'dash.saved': { en: 'Saved Jobs', hi: 'सहेजी नौकरियाँ' },
  'dash.alerts': { en: 'Alerts', hi: 'अलर्ट' },
  'dash.saveProfile': { en: 'Save Profile', hi: 'प्रोफ़ाइल सेव करें' },
  'dash.downloadResume': { en: 'Download Resume (PDF)', hi: 'रिज़्यूमे डाउनलोड करें (PDF)' },
  'stage.applied': { en: 'Applied', hi: 'आवेदन भेजा' },
  'stage.viewed': { en: 'Viewed by HR', hi: 'HR ने देखा' },
  'stage.interview': { en: 'Interview Scheduled', hi: 'इंटरव्यू तय' },
  'stage.selected': { en: 'Selected', hi: 'चुने गए' },

  /* ---------- Employer ---------- */
  'emp.title': { en: 'Hire Verified Talent — India & Abroad', hi: 'सत्यापित टैलेंट हायर करें — भारत और विदेश' },
  'emp.postCta': { en: 'Post a Job Free', hi: 'मुफ़्त नौकरी पोस्ट करें' },
  'emp.verifyLicense': { en: 'Verify Business Licence', hi: 'बिज़नेस लाइसेंस सत्यापित करें' },

  /* ---------- Footer ---------- */
  'footer.tagline': { en: 'Apka Career, Ab Global', hi: 'आपका करियर, अब ग्लोबल' },
  'footer.rights': { en: 'All rights reserved.', hi: 'सर्वाधिकार सुरक्षित।' },

  /* ---------- Generic actions ---------- */
  'cta.explore': { en: 'Explore Jobs', hi: 'नौकरियाँ देखें' },
  'cta.start': { en: 'Get Started Free', hi: 'मुफ़्त शुरू करें' },
};

/** Apply a language to the document: swaps text and updates <html lang>. */
export function applyLang(lang: Lang): void {
  document.documentElement.lang = lang;
  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n;
    const entry = key ? strings[key] : undefined;
    if (!entry) return;
    el.textContent = lang === 'hi' && entry.hi ? entry.hi : entry.en;
  });
  document.querySelectorAll<HTMLInputElement>('[data-i18n-placeholder]').forEach((el) => {
    const key = el.dataset.i18nPlaceholder;
    const entry = key ? strings[key] : undefined;
    if (!entry) return;
    el.placeholder = lang === 'hi' && entry.hi ? entry.hi : entry.en;
  });
  document.querySelectorAll<HTMLElement>('[data-i18n-aria]').forEach((el) => {
    const key = el.dataset.i18nAria;
    const entry = key ? strings[key] : undefined;
    if (!entry) return;
    el.setAttribute('aria-label', lang === 'hi' && entry.hi ? entry.hi : entry.en);
  });
  document.querySelectorAll<HTMLButtonElement>('[data-lang-btn]').forEach((btn) => {
    btn.setAttribute('aria-pressed', String(btn.dataset.langBtn === lang));
  });
  try {
    localStorage.setItem('jobsji-lang', lang);
  } catch {
    /* storage blocked — session still works, just not remembered */
  }
}

/** Wire up the toggle buttons. Safe to call on every page. */
export function initI18n(): void {
  let saved: string | null = null;
  try {
    saved = localStorage.getItem('jobsji-lang');
  } catch {
    saved = null;
  }
  const initial: Lang = saved === 'hi' ? 'hi' : 'en';
  applyLang(initial);

  document.querySelectorAll<HTMLButtonElement>('[data-lang-btn]').forEach((btn) => {
    btn.addEventListener('click', () => {
      applyLang(btn.dataset.langBtn === 'hi' ? 'hi' : 'en');
    });
  });
}
