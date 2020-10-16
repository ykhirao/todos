

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('sample.sqlite3')

db.serialize(function() {
  db.run('DROP TABLE IF EXISTS todos;');
  db.run('CREATE TABLE todos(id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT);');

    var stmt = db.prepare('INSERT INTO todos (text) VALUES (?)')

    const todos = [
      "洗濯物（サンプル）",
      "食器洗い（サンプル）",
      "プログラミング（サンプル）",
    ];

    todos.forEach(todo => {
      stmt.run(todo)
    });

    stmt.finalize()
})
