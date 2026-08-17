/* voltinha — menu, animação de entrada, copiar email. Sem dependências. */
(function () {
  'use strict';

  /* ---- menu móvel ---- */
  var alternar = document.querySelector('.alternar');
  var nav = document.querySelector('.nav');
  if (alternar && nav) {
    alternar.addEventListener('click', function () {
      var aberta = nav.classList.toggle('nav--aberta');
      alternar.setAttribute('aria-expanded', aberta ? 'true' : 'false');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('nav--aberta');
        alternar.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---- animação de entrada ---- */
  var alvos = document.querySelectorAll('.aparece');
  var reduzido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduzido || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(alvos, function (el) {
      el.classList.add('aparece--visivel');
    });
  } else {
    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('aparece--visivel');
          obs.unobserve(entrada.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    Array.prototype.forEach.call(alvos, function (el) { obs.observe(el); });
  }

  /* ---- copiar o email ---- */
  /* Extrai texto limpo: cada paragrafo numa linha, <br> respeitado,
     e a indentacao do HTML descartada. */
  function juntaLinhas(bloco) {
    var clone = bloco.cloneNode(true);
    Array.prototype.forEach.call(clone.querySelectorAll('br'), function (br) {
      br.replaceWith('\u0000');
    });
    return clone.textContent.split('\u0000').map(function (linha) {
      return linha.replace(/\s+/g, ' ').trim();
    }).filter(function (linha) { return linha.length; }).join('\n');
  }

  function textoLimpo(container) {
    var partes = [];
    Array.prototype.forEach.call(container.children, function (filho) {
      var etiqueta = filho.tagName.toLowerCase();
      if (etiqueta === 'ul' || etiqueta === 'ol') {
        var itens = Array.prototype.map.call(filho.children, function (li) {
          return '- ' + juntaLinhas(li);
        });
        if (itens.length) { partes.push(itens.join('\n')); }
      } else {
        var texto = juntaLinhas(filho);
        if (texto) { partes.push(texto); }
      }
    });
    return partes.join('\n\n');
  }

  Array.prototype.forEach.call(document.querySelectorAll('[data-copiar]'), function (botao) {
    var etiqueta = botao.querySelector('[data-etiqueta]');
    var original = etiqueta ? etiqueta.textContent : '';
    botao.addEventListener('click', function () {
      var fonte = document.getElementById(botao.getAttribute('data-copiar'));
      if (!fonte) { return; }
      var texto = textoLimpo(fonte);

      var feito = function () {
        botao.classList.add('copiar--feito');
        if (etiqueta) { etiqueta.textContent = 'Copiado'; }
        window.setTimeout(function () {
          botao.classList.remove('copiar--feito');
          if (etiqueta) { etiqueta.textContent = original; }
        }, 2400);
      };

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(texto).then(feito, reserva);
      } else {
        reserva();
      }

      function reserva() {
        var area = document.createElement('textarea');
        area.value = texto;
        area.setAttribute('readonly', '');
        area.style.position = 'fixed';
        area.style.top = '-1000px';
        document.body.appendChild(area);
        area.select();
        try { document.execCommand('copy'); feito(); } catch (erro) {
          if (etiqueta) { etiqueta.textContent = 'Selecione e copie'; }
        }
        document.body.removeChild(area);
      }
    });
  });
})();
