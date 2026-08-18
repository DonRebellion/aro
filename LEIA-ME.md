# aro — site

Página única em português (pt-PT), mais duas páginas dedicadas, construída sobre
o **aro brand kit v1** (agosto de 2026). Sem dependências e sem passo de build:
abra `index.html` num navegador ou coloque a pasta num alojamento estático.

---

## ⚠️ Uma coisa antes de publicar

**Ligar o formulário.** Em `contacto.html`:

```html
<form class="formulario" action="https://formspree.io/f/SUBSTITUIR_PELO_SEU_ID" method="POST">
```

Crie uma conta gratuita em [Formspree](https://formspree.io), cole o ID do seu
formulário e substitua `SUBSTITUIR_PELO_SEU_ID`. Enquanto isso não for feito, o
formulário não envia nada. Alternativas: Basin, Getform, Netlify Forms.

O domínio `arotec.pt` já está em `sitemap.xml`, `robots.txt` e no modelo de email.

---

## Estrutura

```
aro-site/
├── index.html                Página única: problema · impacto · como funciona ·
│                             evidência · identidade · FAQ
├── pedir-na-sua-cidade.html  Modelo de email para residentes
├── contacto.html             Formulário
├── 404.html
├── robots.txt · sitemap.xml
└── assets/
    ├── css/estilo.css        Folha de estilo única
    ├── js/aro.js             Menu móvel, botão «copiar», animação de entrada
    ├── fonts/                Outfit variável, latin + latin-ext (auto-alojada)
    ├── logo/ · img/          Lockups, produto, simulações, imagem Open Graph
    │                         (aro-logo-plum e aro-mark-magenta ficam por usar —
    │                          são as variantes do kit para fundos claros e para
    │                          a marca isolada)
    └── favicon.svg · favicon-32.png · apple-touch-icon-180.png
```

A navegação aponta para âncoras (`index.html#impacto`, `index.html#como-funciona`),
por isso funciona a partir de qualquer das três páginas.

## Decisões de conteúdo

**Slogan.** O herói passou a usar **«Ninguém devia ter de revirar o lixo.»** em vez
de «O aro que fecha o ciclo». O anterior é elegante mas abstrato — não diz o
problema, e quem chega ao site sem contexto não percebe para que serve o produto.
O novo diz o problema e a questão moral em sete palavras, e ecoa a frase oficial
do brand kit, que já termina «…e ninguém tem de revirar o lixo».

«O aro que fecha o ciclo» já não aparece no site — o rodapé usa agora o mesmo
slogan do herói. Continua a ser o tagline do brand kit e do deck; se quiser
recuperá-lo, é uma linha no rodapé.

**Sem secção de produto.** As especificações técnicas, o material e as dimensões
saíram do site — pertencem ao deck. O que sobrevive é a legenda sob a imagem do
herói (`ARO-100 · protótipo em aço inox`) e duas respostas da FAQ, que cobrem o
aço inox e a facilidade de instalação sem transformar a página numa ficha técnica.

**Sem preços** e sem nomes ou emails pessoais — todo o contacto passa pelo formulário.

**Ordem das secções.** O impacto vem antes do «como funciona»: primeiro o que
muda, depois a mecânica. Quem está a decidir se se importa não precisa de perceber
o mecanismo primeiro.

## Animação

Tudo com a mesma curva (`--suave`) e a mesma distância, para o site se mover como
se fosse um só material:

- **Ao carregar:** herói e topo de página entram escalonados (título → subtítulo →
  botões), a imagem com uma subida de escala ligeira.
- **Ao percorrer:** blocos entram por `IntersectionObserver`; dentro de grelhas, os
  cartões entram um a um com 90 ms de intervalo.
- **Ao apontar:** cartões sobem 3 px e ganham contorno magenta, o ícone roda ligeiramente,
  as imagens fazem um zoom de 3,5 %, o botão de acento ganha sombra magenta.
- **Menu móvel:** as três barras transformam-se num ✕.

As entradas escalonadas usam `animation` com `fill-mode: backwards` em vez de
`transition` — de propósito. Com `transition`, a regra de revelação (três classes)
ganhava em especificidade ao `:hover` e bloqueava o transform; com `animation`, o
elemento volta às regras normais assim que a entrada acaba.

`prefers-reduced-motion: reduce` desliga tudo — durações, atrasos e transforms de
hover.

## Marca

Do brand kit, tudo no bloco `:root` de `estilo.css`:

| Papel | Cor | Uso |
|---|---|---|
| Ameixa `#2A1B33` | dominante | herói, secção de impacto, chamadas, rodapé |
| Areia `#F4EBDD` | papel | fundos claros e texto sobre ameixa |
| Magenta `#FF2E7E` | acento | a marca, os ícones e **um** botão por vista |
| Magenta escuro `#B0164F` | texto | magenta legível sobre fundos claros |
| Pedra `#6B665B` | texto secundário | escurecido face ao `#8C8577` do kit para passar AA |

Regras seguidas: nenhum azul, verde ou amarelo na interface; botões magenta com
rótulo ameixa e nunca branco; `aro` sempre em minúsculas no corpo do texto,
`ARO-100` em maiúsculas em contexto técnico; o logótipo é arte vetorial, nunca
texto vivo.

**Ícones.** Conjunto próprio, traço de 1,75 px, cantos redondos, sempre em magenta
sobre um quadrado com 12 % de magenta. Magenta em ícones é permitido pelo kit
(3,0:1) — em texto não, e no site nunca é usado assim.

**Tipo:** Outfit auto-alojada em `assets/fonts/` (variável, latin e latin-ext,
~47 KB). Funciona offline e sem chamadas ao Google.

## Imagens

O render com halo branco foi removido do projeto. Restam o produto em aço sobre
fundo neutro e as duas simulações municipais, que são **mockups** — o site diz isso
em todas as legendas e nenhum município subscreveu o que quer que seja.

Continua em falta, e vale a pena encomendar antes do lançamento: **uma fotografia
de uma unidade fixada a uma papeleira real, numa rua real.** Todos os renders
mostram o produto a flutuar em estúdio, o que enfraquece precisamente o argumento
central — o de que encaixa nas papeleiras que já existem.

## Acessibilidade

Todos os pares texto/fundo medidos contra a WCAG 2.1 AA. Navegação por teclado com
foco visível e ligação «saltar para o conteúdo», imagens com texto alternativo,
`prefers-reduced-motion` respeitado, folha de impressão utilizável.

---

© 2026 aro
