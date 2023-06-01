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

  const handleSubmit = (el, callback) => {
    el.addEventListener('submit', e => {
      e.preventDefault();
      callback(e);
    });
  }

  const updateUsername = () => {
    const newUsername = usernameInput.value;
    console.log({newUsername});
    socket.emit('set_username', newUsername);
  }
  const sendMessage = () => {
    if (sendMessageInput.value) {
      socket.emit('chat message', sendMessageInput.value);
      sendMessageInput.value = '';
    }
  }

  const initUser = user => {
    const { logs, username } = user;
    if (logs && logs.length) {
      displayMessages(logs);
    }
    if (username) {
      usernameInput.value = username;
    }
  }

  const receiveMessage = msg => {
    displayMessages([msg]);
  }

  handleSubmit(usernameForm, updateUsername)
  handleSubmit(sendMessageForm, sendMessage)

  socket.on('init_user', initUser);
  socket.on('chat message', receiveMessage);
}