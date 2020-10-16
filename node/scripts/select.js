const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('sample.sqlite3')

db.serialize(function() {
  db.each('SELECT rowid AS id, info FROM todos', function (err, row) {
    console.log(row.id + ': ' + row.text)
  });
})
