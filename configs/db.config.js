// Database connections
const { Pool } = require('pg');
pg.defaults.ssl = true;

const {DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, DB_PORT, TEST_DATABASE} = process.env;


const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

pool.connect().then(() => {
	console.log("Database connection established.")
}).catch( e => {
	throw new Error(e);
})

module.exports = pool;
