(() => {
  const translations = {
    HOME: { es: 'INICIO', ja: 'ホーム', fr: 'ACCUEIL', pt: 'INÍCIO' },
    SHOP: { es: 'TIENDA', ja: 'ショップ', fr: 'BOUTIQUE', pt: 'LOJA' },
    LISTEN: { es: 'ESCUCHAR', ja: '聴く', fr: 'ÉCOUTER', pt: 'OUVIR' },
    TRACKLIST: { es: 'LISTA', ja: 'トラックリスト', fr: 'LISTE', pt: 'FAIXAS' },
    LYRICS: { es: 'LETRAS', ja: '歌詞', fr: 'PAROLES', pt: 'LETRAS' },
    CREDITS: { es: 'CRÉDITOS', ja: 'クレジット', fr: 'CRÉDITS', pt: 'CRÉDITOS' }
  };

  const langOrder = ['es','fr','ja','pt']; 
  const links = Array.from(document.querySelectorAll('#nav-bar-ul .nav-link a'));

  links.forEach(a => {
    const orig = a.innerText.trim();
    a.dataset.origText = orig;
    const key = orig.toUpperCase();
    const entry = translations[key];
    let timer = null;
    let idx = 0;

    const start = () => {
      if (!entry || timer) return;
      idx = 0;
      const show = () => {
        const code = langOrder[idx % langOrder.length];
        if (entry[code]) a.innerText = entry[code];
        idx++;
      };
      show();
      timer = setInterval(show, 1000);
    };

    const stop = () => {
      if (timer) { clearInterval(timer); timer = null; }
      a.innerText = a.dataset.origText;
      idx = 0;
    };

    a.addEventListener('mouseenter', start);
    a.addEventListener('mouseleave', stop);
    a.addEventListener('focus', start);
    a.addEventListener('blur', stop);
  });
})();

(function(){
  if (document.getElementById('mouse-light')) return;
  const el = document.createElement('div');
  el.id = 'mouse-light';
  document.body.appendChild(el);

  let tx = 0, ty = 0, x = 0, y = 0, raf = null, visible = false, hideTimeout = null;
  const lerp = (a,b,t) => a + (b-a)*t;

  function loop(){
    x = lerp(x, tx, 0.18);
    y = lerp(y, ty, 0.18);
    el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%,-50%)`;
    raf = requestAnimationFrame(loop);
  }

  function show() {
    if (!visible) { visible = true; el.style.opacity = '1'; if (!raf) loop(); }
    clearTimeout(hideTimeout);
    hideTimeout = setTimeout(() => { el.style.opacity = '0'; visible = false; }, 800);
  }

  function onMove(e){
    const cx = e.touches ? e.touches[0].clientX : e.clientX;
    const cy = e.touches ? e.touches[0].clientY : e.clientY;
    tx = cx; ty = cy;
    show();
  }

  window.addEventListener('mousemove', onMove, {passive:true});
  window.addEventListener('touchmove', onMove, {passive:true});
  window.addEventListener('mouseleave', () => { el.style.opacity = '0'; }, {passive:true});
})();