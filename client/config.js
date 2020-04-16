// These environment settings should all be defined on a production server,
// not in a .env file.
//if (process.env.NODE_ENV !== 'production') {
//    require('dotenv').config();
//}

// This works because of the configuration of the reverse proxy. See README.
const APIHOST = (process.env.NODE_ENV !== 'production')?  "https://capacity.co.clatsop.or.us/server" : "/server"

module.exports = {APIHOST}
