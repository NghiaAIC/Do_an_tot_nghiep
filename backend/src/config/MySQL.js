const mysql = require('mysql2/promise');
require('dotenv').config();

const con = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    waitForConnections: true,
    queueLimit: 0
  });

module.exports = con;