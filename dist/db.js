"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addEntry = exports.executeQuery = void 0;
// Importing necessary modules
const mysql = require('mysql');
require('dotenv').config();
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: "3306",
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DB_DATABASE,
});
db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to the database.');
});
function executeQuery(query) {
    db.query(query, (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
        }
        else {
            console.log('Query executed successfully:', result);
        }
    });
}
exports.executeQuery = executeQuery;
/* export const addEntry = (id:string, uploaded:boolean) => {
  const insertQuery = `INSERT INTO your_table_name (id, uploaded) VALUES ('${id}', ${uploaded ? 1 : 0})`;
  executeQuery(insertQuery);
};
 */
const addEntry = (id, uploaded, callback) => __awaiter(void 0, void 0, void 0, function* () {
    const uploadedValue = uploaded ? 1 : 0;
    const insertQuery = `INSERT INTO your_table_name (id, uploaded) VALUES ('${id}', ${uploadedValue})`;
    try {
        const result = yield executeQuery(insertQuery);
        callback(null, result);
    }
    catch (err) {
        callback(err, null);
    }
});
exports.addEntry = addEntry;
/* const pool = mysql.createPool({
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
  }); */ 
