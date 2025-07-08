const mysql = require('mysql2');
const conn = mysql.createPool({
  host: 'localhost',
  user: 'campus2023',
  password: 'campus2023',
  database: 'refugio_animal'
});
module.exports = conn.promise();
