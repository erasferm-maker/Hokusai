(function () {
  var vp = document.getElementById('viewport');
  var html = document.documentElement;
  // Logo Expo y hamburguesa: crecen con la pantalla en móvil (proporción del Figma de 430px)
  // y se quedan en el tamaño de tablet (110 × 60 y 52px) desde que lo alcanzan: sin saltos.
  function header(p, scale) {
    var w = vp.clientWidth || window.innerWidth;
    var ew = Math.min(110, 102.569 * w / 430), eh = ew * 56.118 / 102.569;
    var bs = Math.min(52, 52 * w / 430);
    var cy = Math.min(66, 58 * w / 430);                      // eje vertical común
    var expo = document.getElementById(p + '-expo'), burger = document.getElementById(p + '-burger');
    expo.style.cssText = 'left:' + (0.05 * w / scale) + 'px;top:' + ((cy - eh / 2) / scale) + 'px;width:' + (ew / scale) + 'px;height:' + (eh / scale) + 'px';
    burger.style.cssText = 'left:' + ((0.95 * w - bs) / scale) + 'px;top:' + ((cy - bs / 2) / scale) + 'px;width:' + (bs / scale) + 'px;height:' + (bs / scale) + 'px';
  }
  function fit() {
    var w = vp.clientWidth || window.innerWidth;
    var root = html.style;
    // Modo según el portafolio: móvil ≤767 · tablet 768–1279 · desktop ≥1280
    var mode = w < 768 ? 'm' : (w < 1280 ? 't' : 'd');
    // Párrafos con los parámetros del portafolio (tamaño / interlineado reales en pantalla):
    //  ≤600px: 18/28 × (ancho/430) · 601–1024px: 18/28 fijos · ≥1025px: máx(13, 18×u) / máx(21, 28×u), u = mín(ancho,1920)/1920
    var pf, pl;
    if (w < 768) { pf = 16; pl = 27.2; }        // móvil: siempre 16 / 27.2 (regla del portafolio)
    else if (w < 1280) { pf = 18; pl = 28; }   // tablet: siempre 18 / 28
    else { var u = Math.min(w, 1920) / 1920; pf = Math.max(13, 18 * u); pl = Math.max(21, 28 * u); }
    root.setProperty('--pf', pf + 'px');
    root.setProperty('--pl', pl + 'px');
    // Títulos: tamaño real en pantalla, fluido y sin saltos entre versiones
    var hE, hL, hI;
    if (w <= 430) { var km = w / 430; hE = 60 * km; hL = 60 * km; hI = 40 * km; }
    else if (w < 768) { var tm = (w - 430) / 338; hE = 60 + 10 * tm; hL = 60 + 10 * tm; hI = 40 + 25 * tm; }
    else if (w < 1280) { hE = 70; hL = 70; hI = 65; }
    else { var td = (Math.min(w, 1920) - 1280) / 640; hE = 70 + 70 * td; hL = 70 + 10 * td; hI = 65 + 15 * td; }
    root.setProperty('--hE', hE + 'px');
    root.setProperty('--hL', hL + 'px');
    root.setProperty('--hI', hI + 'px');
    // Botones con las medidas del botón principal del portafolio
    var bw = 195, bh = 50, bf = 14;
    // mismo tamaño en todas las versiones (el de tablet)
    root.setProperty('--bw', bw + 'px');
    root.setProperty('--bh', bh + 'px');
    root.setProperty('--bf', bf + 'px');
    html.classList.toggle('mode-m', mode === 'm');
    html.classList.toggle('mode-t', mode === 't');
    if (mode === 't') {
      var st = w / 744;
      root.setProperty('--st', st.toString());
      root.setProperty('--tst', Math.max(st, 1).toString());
      // Lo que va debajo de cada texto lo sigue (sube o baja) conservando las distancias del Figma
      var t0 = 1395 + document.getElementById('t-exhibition').offsetHeight - 1690;
      var t1 = 2433 + document.getElementById('t-life').offsetHeight - 3004;
      var t2 = document.getElementById('t-infos').offsetHeight - 398;
      // Bajo el menú (que termina a 96px en pantalla) queda el mismo aire que en el Figma: 15px
      var tH = Math.min(0, (96 + 15) / st - 165);
      var tB = -149.8, tP = -167.4, tR = -321.5;    // hero compacto · foto de la expo en 16:9 · retrato al 50%
      root.setProperty('--tR', tR + 'px');
      root.setProperty('--tH', tH + 'px');
      root.setProperty('--tB', tB + 'px');
      root.setProperty('--tP', tP + 'px');
      root.setProperty('--t0', t0 + 'px'); root.setProperty('--t1', t1 + 'px'); root.setProperty('--t2', t2 + 'px');
      vp.style.height = ((4638 + tH + tB + t0 + tP + t1 + tR + t2) * st) + 'px';
      header('t', st);
      return;
    }
    if (mode === 'm') {
      var sm = w / 430;
      root.setProperty('--sm', sm.toString());
      var mEx = document.getElementById('m-exhibition');
      var mLife = document.getElementById('m-life');
      var mInfos = document.getElementById('m-infos');
      // Lo que va debajo de cada texto lo sigue (sube o baja) conservando las distancias del Figma
      var m0 = 1275 + mEx.offsetHeight - 1676;
      var m1 = 2169 + mLife.offsetHeight - 3003;
      var m2 = mInfos.offsetHeight - 428;
      var mP = -160.1;                               // foto de la expo en 16:9
      root.setProperty('--mP', mP + 'px');
      root.setProperty('--m0', m0 + 'px');
      root.setProperty('--m1', m1 + 'px');
      root.setProperty('--m2', m2 + 'px');
      vp.style.height = ((4437 + m0 + mP + m1 + m2) * sm) + 'px';
      header('m', sm);
      return;
    }
    var s = Math.min(w / 1920, 1);          // nada crece más allá de 1920
    var D = Math.max(1920, w / s);          // ancho de diseño del lienzo
    root.setProperty('--s', s.toString());
    // Párrafos a 18px reales solo en desktop (≥1280px); por debajo escalan con el diseño
    root.setProperty('--ts', Math.max(s, 1280 / 1920).toString());
    root.setProperty('--D', D + 'px');
    root.setProperty('--ox', ((D - 1920) / 2) + 'px');
    // Grabado del hero a todo el ancho: si crece, el resto de la página baja (--oy)
    var k = (1.019 * (D + 2)) / 1958.5;
    var oy = Math.max(0, 1772.4 * (k - 1));
    root.setProperty('--oy', oy + 'px');

    // Lo que va debajo de cada texto lo sigue (sube o baja) conservando las distancias del Figma
    var ex = document.getElementById('exhibition');
    var life = document.getElementById('life');
    var infos = document.getElementById('infos');
    var e1 = 1775 + ex.offsetHeight - 2074;                                   // fondo de The Exhibition en el Figma: 2074
    var lifeBottom = 3020 + life.offsetHeight;
    var oy2 = Math.max(lifeBottom + 60, 3781 + 40) - 3839;                    // la ola nunca sube sobre el retrato
    var oy3 = infos.offsetHeight + 116 - 570;                                 // 58px arriba y abajo en la tarjeta
    var y1 = oy + e1, y2 = y1 + oy2, y3 = y2 + oy3;
    root.setProperty('--y1', y1 + 'px');
    root.setProperty('--oy2', oy2 + 'px');
    root.setProperty('--oy3', oy3 + 'px');
    root.setProperty('--y2', y2 + 'px');
    root.setProperty('--y3', y3 + 'px');
    vp.style.height = ((5135 + y3) * s) + 'px';
  }

  // Menú hamburguesa (tablet y móvil)
  var menu = document.getElementById('t-menu');
  var openers = [document.getElementById('t-burger'), document.getElementById('m-burger')];
  function setMenu(open, opener) {
    menu.hidden = !open;
    openers.forEach(function (b) { if (b) b.setAttribute('aria-expanded', open ? 'true' : 'false'); });
    if (open) { var first = menu.querySelector('a'); if (first) first.focus(); }
    else if (opener) opener.focus();
  }
  var lastOpener = null;
  openers.forEach(function (b) { if (b) b.addEventListener('click', function () { lastOpener = b; setMenu(true); }); });
  document.getElementById('t-menu-close').addEventListener('click', function () { setMenu(false, lastOpener); });
  menu.addEventListener('click', function (e) {
    var a = e.target.closest('a[data-close]');
    if (!a) return;
    // En móvil los destinos llevan el prefijo m-
    if (html.classList.contains('mode-m')) {
      e.preventDefault();
      var id = a.getAttribute('href').replace('#t-', 'm-');
      setMenu(false);
      var el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    setMenu(false);
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !menu.hidden) setMenu(false, lastOpener); });
  fit();
  window.addEventListener('resize', fit);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
  window.addEventListener('load', fit);

  // Textos que flotan desde abajo
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return;
  var groups = [
    ['#nav ul li'],
    ['#exhibition h2', '#exhibition .txt'],
    ['#life h2', '#life .txt'],
    ['#infos h2', '#infos .txt'],
    ['#t-exhibition h2', '#t-exhibition .txt'],
    ['#t-life h2', '#t-life .txt'],
    ['#t-infos h2', '#t-infos .txt'],
    ['#m-exhibition h2', '#m-exhibition .txt'],
    ['#m-life h2', '#m-life .txt'],
    ['#m-infos h2', '#m-infos .txt']
  ];
  var pending = [];
  groups.forEach(function (sels) {
    var i = 0;
    sels.forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (el) {
        el.classList.add('reveal', 'pre');
        el.style.animationDelay = (i++ * 0.18) + 's';
        pending.push(el);
      });
    });
  });

  // Línea de activación: el borde inferior de la ventana al hacer scroll.
  // Si la página se muestra entera sin scroll, se usa la posición del mouse.
  var pointerY = 0;
  function canScroll() {
    return document.documentElement.scrollHeight > window.innerHeight + 4;
  }
  function check() {
    var limit = canScroll() ? window.innerHeight * 0.88 : pointerY + 260;
    pending = pending.filter(function (el) {
      if (el.getBoundingClientRect().top < limit) {
        el.classList.remove('pre');
        el.classList.add('in');
        return false;
      }
      return true;
    });
  }
  var queued = false;
  function schedule() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(function () { queued = false; check(); });
  }
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  document.addEventListener('pointermove', function (e) { pointerY = e.clientY; schedule(); }, { passive: true });
  document.addEventListener('touchmove', function (e) { if (e.touches[0]) { pointerY = e.touches[0].clientY; schedule(); } }, { passive: true });
  window.addEventListener('load', function () { setTimeout(check, 200); });
  setTimeout(check, 200);
})();
