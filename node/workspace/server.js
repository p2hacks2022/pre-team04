const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.send("This is login page !");
});

app.get('/login', (req, res) => {
    res.send("This is login page !");
});

app.post('/login/auth', (req, res) => {
    res.send(`Hello,${req.body.userId}`);
    // userIDを保持しておく？userIDに紐づいたjsonを呼ぶ？
});

app.get('/home', (req, res) => {
    res.send("This is home page !");
});

app.get('/register', (req, res) => {
    res.send("This is register page !");
});

app.post('/register/add', (req, res) => {
    res.send(`${req.body.goal},${req.body.newCategory},${req.body.selectCategory}`);
    // userのjsonに追加する
});

app.get('/record', (req, res) => {
    res.send("This is record page !");
});

app.post('/record/add', (req, res) => {
    res.send(`${req.body.goal},${req.body.doneAny},${req.body.achivementDegrees}`);
    // userのjsonに追加する
});

app.get('/manage', (req, res) => {
    res.send("This is manage page !");
});

app.post('/manage/select', (req, res) => {
    res.send(`${req.body.selectCategory}`);
    // userのjsonをカテゴリを絞って表示する
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});