const express = require("express");
const path = require("path");
const session = require("express-session");
const handlebars = require("express-handlebars");
const routes = require("./controllers");
const sequelize = require("./config/connection");
const PORT = process.env.PORT || 3001;
const cookieStorage = require("connect-session-sequelize")(session.Store);
const app = express();
const handlebarsConnection = handlebars.create();

const sesh = {
  secret: "hello",
  cookie: {
    maxAge: 100000,
  },
  store: new cookieStorage({ db: sequelize }),
};
app.engine("handlebars", handlebarsConnection.engine);
app.set("view engine", "handlebars");

app.use(session(sesh));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(routes);
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});
