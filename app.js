const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
const mobile = window.matchMedia('(max-width: 767px)');

function setMenu(open, returnFocus = false) {
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  navigation.classList.toggle('is-open', open);
  if (returnFocus) menuButton.focus();
}

menuButton.addEventListener('click', () => {
  setMenu(menuButton.getAttribute('aria-expanded') !== 'true');
});
navigation.addEventListener('click', event => {
  if (event.target.closest('a[href]')) setMenu(false);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    setMenu(false, true);
  }
});
document.addEventListener('click', event => {
  if (!event.target.closest('.site-header')) setMenu(false);
});
document.addEventListener('focusin', event => {
  if (!event.target.closest('.site-header')) setMenu(false);
});
mobile.addEventListener('change', () => setMenu(false));

// Close the mobile dropdown when the page moves, keeping the header available.
window.addEventListener('scroll', () => {
  if (mobile.matches && menuButton.getAttribute('aria-expanded') === 'true') {
    setMenu(false, navigation.contains(document.activeElement));
  }
}, { passive: true });

// Keep anchor destinations visible beneath the sticky header at any text size.
const header = document.querySelector('.site-header');
function updateHeaderOffset() {
  document.documentElement.style.setProperty('--sticky-header-height', header.offsetHeight + 'px');
}
updateHeaderOffset();
if ('ResizeObserver' in window) {
  new ResizeObserver(updateHeaderOffset).observe(header);
} else {
  window.addEventListener('resize', updateHeaderOffset, { passive: true });
}

// Every résumé entry point opens the same accessible native dialog.
const resumeDialog = document.querySelector('#resume-modal');
const resumeClose = resumeDialog.querySelector('.resume-close');
let resumeOpener = null;
let resumeScrollY = 0;
let previousBodyTop = '';
function openResume(event) {
  event.preventDefault();
  if (resumeDialog.open) return;
  resumeOpener = event.currentTarget;
  setMenu(false);
  resumeScrollY = window.scrollY;
  previousBodyTop = document.body.style.top;
  document.body.style.top = '-' + resumeScrollY + 'px';
  document.body.classList.add('resume-is-open');
  resumeDialog.showModal();
  resumeDialog.scrollTop = 0;
  resumeClose.focus({ preventScroll: true });
}
document.querySelectorAll('[data-link="resume"]').forEach(link => {
  link.addEventListener('click', openResume);
});
resumeClose.addEventListener('click', () => resumeDialog.close());
resumeDialog.addEventListener('click', event => {
  if (event.target !== resumeDialog) return;
  const bounds = resumeDialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right ||
      event.clientY < bounds.top || event.clientY > bounds.bottom) resumeDialog.close();
});
resumeDialog.addEventListener('close', () => {
  document.body.classList.remove('resume-is-open');
  document.body.style.top = previousBodyTop;
  const root = document.documentElement;
  const previousScrollBehavior = root.style.scrollBehavior;
  root.style.scrollBehavior = 'auto';
  window.scrollTo(0, resumeScrollY);
  // The mobile menu closes when opening the dialog, so restore focus to its toggle.
  const focusTarget = mobile.matches && navigation.contains(resumeOpener) ? menuButton : resumeOpener;
  if (focusTarget && focusTarget.isConnected) focusTarget.focus({ preventScroll: true });
  root.style.scrollBehavior = previousScrollBehavior;
});
