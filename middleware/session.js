const session = require("express-session");

const expressSession = session({
  secret: "stephenandkjsupersecretproject",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
});

module.exports = expressSession;