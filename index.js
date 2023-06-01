const express = require('express');
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
// const session = require("express-session");
const expressSession = require('./middleware/session');
const port = process.env.PORT || 4321;

// app.set('trust proxy', 1) // trust first proxy

app.use(express.static('public'));
app.use(expressSession);
io.engine.use(expressSession);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  const { session } = socket.request;
  if (!session.user) {
    session.user = {};
  }
  if (!session.user.logs) {
    session.user.logs = [];
  }
  session.save();
  socket.emit('init_user', session.user);
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
    session.user.logs.push(msg);
    session.save();
    console.log("session.logs", session.user.logs);
  });
  socket.on("set_username", (username) => {
    session.user.username = username;
    session.save();
  })
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});

// Stephen's 174.170.184.186
