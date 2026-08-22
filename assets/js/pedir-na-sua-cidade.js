/* Pedir na sua cidade - JS */
document.addEventListener("DOMContentLoaded", () => {
  const inputRua = document.getElementById("input-rua");
  const inputDestinatario = document.getElementById("input-destinatario");
  const inputFreguesia = document.getElementById("input-freguesia");
  const inputNome = document.getElementById("input-nome");
  const inputRuas = document.getElementById("input-ruas");
  const inputMorada = document.getElementById("input-morada");

  const displayRua = document.getElementById("display-rua");
  const displayRuaAssinatura = document.getElementById("display-rua-assinatura");
  const displayDestinatario = document.getElementById("display-destinatario");
  const displayFreguesia = document.getElementById("display-freguesia");
  const displayNome = document.getElementById("display-nome");
  const displayRuas = document.getElementById("display-ruas");
  const displayMorada = document.getElementById("display-morada");
  
  const mailtoButton = document.getElementById("botao-enviar-email");

    function atualizarCarta() {
        const rua = inputRua.value.trim() || "[a sua rua]";
        const destinatario = inputDestinatario.value.trim() || "[Presidente da Junta / Vereador(a) do Ambiente]";
        const freguesia = inputFreguesia.value.trim() || "[rua, freguesia]";
        const nome = inputNome.value.trim() || "[o seu nome]";
        const ruas = inputRuas.value.trim() || "[rua(s) para teste]";
        const morada = inputMorada.value.trim() || "[morada]";

        // Update live preview text safely
        if (displayRua) displayRua.textContent = rua;
        if (displayRuaAssinatura) displayRuaAssinatura.textContent = rua;
        if (displayDestinatario) displayDestinatario.textContent = destinatario;
        if (displayFreguesia) displayFreguesia.textContent = freguesia;
        if (displayNome) displayNome.textContent = nome;
        if (displayRuas) displayRuas.textContent = ruas;
        if (displayMorada) displayMorada.textContent = morada;

        // Build the email subject and body content dynamically
        const subject = `Papeleiras reviradas em ${rua}`;
        const body = 
    `Exmo.(a) Senhor(a) ${destinatario},

    Sou residente em ${freguesia} e escrevo por causa dos caixotes do lixo da minha rua.

    Desde que as embalagens passaram a valer depósito, há pessoas que as procuram dentro do lixo. Não escrevo a pedir multas — é indigno ter de meter as mãos entre resíduos por dez cêntimos. Mas o resultado também é mau para todos: o contentor acaba despejado no passeio e a rua fica pior do que estava.

    Existe uma solução simples, já usada há anos noutros países: o aro, um pequeno suporte em aço que se fixa aos caixotes do lixo já existentes. Quem não quer o reembolso pousa ali a garrafa ou a lata; quem a quer leva-a com a mão, sem tocar no lixo e sem espalhar nada. Está tudo explicado em arourbano.pt.

    O meu pedido é simples: que considerem testar aros na nossa cidade. Bastariam os caixotes do lixo da ${ruas} para perceber se resulta. Em arourbano.pt encontram o contacto da equipa, que faz uma visita técnica sem compromisso.

    Agradeço a atenção.
    ${nome}
    ${rua}, ${morada}`; // <-- Updated signature to include the new morada variable!

        // Safely encode for mailto protocols
        if (mailtoButton) {
          mailtoButton.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        }
      }

  // Listen to all inputs changing
  [inputRua, inputDestinatario, inputFreguesia, inputNome, inputRuas, inputMorada].forEach(input => {
    if (input) {
      input.addEventListener("input", atualizarCarta);
    }
  });

  // Run once on load to initialize default values
  atualizarCarta();
});