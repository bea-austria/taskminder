require('dotenv').config();
const mysql = require('mysql');

const dbOptions = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
};

const db = mysql.createPool(dbOptions);
db.getConnection((error) => {
    if (error) throw error;
    console.log('db connected successfully');
})
module.exports = { db, dbOptions };
