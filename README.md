# nodejs x express = todos

## heroku

```
# ログイン
$ heroku login

# アプリ作成
$ heroku create
sample https://arcane-headland-1XXXXX.herokuapp.com/

# アプリ確認
$ heroku apps
arcane-headland-1XXXX


$ heroku git:remote --app arcane-headland-16009
set git remote heroku to https://git.heroku.com/arcane-headland-16009.git

# 特定のディレクトリをherokuにpushする
$ git subtree push --prefix node heroku master

# ローカルDBをgitで無視する
# gitignoreだとherokuで使えない
echo */*.sqlite3 >> .git/info/exclude 

```
