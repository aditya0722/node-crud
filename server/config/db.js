require('dotenv').config();


const {Pool} = require('pg');



const pool= new Pool({
    connectionString: process.env.CONN
});


module.exports = pool;