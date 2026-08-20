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
  var reduzido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (alvos.length && !reduzido && ('IntersectionObserver' in window)) {
    var observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('visivel');
          observador.unobserve(entrada.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    alvos.forEach(function (el) { observador.observe(el); });
  } else if (alvos.length) {
    alvos.forEach(function (el) { el.classList.add('visivel'); });
  }

  /* --- destacar âncoras no menu ao fazer scroll e clique --- */
  var secoesComId = document.querySelectorAll('section[id]');
  var linksMenu = document.querySelectorAll('.navegacao a');
  var isManualScrolling = false;
  var scrollTimeout = null;

  if (linksMenu.length) {
    linksMenu.forEach(function (link) {
      var href = link.getAttribute('href');
      if (href && href.indexOf('#') !== -1) {
        link.addEventListener('click', function () {
          // Bloqueia imediatamente o observer de scroll
          isManualScrolling = true;
          if (scrollTimeout) clearTimeout(scrollTimeout);

          // Aplica o active de forma estrita apenas ao link clicado
          linksMenu.forEach(function (a) {
            a.classList.remove('is-active');
          });
          this.classList.add('is-active');

          // Liberta o bloqueio após a animação de scroll terminar
          scrollTimeout = setTimeout(function () {
            isManualScrolling = false;
          }, 1000);
        });
      }
    });
  }

  if (secoesComId.length && linksMenu.length && ('IntersectionObserver' in window)) {
    var observadorMenu = new IntersectionObserver(function (entradas) {
      // Se o utilizador clicou num link, ignora completamente as secções intermédias
      if (isManualScrolling) return;

      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
          var id = entrada.target.getAttribute('id');
          
          linksMenu.keyCount = linksMenu.forEach(function (a) {
            a.classList.remove('is-active');
          });

          var linkAtivo = document.querySelector('.navegacao a[href*="#' + id + '"]');
          if (linkAtivo) {
            linkAtivo.classList.add('is-active');
          }
        }
      });
    }, { threshold: 0.3 });

    secoesComId.forEach(function (secao) {
      observadorMenu.observe(secao);
    });
  }

})();

/* Slider */
document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector(".aro-slider-track");
    if (!track) return; 
    
    const slides = Array.from(track.children);
    
    slides.forEach(slide => {
      const clone = slide.cloneNode(true);
      track.appendChild(clone);
    });

    const totalSlides = track.children.length;
    const originalCount = totalSlides / 2;

    track.style.setProperty("--total-slides", totalSlides);
    track.style.setProperty("--half-slides", originalCount);
});