const express = require('express')
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users");
const ecwid = require("./routes/api/ecwid");
const cors = require('cors')
const got = require('got')
const app = express()

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(bodyParser.json());
app.use(cors());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true , useUnifiedTopology: true }
  )
  .then(() => console.log("MongoDB sucessfully connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/users", users);
app.use("/api/ecwid", ecwid);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Helloed ${port} !`));