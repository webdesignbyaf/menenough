(() => {
 const menu = document.querySelector('#menu');
 const menuButton = document.querySelector('.menu-button');
 menuButton.addEventListener('click', () => { menu.showModal(); menuButton.setAttribute('aria-expanded','true'); });
 document.querySelector('.close-menu').addEventListener('click', () => menu.close());
 menu.addEventListener('close', () => menuButton.setAttribute('aria-expanded','false'));
 menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.close()));
 document.querySelectorAll('[data-dialog]').forEach(button => button.addEventListener('click', () => document.getElementById(button.dataset.dialog).showModal()));
 document.querySelectorAll('.close-dialog').forEach(button => button.addEventListener('click', () => button.closest('dialog').close()));
 document.querySelectorAll('dialog').forEach(dialog => dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const r=dialog.getBoundingClientRect();
  if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom) dialog.close();
 }));
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 if ('IntersectionObserver' in window) {
  if(!reduced.matches) document.body.classList.add('motion-ready');
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');observer.unobserve(entry.target);}}),{threshold:.1});
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
  new IntersectionObserver(entries=>document.querySelector('.fixed-contact').classList.toggle('hide',entries[0].isIntersecting),{threshold:.15}).observe(document.querySelector('#kontakt'));
 }
 let pending=false;
 const update=()=>{document.documentElement.style.setProperty('--progress',String(scrollY/(document.documentElement.scrollHeight-innerHeight||1)));pending=false;};
 addEventListener('scroll',()=>{if(!pending){pending=true;requestAnimationFrame(update);}},{passive:true});
 addEventListener('resize',update);update();
})();
