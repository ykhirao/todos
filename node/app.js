const express = require('express')
const app = express()
const port = 3000

const TodoController = require('./controllers/TodoController')

app.set("view engine", "ejs");

app.get('/', TodoController.index)

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
