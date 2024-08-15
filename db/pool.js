const {Pool} = require('pg');
const session = require('express-session')
const pgSession = require('connect-pg-simple')(session);
require('dotenv').config();
const pool = new Pool({

    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,


});

const store = new pgSession({

    pool: pool, //connection pool instance
    createTableIfMissing: true,
    // Name of the table where sessions will be stored
});



module.exports ={pool , store };
