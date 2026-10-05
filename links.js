// Shared destinations for desktop and mobile links.
window.portfolioLinks = Object.freeze({
  resume: '#resume-modal',
  portfolio: 'https://www.figma.com/deck/b6DfCZkgf1KJnCnDoCo5mG',
  linkedin: 'https://www.linkedin.com/in/charlesyuen/',
  mindlens: 'https://mindlens-4ov.pages.dev/',
  considered: 'https://www.figma.com/deck/b6DfCZkgf1KJnCnDoCo5mG/2026-Portfolio--Charles-Yuen-?node-id=275-741&t=m6ir8wHlQDsPnbcP-1',
  waterNymphArticle: 'https://lnkd.in/p/gXBp88Ne',
  waterNymphVideo: 'https://youtube.com/shorts/h_53FkJKA4w?si=-oF0TRcCNWs7ZZU_',
  sunsetRiderVideo: 'https://youtube.com/shorts/nNDpAat0F9U?feature=share'
});

document.querySelectorAll('[data-link]').forEach(link => {
  const destination = window.portfolioLinks[link.dataset.link];
  if (destination) {
    link.href = destination;
    if (link.dataset.link === 'resume') {
      link.removeAttribute('download');
      link.setAttribute('aria-haspopup', 'dialog');
      link.setAttribute('aria-controls', 'resume-modal');
      link.removeAttribute('target');
    } else {
      link.target = '_blank';
    }
    link.rel = 'noopener noreferrer';
    link.removeAttribute('aria-disabled');
    link.removeAttribute('tabindex');
    link.removeAttribute('title');
  }
});
