// Importing necessary modules
const mysql = require('mysql');
require('dotenv').config(); 


const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DATABASE_USER ,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DB_DATABASE,
  connectTimeout: 20000, // Increase connection timeout (milliseconds)
  timeout: 20000 
});

// Execute the SQL query to create the table
pool.getConnection((err: any, connection: { query: (arg0: string, arg1: (error: any, results: any) => void) => void; release: () => void; }) => {
    if (err) {
      console.error('Error connecting to database:', err);
      return;
    }
  
    // Use the connection to execute the SQL query
    connection.query(`
      CREATE TABLE IF NOT EXISTS your_table_name (
        name VARCHAR(255),
        uploading BOOLEAN,
        deployed BOOLEAN
      )
    `, (error, results) => {
      // When done with the connection, release it
      connection.release();
  
      if (error) {
        console.error('Error creating table:', error);
        return;
      }
  
      console.log('Table created successfully:', results);
    });
  });