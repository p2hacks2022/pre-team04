const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.redirect(301, '/login');
});

app.get('/login', (req, res) => {
    res.send("This is login page !");
});

app.get('/addNewUser', (req, res) => {
    res.send("This is newUser page!");
});

// ユーザーの新規登録
app.post('/addNewUser/add', (req, res) => {
    let addingUserId = req.body.userId;
    if (!(fs.existsSync(`./data/${addingUserId}.json`))) {
        fs.writeFileSync(`./data/${addingUserId}.json`, `{"userId": "${addingUserId}"}`, (err) => {
            if (err) {
                throw err;
            };
        });
        res.header('Content-Type', 'application/json; charset=utf-8');
        res.send(`{"message":"ユーザー「${addingUserId}」を登録しました！"}`);
    } else {
        res.header('Content-Type', 'application/json; charset=utf-8');
        res.send(`{"message":"ユーザー「${addingUserId}」はすでに存在しています！"}`);
    }
});

// ログイン認証
app.post('/login/auth', (req, res) => {
    let loginUserId = req.body.userId;
    // ユーザーネームのjsonファイルが存在すればユーザのホームへリダイレクト
    // ユーザーネームのjsonファイルが存在しなければエラーメッセージを返す
    if (fs.existsSync(`./data/${loginUserId}.json`)) {
        // リダイレクト先のパス
        // フルパスにすべきかこのままにするかわからない
        let redirectPath = `${loginUserId}/home`;
        res.redirect(301, redirectPath);
    } else {
        // /login/authへエラーメッセージを送信
        res.header('Content-Type', 'application/json; charset=utf-8');
        res.send(`{"message":"ユーザー「${loginUserId}」は存在しません!"}`)
    }
});


app.get('/:user/home', (req, res) => {
    res.send(`This is ${req.params.user} home page !`);
});

app.get('/:user/register', (req, res) => {
    res.send("This is register page !");
});

app.post('/:user/register/add', (req, res) => {
    res.send(`${req.body.goal},${req.body.newCategory},${req.body.selectCategory}`);
    // userのjsonに追加する
});

app.get('/:user/record', (req, res) => {
    res.send("This is record page !");
});

app.post('/:user/record/add', (req, res) => {
    res.send(`${req.body.goal},${req.body.doneAny},${req.body.achivementDegrees}`);
    // userのjsonに追加する
});

app.get('/:user/manage', (req, res) => {
    res.send("This is manage page !");
});

app.post('/:user/manage/select', (req, res) => {
    res.send(`${req.body.selectCategory}`);
    // userのjsonをカテゴリを絞って表示する
});

app.listen(port, () => {
    console.log(`upDate listening on port ${port}`);
});