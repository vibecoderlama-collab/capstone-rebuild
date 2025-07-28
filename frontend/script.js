const chatMessages = document.getElementById('chat-messages');
const chatForm = document.getElementById('chat-form');
const messageInput = document.getElementById('message-input');

const socket = new WebSocket('ws://192.168.1.66:3000');

socket.onopen = () => {
  socket.send("Hello, server!");
}
socket.onmessage = (event) => {
  const message = document.createElement('div');
  message.textContent = event.data;
  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
};

chatForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const message = messageInput.value;
  if (message.trim() !== '') {
    socket.send(message);
    messageInput.value = '';
  }
})