// These environment settings should all be defined on a production server,
// not in a .env file.
//if (process.env.NODE_ENV !== 'production') {
//    require('dotenv').config();
//}

const DBHOST = process.env.DBHOST;
const DBNAME = process.env.MYSQL_DATABASE;
const DBUSER = process.env.MYSQL_USER;
const DBPASSWORD = process.env.MYSQL_PASSWORD;


module.exports = { DBHOST, DBNAME, DBUSER, DBPASSWORD}
