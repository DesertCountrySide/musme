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

//   (async () => {
//     try {
//       const audioURL = req.query.adminUrl
//       const response = await got(audioURL, {contentType: 'blob'})
//       // res.type('blob')
//       // console.log();
//       // res.send({'test':response})
//       // const buffer = Buffer.from([response]);
//       // res.send(buffer)
//       // console.log(response.body)
//       res.type('blob')
//       res.contentType('audio/mp3')
//       res.send(response.body)
//     } catch (error) {
//       console.log(error);
//     }
//   })();
  // (async () => {
  //   try {
      
  //   //   await got(audioURL).then(response => 
  //   //     response.blob().then(data => ({
  //   //       data: data,
  //   //       status: response.status
  //   //     })
  //   //   ).then(resp => {
  //   //     console.log("response")
  //   //   }))
  //   // } catch(e){
  //   //   console.log(e)
  //   // }
  // })();
// })

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// })


// MongoClient.connect(connectionString, {useUnifiedTopology: true}, (err, client) => {
//   if (err) return console.error(err)
//     console.log('Connected to Database')
//     const db = client.db('MusMeDB')
// })