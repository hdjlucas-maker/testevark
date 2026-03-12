document.getElementById("leadForm").addEventListener("submit", function(e) {
  e.preventDefault();

  // Dados pessoais
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const whatsapp = document.getElementById("whatsapp").value;
  const interesse = document.getElementById("interesse").value;

  // Captura das respostas do quiz
  // Exemplo: se cada pergunta tem um input radio com name="pergunta1", "pergunta2" etc.
  const resposta1 = document.querySelector('input[name="pergunta1"]:checked')?.value || "";
  const resposta2 = document.querySelector('input[name="pergunta2"]:checked')?.value || "";
  const resposta3 = document.querySelector('input[name="pergunta3"]:checked')?.value || "";
  const resposta4 = document.querySelector('input[name="pergunta4"]:checked')?.value || "";
  const resposta5 = document.querySelector('input[name="pergunta5"]:checked')?.value || "";

  // Envio para o SheetMonkey
  fetch("https://api.sheetmonkey.io/form/o3eybVdfWTEE3mZH3ztuch", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      Nome: nome,
      Email: email,
      WhatsApp: whatsapp,
      Interesse: interesse,
      Pergunta1: resposta1,
      Pergunta2: resposta2,
      Pergunta3: resposta3,
      Pergunta4: resposta4,
      Pergunta5: resposta5,
      Data: new Date().toISOString()
    })
  })
  .then(res => {
    if (res.ok) {
      document.getElementById("leadForm").reset();
      alert("Respostas enviadas com sucesso!");
    } else {
      alert("Erro ao enviar os dados.");
    }
  })
  .catch(error => {
    console.error("Erro:", error);
    alert("Falha na conexão.");
  });
});
