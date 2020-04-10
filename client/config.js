// These environment settings should all be defined on a production server,
// not in a .env file.
//if (process.env.NODE_ENV !== 'production') {
//    require('dotenv').config();
//}

const APIHOST = process.env.APIHOST;

module.exports = {APIHOST }
