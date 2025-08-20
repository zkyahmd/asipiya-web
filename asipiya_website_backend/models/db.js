const mysql = require('mysql2/promise');

// Create connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'asipiya',
});

// Connect to MySQL and export the promise
connection
  .then(conn => {
    console.log('MySQL Connected');
    return conn;
  })
  .catch(err => {
    console.error('MySQL connection failed:', err.message);
    process.exit(1); // Exit if connection fails
  });

module.exports = connection;
