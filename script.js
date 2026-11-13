(function(){
  const qs=(s,p=document)=>p.querySelector(s), qsa=(s,p=document)=>[...p.querySelectorAll(s)];
  const menu=qs('#mobileMenu'), panel=qs('#mobilePanel');
  if(menu&&panel) menu.addEventListener('click',()=>panel.classList.toggle('open'));

  const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.08});
  qsa('.reveal').forEach(el=>obs.observe(el));

  qsa('.acc-btn').forEach(btn=>btn.addEventListener('click',()=>btn.closest('.acc-item').classList.toggle('open')));

  qsa('[data-tabs]').forEach(group=>{
    const tabs=qsa('.tab',group), panels=qsa('.tab-panel',group);
    tabs.forEach(t=>t.addEventListener('click',()=>{
      tabs.forEach(x=>x.classList.remove('active')); panels.forEach(x=>x.classList.remove('active'));
      t.classList.add('active'); const p=qs('#'+t.dataset.target,group); if(p)p.classList.add('active');
    }));
  });

  const top=qs('#backTop');
  if(top) top.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

  window.showToast=function(msg){
    let t=qs('#toast'); if(!t){t=document.createElement('div');t.id='toast';t.className='toast';document.body.appendChild(t);}
    t.textContent=msg;t.classList.add('show');clearTimeout(window.__toastTimer);
    window.__toastTimer=setTimeout(()=>t.classList.remove('show'),1800);
  }
})();
