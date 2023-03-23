// ts-nocheck
const remetente = `<div class="chatMessageRemetente">`;
const destinatario = `<div class="chatMessageDestinatario">`;

const chatMessage = document.querySelector(".chatMessage");

const button = document.querySelector("button");
button.addEventListener("click", sendMessage);

function getMessage() {
  return document.querySelector("#message");
}

function setInputMensagem(message) {
  document.querySelector("#message").value = message;
}

async function sendMessage(event) {
  event.preventDefault();
  const message = getMessage().value;
  if (message === "") return;
  createMessage(message);
  setInputMensagem("");
  chatMessage.scrollTop = chatMessage.scrollHeight;
  getMessage().focus();
  await botMessage(message);
  chatMessage.scrollTop = chatMessage.scrollHeight;
}

function createMessage(message) {
  const createMessageRemetente = `<div class="chatMessageContent">
        <h3>Você diz:</h3>
        <p>${message}</p>
    </div>`;
  chatMessage.innerHTML += remetente + createMessageRemetente + "</div>";
}
async function botMessage(mensagem) {
  const message = `<div class="chatMessageContent">
                        <h3>Atendente diz:</h3>
                        <p>${await postChatGpt3(mensagem)}</p>
                    </div>`;
  const criadores = `<div class="chatMessageContent">
                        <h3>Atendente diz:</h3>
                        <p> App feito por: Luiz Antonio e Arthur Romansini</p>
                    </div>`;

  if (mensagem?.toLowerCase() == "quem criou esse app?")
    return (chatMessage.innerHTML += destinatario + criadores + "</div>");
  return (chatMessage.innerHTML += destinatario + message + "</div>");
}

async function postChatGpt3(prompt) {
  try{
     // para o chat funcionar coloque sua chave de API do OpenAI voce pode encontrar a sua no link a baixo
  // https://platform.openai.com/account/api-keys
  const API_KEY = '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'
  const API_URL =
    "https://api.openai.com/v1/engines/text-davinci-003/completions";
  const rest = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
      language: "pt-br",
    },
    body: JSON.stringify({
      prompt,
      temperature: 0.9,
      max_tokens: 4000,
    }),
  });
  const data = await rest.json();
  return await data.choices[0].text;
  }
  catch(err){
    console.log(err)
    return "Desculpe, houve um erro no servidor, tente novamente mais tarde, ou tente mudar sua Api Key no arquivo script.js"
  }

}
