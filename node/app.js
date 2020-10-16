const express = require('express')
const app = express()
const port = 3000

const sampleController  = require('./controllers/samplecontrol');

app.set("view engine", "ejs");

app.get('/sample', sampleController.rootAccessControl)

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
