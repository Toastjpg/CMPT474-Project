const { Pool } = require('pg')

const pool = new Pool({
	host: 'localhost',
	user: 'postgres',
	password: 'root',
})

const helpers = {
	setup_tables: async () => {
		const q1 = "CREATE TABLE IF NOT EXISTS AuthCodes (email VARCHAR(64) NOT NULL, code CHAR(6) NOT NULL)"
		const res1 = await pool.query(q1)
	},

	create_auth_entry: async (email, code) => {
		// search if already exists, if so return that code
		const search_q = "SELECT * FROM AuthCodes where email = $1"
		const search_res = await pool.query(search_q, [email])

		if (search_res.rowCount > 0){
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

module.exports = {helpers}
