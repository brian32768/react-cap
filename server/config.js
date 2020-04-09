// These environment settings should all be defined on a production server,
// not in a .env file.
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const DBHOST = process.env.DBHOST;
const DBNAME = process.env.DBNAME;
const DBUSER = process.env.DBUSER;
const DBPASSWORD = process.env.DBPASSWORD;


module.exports = { DBHOST, DBNAME, DBUSER, DBPASSWORD}
