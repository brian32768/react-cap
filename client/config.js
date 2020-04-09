// These environment settings should all be defined on a production server,
// not in a .env file.
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const SQLHOST = process.env.SQLHOST || 'http://localhost:3000';

module.exports = { SQLHOST }
