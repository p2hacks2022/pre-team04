const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const app = express();
const port = 3000;

//dbアクセスの可否確認
MongoClient.connect('mongodb://docker:docker@mongo:27017/', (err, db) => {
    if (err) {
        throw err;
    }
    // 接続できれば接続成功を返す
    console.log("Connecting MongoDB !");
});

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
    MongoClient.connect('mongodb://docker:docker@mongo:27017/', (err, client) => {
        // 接続できなければエラーを返す
        if (err) {
            throw err;
        }
        const db = client.db('updateTest');
        // userIdのコレクションが存在すればエラーメッセージを返す
        // 存在しなければ新しくコレクションを作成する
        db.listCollections({ name: req.body.userId })
            .next(async (err, result) => {
                if (err) throw err;
                if (result) {
                    await client.close();
                    res.header('Content-Type', 'application/json; charset=utf-8');
                    res.send(`{"message":"ユーザー「${loginUserId}」はすでに存在しています!"}`)
                } else {
                    await db.createCollection(`${req.body.userId}`);
                    await client.close();
                    res.header('Content-Type', 'application/json; charset=utf-8');
                    res.send(`{"message":"ユーザー「${loginUserId}」は登録しました！"}`)
                }
            });
    });
});

// ログイン認証
app.post('/login/auth', (req, res) => {
    MongoClient.connect('mongodb://docker:docker@mongo:27017/', (err, client) => {
        // 接続できなければエラーを返す
        if (err) {
            throw err;
        }
        // test用DBを使用
        const db = client.db('updateTest');
        // userIdのコレクションが存在すれば/userId/homeへリダイレクト
        // 存在しなければエラー文を返す
        db.listCollections({ name: req.body.userId })
            .next(async (err, result) => {
                if (err) throw err;
                let loginUserId = req.body.userId;
                if (result) {
                    // exist
                    await client.close();
                    let redirectPath = `${loginUserId}/home`;
                    res.redirect(301, redirectPath);
                } else {
                    // not exist
                    await client.close();
                    res.header('Content-Type', 'application/json; charset=utf-8');
                    res.send(`{"message":"ユーザー「${loginUserId}」は存在しません！"} `)
                }
            });
    });
});


app.get('/:user/home', (req, res) => {
    res.send(`This is ${req.params.user} home page!`);
});

app.get('/:user/register', (req, res) => {
    res.send("This is register page !");
});

app.post('/:user/register/add', (req, res) => {
    res.send(`${req.body.goal},${req.body.newCategory},${req.body.selectCategory} `);
    // userのjsonに追加する
});

app.get('/:user/record', (req, res) => {
    res.send("This is record page !");
});

app.post('/:user/record/add', (req, res) => {
    res.send(`${req.body.goal},${req.body.doneAny},${req.body.achivementDegrees} `);
    // userのjsonに追加する
});

app.get('/:user/manage', (req, res) => {
    res.send("This is manage page !");
});

app.post('/:user/manage/select', (req, res) => {
    res.send(`${req.body.selectCategory} `);
    // userのjsonをカテゴリを絞って表示する
});

app.listen(port, () => {
    console.log(`upDate listening on port ${port} `);
});