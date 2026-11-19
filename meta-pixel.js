const META_CONSENT_KEY = 'uranus_meta_pixel_consent';
const META_PIXEL_ID = '1179915894595986';
let metaPixelLoaded = false;

function readMetaConsent() {
  try {
    return localStorage.getItem(META_CONSENT_KEY);
  } catch (error) {
    return null;
  }
}

function saveMetaConsent(value) {
  try {
    localStorage.setItem(META_CONSENT_KEY, value);
  } catch (error) {
    // If storage is unavailable, the visitor will be asked again next time.
  }
}

function loadMetaPixel() {
  if (metaPixelLoaded || window.fbq) return;
  metaPixelLoaded = true;

  (function loadPixel(f, b, e, v, n, t, s) {
    n = f.fbq = function metaPixelQueue() {
      if (n.callMethod) n.callMethod.apply(n, arguments);
      else n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = '2.0';
    n.queue = [];
    t = b.createElement(e);
    t.async = true;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

  fbq('init', META_PIXEL_ID);
  fbq('track', 'PageView');
}

function closeConsentBanner() {
  document.getElementById('privacyConsent')?.remove();
}

function chooseMetaConsent(value) {
  const wasLoaded = metaPixelLoaded || Boolean(window.fbq);
  saveMetaConsent(value);
  closeConsentBanner();

  if (value === 'granted') {
    loadMetaPixel();
  } else if (wasLoaded) {
    window.location.reload();
  }
}

function showConsentBanner() {
  closeConsentBanner();

  const banner = document.createElement('section');
  banner.id = 'privacyConsent';
  banner.className = 'privacy-consent';
  banner.setAttribute('role', 'region');
  banner.setAttribute('aria-labelledby', 'privacyConsentTitle');
  banner.innerHTML = `
    <div class="privacy-consent-copy">
      <h2 id="privacyConsentTitle">פרטיות באתר <span lang="en" dir="ltr">· Website privacy</span></h2>
      <p>אנחנו משתמשים ב־Meta Pixel למדידת פרסום רק לאחר אישורך.</p>
      <p class="privacy-consent-en" lang="en" dir="ltr">We use Meta Pixel for advertising measurement only after you consent.</p>
      <a href="privacy.html">מדיניות פרטיות / Privacy policy</a>
    </div>
    <div class="privacy-consent-actions">
      <button class="outline" type="button" data-consent="denied">לא תודה / Decline</button>
      <button class="button" type="button" data-consent="granted">אישור / Accept</button>
    </div>`;

  banner.querySelector('[data-consent="denied"]').addEventListener('click', () => chooseMetaConsent('denied'));
  banner.querySelector('[data-consent="granted"]').addEventListener('click', () => chooseMetaConsent('granted'));
  document.body.appendChild(banner);
  banner.querySelector('[data-consent="granted"]').focus();
}

document.querySelectorAll('[data-privacy-settings]').forEach((button) => {
  button.addEventListener('click', showConsentBanner);
});

if (readMetaConsent() === 'granted') {
  loadMetaPixel();
} else if (readMetaConsent() !== 'denied') {
  showConsentBanner();
}
