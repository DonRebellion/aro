/* Aro — comportamentos mínimos do site (sem dependências) */
(function () {
  'use strict';

  /* --- menu em ecrãs pequenos --- */
  var botao = document.querySelector('.menu-botao');
  var nav = document.getElementById('navegacao-principal');

  if (botao && nav) {
    botao.addEventListener('click', function () {
      var aberto = nav.classList.toggle('aberta');
      botao.setAttribute('aria-expanded', aberto ? 'true' : 'false');
    });

    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('aberta');
        botao.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('aberta')) {
        nav.classList.remove('aberta');
        botao.setAttribute('aria-expanded', 'false');
        botao.focus();
      }
    });
  }

  /* --- copiar carta modelo --- */
  document.querySelectorAll('[data-copiar]').forEach(function (btn) {
    var alvo = document.getElementById(btn.getAttribute('data-copiar'));
    if (!alvo) return;

    var etiqueta = btn.textContent;
    var relogio;

    btn.addEventListener('click', function () {
      var texto = (alvo.innerText || alvo.textContent).replace(/\n{3,}/g, '\n\n').trim();

      var confirmar = function () {
        btn.textContent = 'Copiado ✓';
        clearTimeout(relogio);
        relogio = setTimeout(function () { btn.textContent = etiqueta; }, 2600);
      };

      var reserva = function () {
        var caixa = document.createElement('textarea');
        caixa.value = texto;
        caixa.setAttribute('readonly', '');
        caixa.style.cssText = 'position:absolute;left:-9999px;top:0';
        document.body.appendChild(caixa);
        caixa.select();
        try { document.execCommand('copy'); confirmar(); }
        catch (e) { btn.textContent = 'Selecione e copie manualmente'; }
        document.body.removeChild(caixa);
      };

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(texto).then(confirmar, reserva);
      } else {
        reserva();
      }
    });
  });

  /* --- revelar blocos ao entrar no ecrã --- */
  var alvos = document.querySelectorAll('.aparece');
  if (!alvos.length) return;

  var reduzido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduzido || !('IntersectionObserver' in window)) {
    alvos.forEach(function (el) { el.classList.add('visivel'); });
    return;
  }

  var observador = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada) {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('visivel');
        observador.unobserve(entrada.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

  alvos.forEach(function (el) { observador.observe(el); });
})();
