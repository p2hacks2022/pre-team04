const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const app = express();
const port = 3000;

//dbアクセスの可否確認
MongoClient.connect('mongodb://docker:docker@mongo:27017/', (err, client) => {
    if (err) {
        throw err;
    }
    // 接続できれば接続成功を返す
    console.log("Connecting MongoDB !");
});

app.use(bodyParser.json());

// レンダリングエンジンをejsに設定
app.set('view engine', 'ejs');

// ルートはログイン画面へリダイレクト
app.get('/', (req, res) => {
    res.redirect(301, '/login');
});

// ログイン画面
app.get('/login', (req, res) => {
    res.send("This is login page !");
});

// ログイン認証機能
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

// ユーザの新規登録画面
app.get('/addNewUser', (req, res) => {
    res.send("This is newUser page!");
});

// ユーザの新規登録機能
app.post('/addNewUser/add', (req, res) => {
    MongoClient.connect('mongodb://docker:docker@mongo:27017/', (err, client) => {
        // 接続できなければエラーを返す
        if (err) {
            throw err;
        }
        // test用DBを使用
        const db = client.db('updateTest');
        // userIdのコレクションが存在すればエラーメッセージを返す
        // 存在しなければ新しくコレクションを作成する
        db.listCollections({ name: req.body.userId })
            .next(async (err, result) => {
                if (err) throw err;
                let loginUserId = req.body.userId;
                if (result) {
                    // exist
                    await client.close();
                    res.header('Content-Type', 'application/json; charset=utf-8');
                    res.send(`{"message":"ユーザー「${loginUserId}」はすでに存在しています!"}`)
                } else {
                    // not exist
                    await db.createCollection(req.body.userId);
                    const collection = db.collection(req.body.userId);
                    await collection.insertOne({
                        "goalList": [

                        ]
                    });
                    await client.close();
                    res.header('Content-Type', 'application/json; charset=utf-8');
                    res.send(`{"message":"ユーザー「${loginUserId}」を登録しました！"}`)
                }
            });
    });
});

// ユーザのホーム画面
app.get('/:user/home', (req, res) => {
    res.send(`This is ${req.params.user} home page!`);
});

// ユーザの登録画面
app.get('/:user/register', (req, res) => {
    res.send("This is register page !");
});

// 登録機能
app.post('/:user/register/add', async (req, res) => {
    // mongoにアクセスする
    MongoClient.connect('mongodb://docker:docker@mongo:27017/', (err, client) => {
        if (err) throw err;

        const db = client.db('updateTest');
        const collection = db.collection(req.params.user);
        // goalをリクエストから抽出
        let goal = req.body.goal;
        // categoryをリクエストから抽出
        let newCategory = req.body.newCategory;
        let selectCategory = req.body.selectCategory;
        // 文字列が空白ではない方を採用
        let category = newCategory || selectCategory;
        // 最初のObjectを取得してきてその中のgoalListに目標とカテゴリを追加していく
        collection.find({}).toArray(async (err, result) => {
            if (err) throw err;
            //console.log(result[0]._id); //最初のObjectのID
            await collection.updateOne(
                { _id: result[0]._id },
                { $addToSet: { "goalList": { "goal": goal, "category": category } } }
            );
            await client.close();
        });
    });
    res.send(`カテゴリ${category}の目標：${req.body.goal}を登録しました！`);
});

// 記録画面
app.get('/:user/record', (req, res) => {
    res.send("This is record page !");
});

// 記録機能
app.post('/:user/record/add', (req, res) => {
    // リクエストから変数を取得
    let goal = req.body.goal;
    let doneAny = req.body.doneAny;
    let achivementDegrees = req.body.achivementDegrees;
    MongoClient.connect('mongodb://docker:docker@mongo:27017/', async (err, client) => {
        if (err) throw err;
        const db = client.db('updateTest');
        const collection = db.collection(req.params.user);
        // goalが検索条件と一致するドキュメントに達成度としたことを追加していく
        collection.find({}).next(async (err, result) => {
            if (err) throw err;
            await collection.updateOne(
                { "_id": result._id },
                { $addToSet: { "goalList.$[element].doneAny": doneAny, "goalList.$[element].achivementDegrees": achivementDegrees } },
                { arrayFilters: [{ "element.goal": goal }] }
            );
            await client.close();
        });
    });
    res.header('Content-Type', 'application/json; charset=utf-8'); achivementDegrees
    res.send(`{"message":"以下のデータを記録しました！"},{"goal":${goal}},{"doneAny":${doneAny}},{"achivementDegrees":${achivementDegrees}}`);
});

// 管理画面
app.get('/:user/manage', (req, res) => {
    res.send("This is manage page !");
});

// カテゴリ選択機能
app.post('/:user/manage/select', (req, res) => {
    res.send(`${req.body.selectCategory} `);
    // userのjsonをカテゴリを絞って表示する
});

app.listen(port, () => {
    console.log(`upDate listening on port ${port} `);
});