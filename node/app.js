const express = require('express')
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000
const app = express()
const methodOverride = require('method-override')
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('data.sqlite3')
const fs = require('fs')

if (!fs.existsSync('data.sqlite3')) {
  // データベースが存在しないとき
  require('./scripts/seed.js')
}

const router = express.Router()
router.param('todo_id', function (req, res, next, id) {
  req.todo = {
    id,
  }
  next()
})

router.route('/')
  .get(function (req, res, next) {
    db.serialize(function() {
      db.all('SELECT id, text, completed FROM todos', (err, rows) => {
        if (err) {
          // console.log(err)
          // とりあえずエラーは握りつぶす
          rows = []
        }
        res.render("top", { rows })
      });
    })
  })

router.route('/todo')
  .post(function (req, res, next) {
    const todo = req.body.todo;

    if (typeof todo === "string" && todo !== "") {
      db.serialize(function() {
        const stmt = db.prepare('INSERT INTO todos (text, completed) VALUES (?, 0)')
        stmt.run(todo)
        stmt.finalize()
      })
    }

    res.redirect("/")
  })

router
  .route('/todo/:todo_id')
  // .get(function (req, res, next) {
  //   db.serialize(function() {
  //     const stmt = db.prepare('SELECT id, text, completed FROM todos WHERE id = (?)')

  //     stmt.get(req.todo.id, (err, row) => {
  //       if (err) res.send("エラーが発生しました")
  //       console.log(row)
  //       stmt.finalize()
  //     })
  //   })
  // })
  .put(function (req, res, next) {
    if (["0", "1"].includes(req.body.completed)) {
      db.serialize(function() {
        const stmt = db.prepare('UPDATE todos SET completed = (?) WHERE id = (?)')
        stmt.run(!Number(req.body.completed), req.todo.id)
        stmt.finalize()
      })
    }

    res.redirect("/")
  })
  .delete(function (req, res, next) {
    db.serialize(function() {
      const stmt = db.prepare('DELETE FROM todos WHERE id = (?)')
      stmt.run(req.todo.id)
      stmt.finalize()
    })

    res.redirect("/")
  })

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(methodOverride('X-HTTP-Method-Override'))
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method
    delete req.body._method
    return method
  }
}))
app.use('/', router)

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
