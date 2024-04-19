const mysql = require('mysql');
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Probability@24',
    database: 'taskminder'
})
db.getConnection((error) => {
    if (error) throw error;
    console.log('db connected successfully');
})
module.exports = db;