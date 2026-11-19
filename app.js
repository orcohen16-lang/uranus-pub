const en = {
  ratingCount: 'From 841 Google reviews',
  reviewSnapshot: 'Checked 17 Nov 2026',
  reviewOne: '“One of the best pubs I know”',
  reviewTwo: '“A great place — it gives us that feeling of old Netanya”',
  reviewThree: '“Tasty beer and heartwarming fries”',
  headerHours: 'Sunday to Saturday · 18:00-01:30',
  lastGuest: 'And until the last guest leaves',
  googleReviews: 'Read our Google reviews ↗',
  call: 'Call',
  callLabel: 'Call Uranus Pub',
  wazeLabel: 'Navigate to Uranus Pub with Waze',
  aboutHours: 'Sunday to Saturday, from 18:00 to 01:30, and until the last guest leaves.',
  aboutCheers: 'Come raise a glass with us!',
  closing: "Uranus Pub - Today I've stayed home.",
  menu: 'Menu',
  reserve: 'Reserve on WhatsApp',
  hero: "Today<br>I've Stayed<br>Home.",
  subtitle: 'Uranus Pub. 13 Kikar Ha’atsmaut, Netanya.',
  scroll: 'Meet Uranus Pub ↓',
  aboutTitle: 'About us',
  about: 'Netanya’s true, authentic English pub has been here since 1980, bringing together long-time regulars and a young atmosphere. Whether it’s a date at the bar, beers with friends, or just a craving for our wings, Uranus Pub is exactly the place for you.',
  happyText: 'Every day from 18:00 to 20:00, our Happy Hour gives you 30% off the entire food and alcohol menu.',
  sliderTitle: 'The food. The drinks. The pub.',
  sliderPrev: 'Previous image',
  sliderNext: 'Next image',
  sliderRegion: 'Food and drinks photo slider',
  slide1Alt: 'A table filled with dishes at Uranus Pub',
  slide2Alt: 'A burger being served at the table',
  slide3Alt: 'A guest enjoying a burger at Uranus Pub',
  slide4Alt: 'Friends sharing food around the table',
  slide5Alt: 'Dessert with ice cream beside a beer',
  slide6Alt: 'Raising glasses at Uranus Pub',
  slide7Alt: 'A cocktail on the wooden bar',
  slide8Alt: 'Cold beer poured from the tap',
  slide9Alt: 'The crowd and atmosphere at Uranus Pub',
  slide10Alt: 'Vintage wall art inside the pub',
  reserveStripTitle: 'Your table is waiting.',
  stageEyebrow: 'SUNDAY · JAM',
  stageTitle: 'Jam',
  stage: 'Is your Sunday free? We hope so, because every other Sunday at 22:00 is the time to come to Uranus Pub for our jam: live performances, cold beer and a warm atmosphere.',
  stageExtra: 'It is also your chance to sing and perform in the jam!',
  instagram: 'Stay up to date — details on Instagram.',
  reviewsTitle: 'If you know, you know.',
  visitTitle: 'Opening hours',
  address: '13 Kikar Ha’atsmaut, Netanya',
  opening: 'Sunday–Saturday | 18:00–01:30 | Until the last guest leaves',
  waze: 'Navigate with Waze ↗',
  menuNote: 'The menu will be added soon. In the meantime, contact us on WhatsApp.',
  whatsapp: 'Open WhatsApp'
};

const textElements = [...document.querySelectorAll('[data-t]')];
const altElements = [...document.querySelectorAll('[data-alt-t]')];
const labelElements = [...document.querySelectorAll('[data-label-t]')];
const heText = Object.fromEntries(textElements.map((element) => [element.dataset.t, element.innerHTML]));
const heAlts = Object.fromEntries(altElements.map((element) => [element.dataset.altT, element.alt]));
const heLabels = Object.fromEntries(labelElements.map((element) => [element.dataset.labelT, element.getAttribute('aria-label')]));

let english = false;
const languageButton = document.getElementById('language');
const sliderPrev = document.getElementById('sliderPrev');
const sliderNext = document.getElementById('sliderNext');

function updateLanguage() {
  const dictionary = english ? en : heText;
  document.documentElement.lang = english ? 'en' : 'he';
  document.documentElement.dir = english ? 'ltr' : 'rtl';
  textElements.forEach((element) => {
    const value = dictionary[element.dataset.t];
    if (value !== undefined) element.innerHTML = value;
  });
  altElements.forEach((element) => {
    const key = element.dataset.altT;
    element.alt = english ? en[key] : heAlts[key];
  });
  labelElements.forEach((element) => {
    const key = element.dataset.labelT;
    element.setAttribute('aria-label', english ? en[key] : heLabels[key]);
  });
  languageButton.textContent = english ? 'עברית' : 'EN';
  languageButton.setAttribute('aria-label', english ? 'מעבר לעברית' : 'Switch to English');
  sliderPrev.textContent = english ? '←' : '→';
  sliderNext.textContent = english ? '→' : '←';
  document.title = english ? 'Uranus Pub | Netanya since 1980' : 'אורנוס פאב | מאז 1980';
}

languageButton.addEventListener('click', () => {
  english = !english;
  updateLanguage();
});

const dialog = document.getElementById('menuDialog');
document.querySelectorAll('[data-menu]').forEach((button) => button.addEventListener('click', () => dialog.showModal()));
document.getElementById('closeMenu').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
  if (event.target !== dialog) return;
  const bounds = dialog.getBoundingClientRect();
  const outside = event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
  if (outside) dialog.close();
});

