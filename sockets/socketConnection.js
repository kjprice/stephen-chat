let socketIo = null;

function initializeSocketSession(session) {
  if (!session.user) {
    session.user = {};
  }
  if (!session.user.logs) {
    session.user.logs = [];
  }
  session.save();
}

const newChatMessage = (session, msg) => {
  socketIo.emit("chat message", msg);
  session.user.logs.push(msg);
  session.save();
  console.log("session.logs", session.user.logs);
}

const setUsername = (session, username) => {
  session.user.username = username;
  session.save();

}

const handleConnection = socket => {
  const { session } = socket.request;
  initializeSocketSession(session);

  socket.emit("init_user", session.user);

  socket.on("chat message", (msg) => newChatMessage(session, msg));
  socket.on("set_username", (username) => setUsername(session, username));
}

const initialize = io => {
  socketIo = io;
  io.on("connection", handleConnection);
}

module.exports = initialize;