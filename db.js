const mysql = require('mysql2');
const db = mysql.createConnection({
	host: 'mysql.railway.internal',
	user: 'root',
	password: 'PGCnUTKmtZKMdKzUFyjmGyPwCslehUsK',
	database: 'railway',
	port: 26644,
	family: 4
});
db.connect(err => {
	if (err) throw err;
	console.log('MySQL Connected!')
});
module.exports = db;



// const mysql = require('mysql2');

// const db = mysql.createPool({
//   host: 'mysql.railway.internal',
//   port: 3006,
//   user: 'root',
//   password: 'PGCnUTKmtZKMdKzUFyjmGyPwCslehUsK',
//   database: 'railway',
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });

// // Optional: Test the connection
// db.getConnection((err, connection) => {
//   if (err) {
//     console.error('❌ MySQL Connection Error:', err);
//   } else {
//     console.log('✅ MySQL Connected!');
//     connection.release();
//   }
// });

// module.exports = db;
