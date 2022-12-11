const express = require('express');
const app = express();
const port = 3000;



app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.send("This is login page !");
});

app.get('/login', (req, res) => {
    res.send("This is login page !");
});

app.get('/home', (req, res) => {
    res.send("This is home page !");
});

app.get('/register', (req, res) => {
    res.send("This is register page !");
});

app.get('/record', (req, res) => {
    res.send("This is record page !");
});

app.get('/manage', (req, res) => {
    res.send("This is manage page !");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});