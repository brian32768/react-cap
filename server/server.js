const express = require('express')
const cors = require('cors')
const config = require('./config')
const app = express()
const port = 3000

// https://www.positronx.io/express-cors-tutorial/
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const dsn = `mysql://${config.USER}:${config.PASSWORD}@${config.HOST}/${config.DBNAME}`
//console.log(dsn);

const select = "SELECT * FROM inventory"

app.get('/', (req, res) => res.send(`Hello, ${config.USER}`))
app.all('/ping', (req, res) => res.send(new Date()))

const mysql = require('mysql');
const db = mysql.createConnection(dsn);

app.get('/list', async(req, res) => {
    db.query(select, (err, pages) => {
        (err)? res.send(err) : res.json(pages);
    })
})

// force connection to confirm settings are correct
db.connect((err) => {
    if (err) throw err;
    //console.log("db: ready");
    // ...
    // the rest of our initialization code
    // ...
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
});



