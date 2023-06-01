const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
// const session = require("express-session");
const expressSession = require("./middleware/session");
const initializeSocketIo = require("./sockets/socketConnection");
const port = process.env.PORT || 4321;

// app.set('trust proxy', 1) // trust first proxy

app.use(express.static("public"));
app.use(expressSession);
io.engine.use(expressSession);

initializeSocketIo(io);

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
