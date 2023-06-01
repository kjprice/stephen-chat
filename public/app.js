function app() {
  const socket = io();

  const messagesContainer = document.getElementById('messages-container');
  const sendMessageForm = document.getElementById('send-message-form');
  const sendMessageInput = document.getElementById('send-message-input');

  sendMessageForm.addEventListener('submit', function(e) {
    e.preventDefault();
    if (sendMessageInput.value) {
      socket.emit('chat message', sendMessageInput.value);
      sendMessageInput.value = '';
    }
  });

  socket.on('chat message', function(msg) {
    const item = document.createElement('li');
    item.textContent = msg;
    messagesContainer.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
  });
}