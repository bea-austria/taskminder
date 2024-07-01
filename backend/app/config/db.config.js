require('dotenv').config();
const mysql = require('mysql');
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
})
db.getConnection((error) => {
    if (error) throw error;
    console.log('db connected successfully');
})
module.exports = db;