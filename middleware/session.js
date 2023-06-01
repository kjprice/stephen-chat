const MongoStore = require('connect-mongo');
const session = require("express-session");

const expressSession = session({
  store: MongoStore.create({
    mongoUrl: 'mongodb://127.0.0.1:27017/stephenChat'
  }),
  secret: "stephenandkjsupersecretproject",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
});

module.exports = expressSession;