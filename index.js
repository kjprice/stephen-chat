const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const session = require("express-session");
const port = process.env.PORT || 4321;

// app.set('trust proxy', 1) // trust first proxy
const expresssession = session({
  secret: "stephenandkjsupersecretproject",
  // resave: false,
  // saveUninitialized: true,
  cookie: { secure: false },
});

app.use(expresssession);
io.engine.use(expresssession);

app.get("/", (req, res) => {
  console.log("req.sessionID", req.sessionID);
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  // console.log(socket.handshake)
  console.log(socket.request.session);
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
