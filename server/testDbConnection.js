const mssql = require('mssql');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    port: parseInt(process.env.DB_PORT, 10),
    database: process.env.DB_DATABASE,
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

async function testConnection() {
    try {
        const pool = await mssql.connect(dbConfig);
        console.log("Connected to the database successfully!");
        pool.close(); // Close the connection after the test
    } catch (err) {
        console.error("Database connection failed!", err);
    }
}

testConnection();
