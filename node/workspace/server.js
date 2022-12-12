const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.set('view engine', 'ejs');

// ルートへのアクセスはログインへリダイレクト
app.get('/', (req, res) => {
    res.redirect(301, '/login');
});

// ログイン画面
app.get('/login', (req, res) => {
    res.send("This is login page !");
    // res.render("./view/pages/login.ejs");
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

// ユーザーの新規登録画面
app.get('/addNewUser', (req, res) => {
    res.send("This is newUser page!");
    // res.render("./view/pages/addNewUser.ejs");
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

// ホーム画面
app.get('/:user/home', (req, res) => {
    res.send(`This is ${req.params.user} home page !`);
    // res.render("./view/pages/home.ejs");
});

// 登録画面
app.get('/:user/register', (req, res) => {
    res.send("This is register page !");
    // res.render("./view/pages/register.ejs");
});

// 登録リクエスト 
app.post('/:user/register/add', (req, res) => {
    res.send(`${req.body.goal},${req.body.newCategory},${req.body.selectCategory}`);
    // userのjsonに追加する
});

// 記録画面
app.get('/:user/record', (req, res) => {
    res.send("This is record page !");
    // res.render("./view/pages/record.ejs");
});

// 記録リクエスト
app.post('/:user/record/add', (req, res) => {
    res.send(`${req.body.goal},${req.body.doneAny},${req.body.achivementDegrees}`);
    // userのjsonに追加する
});

// 管理画面
app.get('/:user/manage', (req, res) => {
    let userData = JSON.parse(fs.readFileSync(`./data/${req.params.user}.json`));
    console.log(userData);
    res.send("This is manage page !");
    // res.render("./view/pages/manage.ejs");
});

// カテゴリフィルター
app.post('/:user/manage/select', (req, res) => {
    res.send(`${req.body.selectCategory}`);
    // userのjsonをカテゴリを絞って表示する
});


app.listen(port, () => {
    console.log(`upDate listening on port ${port}`);
});