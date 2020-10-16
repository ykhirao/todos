

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('sample.sqlite3')

db.serialize(function() {
  db.run('DROP TABLE IF EXISTS todos;');
  db.run('CREATE TABLE todos(id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT);');

    var stmt = db.prepare('INSERT INTO todos (text) VALUES (?)')
    // insert into user2(name) values('Harada');

    for (var i = 0; i < 10; i++) {
      stmt.run('本文' + i)
    }

    stmt.finalize()
})
