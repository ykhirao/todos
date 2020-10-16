const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('sample.sqlite3')

exports.rootAccessControl = (req, res) => {
   console.log("Access root node.")
   let weekArray = ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"]
   let param = {
       title: "EJSサンプルページ",
       description: "EJSを使用したサンプルページです",
       week: weekArray
   }
   res.render("index", param)
}

exports.index = async (req, res) => {
  console.log('Get index')
  db.serialize(function() {
    db.all('SELECT id, text FROM todos', (err, rows) => {
      if (err) res.send("エラー発生")
      res.render("top", { rows })
    });
  })
}

exports.create = (req, res) => {
  console.log('Get create')
}

exports.store = (req, res) => {
  console.log('Get store')
}

exports.show = (req, res) => {
  console.log('Get show')
}

exports.edit = (req, res) => {
  console.log('Get edit')
}

exports.update = (req, res) => {
  console.log('Get update')
}

exports.destroy = (req, res) => {
  console.log('Get destroy')
}
