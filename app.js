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
