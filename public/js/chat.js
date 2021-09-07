const socket = io();

const $messageForm = document.querySelector("#message-form");
const $messageFormInput = $messageForm.querySelector("input");
const $messageFormButton = $messageForm.querySelector("#button");
const $messages = document.querySelector("#messages");
const messageTemplate = document.querySelector("#message-template").innerHTML;

// receive msg data from server to client//
socket.on("message", (message) => {
  console.log(message);
  const html = Mustache.render(messageTemplate, { message });
  $messages.insertAdjacentHTML("beforeend", html);
});

// grabbing the form for responding
document.querySelector("#message-form").addEventListener("submit", (e) => {
  e.preventDefault();

  // grabbing the text inside the message
  const userMessage = document.querySelector("input").value;

  // sending user_message from client side to server
  socket.emit("sendMessage", userMessage);

  $messageFormInput.value = "";
  $messageFormInput.focus();
});
