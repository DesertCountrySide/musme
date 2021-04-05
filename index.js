const express = require('express')
const cors = require('cors')
const got = require('got')
const app = express()
const port = 3000
const MongoClient = require('mongodb').MongoClient
const connectionString = "mongodb+srv://musme:vedangmusme@cluster0.zovag.mongodb.net/MusMeDB?retryWrites=true&w=majority"
const secretToken = "secret_yjrwZASe4jNqg571avHhSfgDbKegqLRQ"
const storeId = 36603154
const ordersURL = `https://app.ecwid.com/api/v3/${storeId}/orders?token=${secretToken}`
const productsURL = `https://app.ecwid.com/api/v3/${storeId}/products?token=${secretToken}`
const categoryURL = `https://app.ecwid.com/api/v3/${storeId}/categories?token=${secretToken}&productIds=true`

app.get('/getAudio', cors() ,(req, res) => {
    try {
      const audioURL = req.query.adminUrl
      console.log(audioURL)
      fetch(audioURL).then((response)=>{
        console.log(response)
        res.send(response)
      })
    } catch (error) {
      console.log(error.response);
    }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


// MongoClient.connect(connectionString, {useUnifiedTopology: true}, (err, client) => {
//   if (err) return console.error(err)
//     console.log('Connected to Database')
//     const db = client.db('MusMeDB')
// })