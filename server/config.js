// These environment settings should all be defined on a production server,
// not in a .env file.
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const HOST = process.env.HOST;
const DBNAME = process.env.DBNAME;
const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;


module.exports = { HOST, DBNAME, USER, PASSWORD}