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