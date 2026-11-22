const video = document.getElementById('background-video');
const languageButton = document.getElementById('language');
const textElements = [...document.querySelectorAll('[data-t]')];
const labelElements = [...document.querySelectorAll('[data-label-t]')];
const hebrewText = Object.fromEntries(textElements.map((element) => [element.dataset.t, element.innerHTML]));
const hebrewLabels = Object.fromEntries(labelElements.map((element) => [element.dataset.labelT, element.getAttribute('aria-label')]));

const englishText = {
  skip: 'Skip to main content',
  reserve: 'Reserve on WhatsApp',
  hero: "<span class=\"headline-line\">Uranus Pub -</span><span class=\"headline-line\">Today</span><span class=\"headline-line\">I've Stayed Home.</span>",
  age: 'Entry is for ages 18+ with valid photo ID.',
  warning: 'Warning: Excessive consumption of alcohol is life-threatening and harmful to health!',
  days: 'Sunday - Saturday',
  address: '13 Kikar Ha’atsmaut, Netanya.'
};

const englishLabels = {
  headerLabel: 'Quick links',
  homeLabel: 'Uranus Pub - home',
  navLabel: 'Contact and navigation',
  callLabel: 'Call Uranus Pub, 09-882-9919',
  wazeLabel: 'Navigate to Uranus Pub with Waze',
  socialLabel: 'Social media',
  instagramLabel: 'Uranus Pub on Instagram',
  facebookLabel: 'Uranus Pub on Facebook',
  mapsLabel: 'Uranus Pub on Google Maps',
  warningLabel: 'Alcohol consumption warning',
  contactLabel: 'Opening hours and address'
};

let english = false;

function updateLanguage() {
  english = !english;
  document.documentElement.lang = english ? 'en' : 'he';
  document.documentElement.dir = english ? 'ltr' : 'rtl';

  textElements.forEach((element) => {
    const key = element.dataset.t;
    element.innerHTML = english ? englishText[key] : hebrewText[key];
    element.setAttribute('dir', english ? 'ltr' : 'rtl');
  });

  labelElements.forEach((element) => {
    const key = element.dataset.labelT;
    element.setAttribute('aria-label', english ? englishLabels[key] : hebrewLabels[key]);
  });

  languageButton.setAttribute('aria-label', english ? 'מעבר לעברית' : 'Switch to English');
  document.title = english ? 'Uranus Pub | Netanya since 1980' : 'אורנוס פאב | נתניה מאז 1980';
}

languageButton.addEventListener('click', updateLanguage);

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  video.pause();
  video.removeAttribute('autoplay');
}

video.play().catch(() => {
  // The poster remains visible when a browser blocks autoplay.
});
