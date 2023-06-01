function app() {
  const socket = io();

  const messagesContainer = document.getElementById('messages-container');
  const sendMessageForm = document.getElementById('send-message-form');
  const sendMessageInput = document.getElementById('send-message-input');
  const usernameForm = document.getElementById('username-form');
  const usernameInput = document.getElementById('username-input');
  
  function displayMessages(messages) {
    messages.forEach(msg => {
      const item = document.createElement('li');
      item.textContent = msg;
      messagesContainer.appendChild(item);  
    });
    window.scrollTo(0, document.body.scrollHeight);
  }

  usernameForm.addEventListener('submit', e => {
    e.preventDefault();
    const newUsername = usernameInput.value;
    console.log({newUsername});
    socket.emit('set_username', newUsername);
  });
  sendMessageForm.addEventListener('submit', function(e) {
    e.preventDefault();
    if (sendMessageInput.value) {
      socket.emit('chat message', sendMessageInput.value);
      sendMessageInput.value = '';
    }
  });

  socket.on('init_user', (user) => {
    const { logs, username } = user;
    if (logs && logs.length) {
      displayMessages(logs);
    }
    if (username) {
      usernameInput.value = username;
    }
  });

  socket.on('chat message', function(msg) {
    displayMessages([msg]);
  });
}