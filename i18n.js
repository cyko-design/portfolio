const DEFAULT_LANG='en';
const SUPPORTED_LANGS=['en','zh-CN'];
let translations={};
function getPathKey(el){return el.dataset.i18n}
function applyTranslations(){
  document.documentElement.lang=window.currentLanguage==='zh-CN'?'zh-CN':'en-GB';
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const value=translations[getPathKey(el)];
    if(value==null)return;
    if(el.hasAttribute('data-i18n-lines')){
      el.innerHTML=value.split('\n').map(line=>line.replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]))).join('<br>');
    }else el.textContent=value;
  });
  document.querySelectorAll('[data-lang]').forEach(btn=>btn.setAttribute('aria-pressed',String(btn.dataset.lang===window.currentLanguage)));
}
async function setLanguage(lang){
  if(!SUPPORTED_LANGS.includes(lang))lang=DEFAULT_LANG;
  try{
    const response=await fetch('locales/'+lang+'.json',{cache:'no-cache'});
    if(!response.ok)throw new Error('Locale load failed');
    translations=await response.json();
    window.currentLanguage=lang;
    localStorage.setItem('portfolio-language',lang);
    applyTranslations();
  }catch(error){console.error(error)}
}
document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('[data-lang]').forEach(btn=>btn.addEventListener('click',()=>setLanguage(btn.dataset.lang)));
  setLanguage(localStorage.getItem('portfolio-language')||DEFAULT_LANG);
});
