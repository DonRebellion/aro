# voltinha — site

Site estático em português (pt-PT). Duas páginas, sem build, sem framework,
sem dependências. Abra `index.html` num navegador ou coloque a pasta inteira
num alojamento estático.

```
voltinha-site/
├── index.html                  Página única: problema, como funciona,
│                               o que muda, produto, municípios, contacto
├── pedir-na-sua-cidade.html    A carta: modelo de email para residentes
├── 404.html
├── robots.txt · sitemap.xml
├── favicon-32.png · favicon-192.png · apple-touch-icon-180.png
└── assets/
    ├── css/voltinha.css             Folha de estilo única. Tokens no :root
    ├── js/voltinha.js               Menu, animação de entrada, copiar email
    ├── img/                    Logótipos, renders, imagem Open Graph
    └── modelos/                Os dois emails em .txt para descarregar
```

## Antes de publicar

1. Substituir `https://voltinha.pt` em `sitemap.xml`, `robots.txt` e nas metatags
   `og:url` / `og:image` / `canonical` pelo domínio real.
2. Confirmar o email de contacto (`florian.rehm@gmail.com`) nas duas páginas
   e no ficheiro `assets/modelos/voltinha-modelos-email.txt`.
3. Ver a nota sobre a marca, mais abaixo.

## Publicar

Netlify ou Vercel: arraste a pasta para a área de *drag & drop*.
GitHub Pages: carregue o conteúdo e ative Pages no ramo principal.
Alojamento tradicional: FTP para a raiz do domínio.

## Marca

Cores, tipografia e espaçamentos estão no bloco `:root` de `assets/css/voltinha.css`
e são os mesmos do brand kit.

| Token | Hex | Papel |
|---|---|---|
| `--ameixa` | `#2A1B33` | Cor dominante. Fundos escuros, pé de página |
| `--areia` | `#F4EBDD` | Papel. Fundo claro, texto sobre ameixa |
| `--magenta` | `#FF2E7E` | Acento. A marca, um botão por vista |
| `--magenta-texto` | `#B0164F` | Magenta **para texto** sobre fundos claros |
| `--pedra` | `#8C8577` | Texto secundário sobre areia |

Duas regras que não devem ser alteradas sem verificar o contraste:

- **Magenta nunca é texto corrido sobre fundo claro** (3,0:1, chumba no AA).
  Para texto use `--magenta-texto` (5,8:1 sobre areia).
- **Um botão magenta leva texto ameixa**, não branco. Branco sobre magenta dá
  3,5:1 e chumba; ameixa sobre magenta dá 4,6:1 e passa.

Sem azul em lado nenhum: a identidade do sistema Volta é azul e o objetivo desta
paleta é não haver confusão. Sem amarelo nem verde, que são as cores do ecoponto.

Tipo de letra: **Outfit** (Google Fonts), pesos 400, 500 e 700. Está a ser
carregado por CDN. Para alojar localmente: `npm i @fontsource-variable/outfit`
e subconjunto `latin` + `latin-ext` (o português precisa de latin-ext).

## A carta

`pedir-na-sua-cidade.html` tem dois modelos de email — versão curta primeiro,
porque é a que a maioria vai usar. Os botões «Copiar email» convertem o HTML em
texto simples: um parágrafo por linha, listas com hífen, sem a indentação do
código. Funciona com `navigator.clipboard` e tem alternativa para navegadores
antigos e contextos sem HTTPS.

Se editar os modelos, mantenha a estrutura: um `<p>` por parágrafo, `<ul>` para
listas, `<mark>` nos campos a preencher. O JavaScript depende disso.

Os mesmos textos estão em `assets/modelos/voltinha-modelos-email.txt`, ligados pelo
botão de descarregar. **Se alterar o HTML, altere também o .txt.**

## Imagens

As simulações em cores municipais (Porto, Matosinhos) são **apenas ilustrativas**
e o site diz isso em todas as legendas. Não implicam acordo, parceria nem endosso
de qualquer município. Mantenha essas notas.

Falta uma fotografia de uma unidade instalada numa papeleira real, na rua. Todos
os visuais atuais são renders de estúdio, o que enfraquece a afirmação de que o
suporte serve as papeleiras existentes. É a imagem que mais falta ao site.

## Conteúdo — o que confirmar

- Os números (100 M embalagens, 38 % de recolha, €0,10 de depósito) são de 2026
  e devem ser atualizados à medida que o sistema evolui.
- A citação do Ministério do Ambiente e Energia é de 27 de julho de 2026.
- Os limiares de contratação pública (€75 000 de ajuste direto, €130 000 de
  consulta prévia) são informação de enquadramento e o site diz explicitamente
  que não constituem parecer jurídico.
- «Fabricado em Portugal» aparece em três lugares. Confirme que a produção é de
  facto nacional antes de publicar: é uma afirmação verificável.
- **A marca «voltinha» não tem registo confirmado.** Um fabricante de tubos detém uma
  marca semelhante em classe próxima. Não impede o site, mas convém uma pesquisa
  de anterioridades antes de investir em sinalética, merchandising ou impressão.

## Acessibilidade

- Contrastes medidos e documentados acima.
- Navegação por teclado com foco visível e ligação «saltar para o conteúdo».
- Menu móvel com `aria-expanded` e `aria-controls`.
- Ícones decorativos com `aria-hidden`, imagens com texto alternativo descritivo.
- Respeita `prefers-reduced-motion`: sem animação de entrada nem *smooth scroll*.
- Folha de impressão utilizável nas duas páginas.

---

© 2026 voltinha
