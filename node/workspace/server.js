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
app.use(bodyParser.urlencoded({ extended: true }));

// views以下のディレクトリをexpressに公開
app.use(express.static(__dirname + '/views'));

// レンダリングエンジンをejsに設定
app.set('view engine', 'ejs');

// ルートはログイン画面へリダイレクト
app.get('/', (req, res) => {
    res.redirect(301, '/login');
});

// ログイン画面
app.get('/login', (req, res) => {
    // res.send("This is login page !");
    res.render("pages/login.ejs");
});

// ログイン認証機能
app.post('/login/auth', (req, res) => {
    MongoClient.connect('mongodb://docker:docker@mongo:27017/', (err, client) => {
        // 接続できなければエラーを返す
        if (err) {
            throw err;
        }
        console.log(req.body.userId);
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
                    res.header('Content-Type', 'application/json; charset=utf-8');
                    res.send(`{"message":"ユーザー「${loginUserId}」は存在します！"} `)
                } else {
                    // not exist
                    console.log("はいってねぇんだよ");
                    await client.close();
                    // 存在しないユーザーを正しく拒絶できない
                    let err = new Error('ユーザー「${loginUserId}」は存在しません！');
                    res.send({ error: err });
                }
            });
    });
});

// ユーザの新規登録画面
app.get('/addNewUser', (req, res) => {
    // res.send("This is newUser page!");
    res.render("pages/addNewUser.ejs");
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
                    //コレクションを作る
                    await db.createCollection(req.body.userId);
                    await client.close();
                    res.header('Content-Type', 'application/json; charset=utf-8');
                    res.send(`{"message":"ユーザー「${loginUserId}」を登録しました！"}`)
                }
            });
    });
});

// ユーザのホーム画面
app.get('/:user/home', (req, res) => {
    //res.send(`This is ${req.params.user} home page!`);
    res.render("pages/home.ejs");
});

// ユーザの登録画面
app.get('/:user/register', (req, res) => {
    MongoClient.connect('mongodb://docker:docker@mongo:27017/', async (err, client) => {
        if (err) throw err;
        const db = client.db('updateTest');
        let collection = db.collection(req.params.user);
        await collection.distinct("category", (err, result) => {
            console.log(result);
            client.close();
            res.render("pages/register.ejs", {
                category: result
            });
        });
    });
});

// 登録機能
app.post('/:user/register/add', async (req, res) => {
    // リクエストから変数を抽出
    let goal = req.body.goal;
    let newCategory = req.body.newCategory;
    let selectCategory = req.body.selectCategory;
    // 文字列が空白ではない方を採用
    let category = newCategory || selectCategory;
    // mongoにアクセスする
    MongoClient.connect('mongodb://docker:docker@mongo:27017/', async (err, client) => {
        if (err) throw err;
        const db = client.db('updateTest');
        let collection = db.collection(req.params.user);
        // 最初のObjectを取得してきてその中のgoalListに目標とカテゴリを追加していく
        await collection.findOneAndUpdate(
            { "goal": goal },
            { $set: { "goal": goal, "category": category } },
            { upsert: true }
        );
        //await collection.updateOne({}, { $pull: { doneAny: dummy } });
        //await collection.updateOne({}, { $pull: { achivementDegrees: dummy } });
        await client.close();
    });
    res.redirect(301, `/${req.params.user}/register`);
});

// 記録画面
app.get('/:user/record', (req, res) => {
    MongoClient.connect('mongodb://docker:docker@mongo:27017/', async (err, client) => {
        if (err) throw err;
        const db = client.db('updateTest');
        let collection = db.collection(req.params.user);
        await collection.distinct("goal", (err, result) => {
            //console.log(result);
            client.close();
            res.render("pages/record.ejs", {
                goal: result
            });
        });
    });
    // res.send("This is record page !");
});

// 記録機能
app.post('/:user/record/add', (req, res) => {
    // リクエストから変数を取得
    let goal = req.body.goal;
    let doneAny = req.body.doneAny;
    let achivementDegrees = req.body.achivementDegrees;
    console.log(achivementDegrees);
    MongoClient.connect('mongodb://docker:docker@mongo:27017/', async (err, client) => {
        if (err) throw err;
        const db = client.db('updateTest');
        let collection = db.collection(req.params.user);
        // goalが検索条件と一致するドキュメントに達成度としたことを追加していく
        await collection.updateOne(
            { "goal": goal },
            { $addToSet: { "doneAny": doneAny, "achivementDegrees": achivementDegrees } }
        );
        await client.close();
    });
    res.redirect(301, `/${req.params.user}/record`);
});

// 管理画面
app.get('/:user/manage', (req, res) => {
    MongoClient.connect('mongodb://docker:docker@mongo:27017/', async (err, client) => {
        if (err) throw err;

        const db = client.db("updateTest");
        let collection = db.collection(req.params.user);
        // カテゴリが一致するドキュメント一覧を取得
        let cursole = collection.find({}, { projection: { _id: 0, goal: 1, category: 1, achivementDegrees: 1, doneAny: 1 } });
        // 取得したドキュメントを配列としてJSON形式でレスポンスする
        cursole.toArray((err, result) => {
            if (err) throw err;
            // let resultsJson = JSON.stringify(result);
            client.close();
            // フィルターかけた結果をjsonで返す
            //res.send(`${resultsJson} `);
            // 結果をもとにmanage.ejsをレンダリング
            res.render("pages/manage.ejs", {
                all: result
            });
        });
    });
    // res.send("This is manage page !");
});

// カテゴリ選択機能
app.post('/:user/manage/select', (req, res) => {
    let category = req.body.selectCategory;
    MongoClient.connect('mongodb://docker:docker@mongo:27017/', (err, client) => {
        if (err) throw err;
        const db = client.db("updateTest");
        let collection = db.collection(req.params.user);

        // カテゴリが一致するドキュメント一覧を取得
        let cursole = collection.find({ "category": category }, { projection: { _id: 0, goal: 1, category: 1, achivementDegrees: 1, doneAny: 1 } });
        // 取得したドキュメントを配列としてJSON形式でレスポンスする。
        cursole.toArray((err, result) => {
            if (err) throw err;
            let resultsJson = JSON.stringify(result);
            console.log(resultsJson);
            client.close();
            // フィルターかけた結果をjsonで返す
            // res.send(`${resultsJson} `);
            // フィルターをかけた結果をもとにmanage.ejsを再レンダリング
            res.render("pages/manage.ejs"/*, resultsJson*/);
        });

    });
});

app.listen(port, () => {
    console.log(`upDate listening on port ${port} `);
});