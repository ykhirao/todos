const express = require('express')
const bodyParser = require('body-parser');
const TodoController = require('./controllers/TodoController')
const port = 3000

const app = express()
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get('/', TodoController.index)
app.get('/create', TodoController.index)
app.post('/create', TodoController.create)

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
