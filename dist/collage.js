(() => {
  const progress = document.querySelector('.progress');
  const updateProgress = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.width = `${max > 0 ? scrollY / max * 100 : 0}%`;
  };
  addEventListener('scroll', updateProgress, {passive:true});
  updateProgress();

  const peel = document.querySelector('.peel-button');
  const note = document.querySelector('.peel-note');
  peel?.addEventListener('click', () => {
    const open = note.classList.toggle('open');
    peel.setAttribute('aria-expanded', String(open));
    peel.textContent = open ? '贴回去 ↗' : '撕开看看 ↗';
  });

  document.querySelectorAll('.sticker').forEach(sticker => {
    let startX=0,startY=0,baseX=0,baseY=0,dragging=false;
    sticker.addEventListener('pointerdown', event => {
      if(event.button !== 0) return;
      dragging=true;startX=event.clientX;startY=event.clientY;
      sticker.setPointerCapture(event.pointerId);
      sticker.style.transition='none';
    });
    sticker.addEventListener('pointermove', event => {
      if(!dragging) return;
      sticker.style.translate=`${baseX+event.clientX-startX}px ${baseY+event.clientY-startY}px`;
    });
    const finish = event => {
      if(!dragging) return;
      baseX += event.clientX-startX;baseY += event.clientY-startY;
      dragging=false;sticker.style.transition='';
    };
    sticker.addEventListener('pointerup', finish);
    sticker.addEventListener('pointercancel', finish);
  });

  if(matchMedia('(pointer:fine)').matches && !matchMedia('(prefers-reduced-motion:reduce)').matches){
    let last=0;
    document.querySelector('.hero-photo')?.addEventListener('pointermove', event => {
      if(Date.now()-last<95) return;
      last=Date.now();
      const spark=document.createElement('span');
      spark.className='cursor-spark';spark.textContent='✳';
      spark.style.left=`${event.clientX}px`;spark.style.top=`${event.clientY}px`;
      document.body.append(spark);
      setTimeout(()=>spark.remove(),750);
    });
  }
})();