const video = document.getElementById('heroVideo');
const videoButton = document.getElementById('videoToggle');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function syncVideoButton() {
  videoButton.textContent = video.paused ? '▶' : 'Ⅱ';
  videoButton.setAttribute('aria-label', video.paused ? 'Play background video' : 'Pause background video');
}

if (reducedMotion.matches) {
  video.autoplay = false;
  video.pause();
}
videoButton.addEventListener('click', () => {
  if (video.paused) video.play().catch(() => {});
  else video.pause();
});
video.addEventListener('play', syncVideoButton);
video.addEventListener('pause', syncVideoButton);
video.play().catch(syncVideoButton);
if (reducedMotion.matches) video.pause();
syncVideoButton();

const slider = document.getElementById('mediaSlider');
const slides = [...slider.querySelectorAll('.slider-slide')];
const sliderCounter = document.getElementById('sliderCounter');
let activeSlide = 0;

function createLoopClone(slide) {
  const clone = slide.cloneNode(true);
  clone.classList.add('is-loop-clone');
  clone.setAttribute('aria-hidden', 'true');
  clone.querySelectorAll('[data-alt-t]').forEach((element) => element.removeAttribute('data-alt-t'));
  clone.querySelectorAll('img').forEach((image) => {
    image.alt = '';
    image.loading = 'lazy';
  });
  return clone;
}

if (slides.length > 1) {
  slider.prepend(createLoopClone(slides.at(-1)));
  slider.append(createLoopClone(slides[0]));
}

const loopSlides = [...slider.querySelectorAll('.slider-slide')];

function slideLeft(slide) {
  return slide.offsetLeft - (slider.clientWidth - slide.offsetWidth) / 2;
}

function scrollToLoopSlide(index, behavior = 'smooth') {
  slider.scrollTo({ left: slideLeft(loopSlides[index]), behavior });
}

function updateSliderStatus(loopIndex) {
  if (slides.length <= 1) activeSlide = 0;
  else if (loopIndex === 0) activeSlide = slides.length - 1;
  else if (loopIndex === loopSlides.length - 1) activeSlide = 0;
  else activeSlide = loopIndex - 1;

  sliderCounter.textContent = `${activeSlide + 1} / ${slides.length}`;
  sliderPrev.disabled = slides.length <= 1;
  sliderNext.disabled = slides.length <= 1;
}

function nearestLoopSlide() {
  const center = slider.getBoundingClientRect().left + slider.clientWidth / 2;
  return loopSlides.reduce((best, slide, index) => {
    const bounds = slide.getBoundingClientRect();
    const distance = Math.abs(bounds.left + bounds.width / 2 - center);
    return distance < best.distance ? { index, distance } : best;
  }, { index: 0, distance: Infinity }).index;
}

function normalizeLoopPosition() {
  if (slides.length <= 1) return;
  const loopIndex = nearestLoopSlide();
  if (loopIndex === 0) scrollToLoopSlide(slides.length, 'auto');
  if (loopIndex === loopSlides.length - 1) scrollToLoopSlide(1, 'auto');
}

function goToSlide(index) {
  if (slides.length <= 1) return;
  const loopIndex = index < 0 ? 0 : index >= slides.length ? loopSlides.length - 1 : index + 1;
  activeSlide = (index + slides.length) % slides.length;
  updateSliderStatus(loopIndex);
  scrollToLoopSlide(loopIndex, reducedMotion.matches ? 'auto' : 'smooth');
  if (reducedMotion.matches) normalizeLoopPosition();
}

sliderPrev.addEventListener('click', () => goToSlide(activeSlide - 1));
sliderNext.addEventListener('click', () => goToSlide(activeSlide + 1));
slider.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') {
    event.preventDefault();
    goToSlide(activeSlide + (english ? -1 : 1));
  }
  if (event.key === 'ArrowRight') {
    event.preventDefault();
    goToSlide(activeSlide + (english ? 1 : -1));
  }
});

let dragging = false;
let dragStartX = 0;
let dragStartScroll = 0;

slider.querySelectorAll('img').forEach((image) => image.setAttribute('draggable', 'false'));
slider.addEventListener('pointerdown', (event) => {
  if (event.pointerType === 'touch') return;
  dragging = true;
  dragStartX = event.clientX;
  dragStartScroll = slider.scrollLeft;
  slider.classList.add('is-dragging');
  slider.setPointerCapture(event.pointerId);
});
slider.addEventListener('pointermove', (event) => {
  if (!dragging) return;
  slider.scrollLeft = dragStartScroll - (event.clientX - dragStartX);
});
function stopSliderDrag(event) {
  if (!dragging) return;
  dragging = false;
  slider.classList.remove('is-dragging');
  if (slider.hasPointerCapture(event.pointerId)) slider.releasePointerCapture(event.pointerId);
}
slider.addEventListener('pointerup', stopSliderDrag);
slider.addEventListener('pointercancel', stopSliderDrag);

let sliderFrame;
let sliderSettleTimer;
slider.addEventListener('scroll', () => {
  cancelAnimationFrame(sliderFrame);
  clearTimeout(sliderSettleTimer);
  sliderFrame = requestAnimationFrame(() => {
    updateSliderStatus(nearestLoopSlide());
  });
  sliderSettleTimer = setTimeout(normalizeLoopPosition, 140);
}, { passive: true });

updateLanguage();
updateSliderStatus(slides.length > 1 ? 1 : 0);
if (slides.length > 1) scrollToLoopSlide(1, 'auto');
