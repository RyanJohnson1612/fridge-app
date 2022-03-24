// Database connections
const { Client } = require('pg');

const {DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, DB_PORT, TEST_DATABASE} = process.env;

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

client.connect().then(() => {
	console.log("Database connection established.")
}).catch( e => {
	throw new Error(e);
})

module.exports = client;
