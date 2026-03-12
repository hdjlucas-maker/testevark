document.getElementById("leadForm").addEventListener("submit", function(e) {
  e.preventDefault();

  // Dados pessoais
  const payload = {
    Nome: document.getElementById("nome").value,
    Email: document.getElementById("email").value,
    WhatsApp: document.getElementById("whatsapp").value,
    Interesse: document.getElementById("interesse").value,
    Data: new Date().toISOString()
  };

  // Respostas do quiz
  document.querySelectorAll("input[type=radio]:checked, input[type=checkbox]:checked").forEach(input => {
    payload[input.name] = input.value;
  });

  // Envio para SheetMonkey
  fetch("https://api.sheetmonkey.io/form/o3eybVdfWTEE3mZH3ztuch", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  })
  .then(res => {
    if (res.ok) {
      document.getElementById("leadForm").reset();
      document.getElementById("mensagem").innerHTML = "<p style='color:green'>Respostas enviadas com sucesso!</p>";
    } else {
      document.getElementById("mensagem").innerHTML = "<p style='color:red'>Erro ao enviar os dados.</p>";
    }
  })
  .catch(error => {
    console.error("Erro:", error);
    document.getElementById("mensagem").innerHTML = "<p style='color:red'>Falha na conexão.</p>";
  });
});
