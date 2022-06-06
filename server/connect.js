const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'P@ssw0rd123',
    database: 'user'
});

module.exports = pool;