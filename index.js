const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
// const session = require("express-session");
const expressSession = require('./middleware/session');
const port = process.env.PORT || 4321;

// app.set('trust proxy', 1) // trust first proxy

app.use(expressSession);
io.engine.use(expressSession);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  const { session } = socket.request;
  if (!session.logs) {
    session.logs = [];
    session.save();
  } else {
    session.logs.forEach((msg) => {
      socket.emit("chat message", msg);
    });
  }
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
    session.logs.push(msg);
    session.save();
    console.log("session.logs", session.logs);
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});

// Stephen's 174.170.184.186
