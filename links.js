// Replace null values with the supplied destinations before publishing.
window.portfolioLinks = Object.freeze({
  resume: null,
  portfolio: null,
  linkedin: 'https://www.linkedin.com/in/charlesyuen/',
  mindlens: 'https://github.com/cyko-design/mindlens/',
  considered: 'https://github.com/cyko-design/considered',
  waterNymphArticle: 'https://lnkd.in/p/gXBp88Ne',
  waterNymphVideo: 'https://youtube.com/shorts/h_53FkJKA4w?si=-oF0TRcCNWs7ZZU_',
  sunsetRiderVideo: 'https://youtube.com/shorts/nNDpAat0F9U?feature=share'
});

document.querySelectorAll('[data-link]').forEach(link => {
  const destination = window.portfolioLinks[link.dataset.link];
  if (destination) {
    link.href = destination;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.removeAttribute('aria-disabled');
    link.removeAttribute('tabindex');
    link.removeAttribute('title');
  }
});
