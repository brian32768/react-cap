const express = require('express')
const cors = require('cors')
const mysql = require('mysql');
const config = require('./config')
const app = express()
const port = 3000

// https://www.positronx.io/express-cors-tutorial/
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const db_config = {
    host: config.HOST,
    user: config.USER,
    password: config.PASSWORD,
    database: config.DBNAME
}

const select_inventory = "SELECT * FROM inventory"
const select_tests = "SELECT * FROM test_results"

let connection;

// My database connection was dropping about every 60 seconds
// causing server.js to terminate. So now I watch for that and
// reconnect. Many thanks to the answer here 
// https://stackoverflow.com/questions/20210522/nodejs-mysql-error-connection-lost-the-server-closed-the-connection

function handleDisconnect() {

    // Create a new connection
    connection = mysql.createConnection(db_config);
    connection.connect(function(err) {
        if (err) {
            console.error('db: Error connecting.', err);
            setTimeout(handleDisconnect, 2000)
        } else {
            console.log("db: ready");
        }
    })

    // Add a handler to reconnect whenever the connection is lost.
    // Usually the connection drops because the mysql timeout is short;
    // it can also drop if the mysql server is restarted.
    connection.on('error', function(err) {
        console.error('db: error.', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleDisconnect();
        } else {
            throw err;
        }
    });
}


app.get('/', (req, res) => res.send(`Hello, ${config.USER}`))
app.all('/ping', (req, res) => res.send(new Date()))

app.get('/inventory', async (req, res) => {
    connection.query(select_inventory, (err, pages) => {
        (err) ? res.send(err) : res.json(pages);
    })
})

app.get('/tests', async (req, res) => {
    connection.query(select_tests, (err, pages) => {
        (err) ? res.send(err) : res.json(pages);
    })
})

handleDisconnect();
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
