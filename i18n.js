const DEFAULT_LANG='en';
const SUPPORTED_LANGS=['en','zh-CN'];
let translations={};
function escapeHtml(value){return value.replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]))}
function applyTranslations(){
  const lang=window.currentLanguage||DEFAULT_LANG;
  document.documentElement.lang=lang==='zh-CN'?'zh-CN':'en-GB';
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const value=translations[el.dataset.i18n];
    if(value==null)return;
    if(el.hasAttribute('data-i18n-lines')) el.innerHTML=value.split('\n').map(escapeHtml).join('<br>');
    else el.textContent=value;
  });
  const toggle=document.querySelector('[data-language-toggle]');
  if(toggle){
    const chinese=lang==='zh-CN';
    toggle.textContent=chinese?'EN':'中文';
    toggle.setAttribute('aria-label',chinese?'Switch to English':'切换至中文');
  }
}
async function setLanguage(lang){
  if(!SUPPORTED_LANGS.includes(lang))lang=DEFAULT_LANG;
  const response=await fetch('locales/'+lang+'.json',{cache:'no-cache'});
  if(!response.ok)throw new Error('Locale load failed: '+lang);
  translations=await response.json();
  window.currentLanguage=lang;
  localStorage.setItem('portfolio-language',lang);
  applyTranslations();
}
document.addEventListener('DOMContentLoaded',()=>{
  const toggle=document.querySelector('[data-language-toggle]');
  if(toggle)toggle.addEventListener('click',()=>setLanguage(window.currentLanguage==='zh-CN'?'en':'zh-CN').catch(console.error));
  setLanguage(localStorage.getItem('portfolio-language')||DEFAULT_LANG).catch(console.error);
});
