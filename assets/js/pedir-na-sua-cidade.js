/* Pedir na sua cidade - JS */
document.addEventListener("DOMContentLoaded", () => {
  const inputMorada = document.getElementById("input-morada");
  const inputDestinatario = document.getElementById("input-destinatario");
  const inputFreguesia = document.getElementById("input-freguesia");
  const inputNome = document.getElementById("input-nome");
  const inputRuas = document.getElementById("input-ruas");

  const displayDestinatario = document.getElementById("display-destinatario");
  const displayFreguesia = document.getElementById("display-freguesia");
  const displayNome = document.getElementById("display-nome");
  const displayMorada = document.getElementById("display-morada");
  
  const mailtoButton = document.getElementById("botao-enviar-email");

  function atualizarCarta() {
    const morada = inputMorada.value.trim() || "[morada]";
    const destinatario = inputDestinatario.value.trim() || "[Presidente da Junta / Vereador(a) do Ambiente]";
    const freguesia = inputFreguesia.value.trim() || "[rua, freguesia]";
    const nome = inputNome.value.trim() || "[o seu nome]";
    const ruas = inputRuas.value.trim() || "[rua(s) para teste]";

    // Update ALL elements with id="display-ruas" safely
    document.querySelectorAll("#display-ruas").forEach(el => {
      el.textContent = ruas;
    });

    if (displayDestinatario) displayDestinatario.textContent = destinatario;
    if (displayFreguesia) displayFreguesia.textContent = freguesia;
    if (displayNome) displayNome.textContent = nome;
    if (displayMorada) displayMorada.textContent = morada;

    // Build the email subject and body content dynamically matching your HTML text
    const subject = `Caixotes do lixo reviradas em ${ruas}`;
    const body = 
`Exmo.(a) Senhor(a) ${destinatario},

Sou residente em ${freguesia} e escrevo-lhe a propósito dos caixotes do lixo na minha rua.

Desde que as embalagens passaram a ter valor depósito, há pessoas que as procuram dentro do lixo. Não escrevo a pedir multas ou medidas de penalização - escrevo porque não deveria ser necessário colocar as mãos entre resíduos para recuperar dez cêntimos. É indigno para quem o tem de fazer. E esta situação tem consequências para todos: os caixotes do lixo e contentores acabam por ser despejados nos passeios, deixando lixo espalhado e tornando as ruas mais sujas e sujeitas a pragas.

Existe uma solução simples, já usada há anos noutros países: o aro, um pequeno suporte em aço que se fixa aos caixotes do lixo já existentes. Quem não quer o reembolso pode ali deixar a garrafa ou a lata; quem a quiser recolher pode fazê-lo diretamente, sem ter de tocar no lixo nem o espalhar.

O meu pedido é simples: que considerem testar o aro na nossa cidade. Bastaria instalá-lo em alguns caixotes da rua ${ruas} para avaliar se funciona e qual o impacto na limpeza do espaço público.

Pode saber mais sobre a solução em https://arourbano.pt.

Agradeço a atenção.
${nome}
${morada}`;

    if (mailtoButton) {
      mailtoButton.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
  }

  [inputMorada, inputDestinatario, inputFreguesia, inputNome, inputRuas].forEach(input => {
    if (input) {
      input.addEventListener("input", atualizarCarta);
    }
  });

  atualizarCarta();
});