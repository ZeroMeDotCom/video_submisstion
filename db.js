const mysql = require('mysql2');
const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'Terry20021010!*',
	database: 'video_app'
});
db.connect(err => {
	if (err) throw err;
	console.log('MySQL Connected!')
});
module.exports = db;