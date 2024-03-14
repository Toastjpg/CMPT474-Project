const { Pool } = require("pg");
const { Connector } = require("@google-cloud/cloud-sql-connector");

const connector = new Connector();
let pool;

const helpers = {
	init: async () => {
		const clientOpts = await connector.getOptions({
			instanceConnectionName: process.env.DB_CONN_NAME,
			ipType: 'PUBLIC',
		});

		pool = new Pool({
			...clientOpts,
			user: process.env.DB_USER,
			password: process.env.DB_PASS,
			database: process.env.DB_NAME,
			max: 5,
		});
	},

	setup_tables: async () => {
		const q1 = "CREATE TABLE IF NOT EXISTS AuthCodes (email VARCHAR(64) NOT NULL, code CHAR(6) NOT NULL)"
		const res1 = await pool.query(q1)
	},

	create_auth_entry: async (email, code) => {
		// search if already exists, if so return that code
		const search_q = "SELECT * FROM AuthCodes where email = $1"
		const search_res = await pool.query(search_q, [email])

		if (search_res.rowCount > 0) {
			return search_res.rows[0].code
		}

		const q = "INSERT INTO AuthCodes (email, code) VALUES ($1, $2)"
		const res = await pool.query(q, [email, code])
		return res.rowCount
	},

	get_auth_code: async (email) => {
		const q = "SELECT * FROM AuthCodes WHERE email = $1"
		const res = await pool.query(q, [email])
		return res.rows[0]
	},

	delete_auth_code: async (email) => {
		const q = "DELETE FROM AuthCodes WHERE email = $1"
		const res = await pool.query(q, [email])
		return res.rowCount
	}
}

module.exports = { helpers }
