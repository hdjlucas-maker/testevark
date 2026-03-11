const perguntas=[

"Quando você aprende algo novo prefere:",
"Quando alguém explica um caminho você prefere:",
"Para aprender algo difícil você:",
"Quando estuda para prova você:",
"Quando lembra de algo você lembra:",
"Quando está aprendendo um software novo:",
"Quando alguém te ensina algo:",
"Em uma palestra você prefere:",
"Quando está resolvendo um problema:",
"Quando compra algo novo você:",
"Em sala de aula você aprende melhor:",
"Quando precisa memorizar algo:",
"Se quer aprender algo rápido:",
"Quando recebe instruções:",
"Quando estuda sozinho:",
"Para entender melhor um assunto:"

]

const opcoes=[

["Ver diagramas","Ouvir explicação","Ler textos","Praticar"],
["Ver mapa","Ouvir direção","Ler instruções","Descobrir"],
["Fazer esquemas","Conversar","Escrever","Testar"],
["Mapas mentais","Áudio aula","Ler resumos","Exercícios"],
["Imagens","Conversas","Anotações","Experiência"],
["Assistir vídeo","Escutar","Ler manual","Testar"],
["Mostra imagens","Explica falando","Escreve","Demonstra"],
["Slides","Explicação","Texto","Demonstração"],
["Desenha solução","Discute","Escreve","Testa"],
["Vê fotos","Pergunta","Lê descrição","Experimenta"],
["Com imagens","Com explicação","Com leitura","Com prática"],
["Diagramas","Repetir","Escrever","Praticar"],
["Vídeo","Aula","Tutorial","Projeto"],
["Imagens","Explicação","Texto","Demonstração"],
["Esquemas","Fala","Resumo","Prática"],
["Gráficos","Discussão","Leitura","Experiência"]

]

const valores=["V","A","R","K"]

let atual=0
let respostas=[]

function mostrarPergunta(){

let q=perguntas[atual]

let html=`<h3>Pergunta ${atual+1} de 16</h3>`
html+=`<p>${q}</p>`

for(let i=0;i<4;i++){

html+=`<div class="option" onclick="responder('${valores[i]}')">${opcoes[atual][i]}</div>`

}

document.getElementById("quiz").innerHTML=html
document.getElementById("progress").style.width=((atual)/16*100)+"%"

}

function responder(valor){

respostas.push(valor)
atual++

if(atual<16){

mostrarPergunta()

}else{

document.getElementById("quiz").style.display="none"
document.getElementById("leadForm").style.display="block"

}

}

function salvarLead(){

let nome=document.getElementById("nome").value
let email=document.getElementById("email").value
let whatsapp=document.getElementById("whatsapp").value
let interesse=document.getElementById("interesse").value

if(!nome || !email || !whatsapp){

alert("Preencha todos os campos")
return

}

fetch("https://script.google.com/macros/s/AKfycbwJUoOy8MUSjaLozDhimhpZjvG0Jvb_8zUkIV_n9nHS-otKX1DN6F2gjHW4CVse0cA/exec",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

nome:nome,
email:email,
whatsapp:whatsapp,
interesse:interesse

})

})

.then(response => response.text())

.then(data => {

console.log("Lead salvo:",data)

mostrarResultado()

})

.catch(error => {

console.error("Erro:",error)

mostrarResultado()

})

}

function mostrarResultado(){

let V=0,A=0,R=0,K=0

respostas.forEach(r=>{

if(r=="V")V++
if(r=="A")A++
if(r=="R")R++
if(r=="K")K++

})

let maior=Math.max(V,A,R,K)

let estilo=""

if(maior==V)estilo="Visual"
if(maior==A)estilo="Auditivo"
if(maior==R)estilo="Leitura/Escrita"
if(maior==K)estilo="Cinestésico"

document.getElementById("leadForm").style.display="none"

let res=document.getElementById("resultado")

res.style.display="block"

res.innerHTML=`

<h2>Seu estilo é: ${estilo}</h2>

<p>Obrigado por realizar o teste.</p>

<button onclick="location.reload()">Refazer teste</button>

`

}

mostrarPergunta()
