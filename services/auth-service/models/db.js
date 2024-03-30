const { Pool } = require("pg");
const { Connector } = require("@google-cloud/cloud-sql-connector");
const connector = new Connector();

class PostgresDB {
    pool = null;
    async connect() {
        const clientOpts = await connector.getOptions({
            instanceConnectionName: process.env.DB_CONN_NAME,
            ipType: "PUBLIC",
        });

        this.pool = new Pool({
            ...clientOpts,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            max: 5,
        })
    }
    async query(queryObj) {
        try {
            if (this.pool === null) {
                await this.connect()
                const createTableQuery = {
                    text: 'CREATE TABLE IF NOT EXISTS AuthCodes (email VARCHAR(64) NOT NULL, code CHAR(6) NOT NULL)',
                    values: [],
                }
                await this.pool.query(createTableQuery)
            }
            const res = await this.pool.query(queryObj)
            return res

        } catch (error) {
            console.debug("PostgresDB class error: async query (queryObj) failed.")
            throw error
        }
    }

    async create_auth_entry(email, code) {
        const insertQuery = {
            text: 'INSERT INTO AuthCodes (email, code) VALUES ($1, $2)',
            values: [email, code],
        }
        await this.query(insertQuery)
    }

    async delete_auth_entry(email) {
        const deleteQuery = {
            text: 'DELETE FROM AuthCodes WHERE email = $1',
            values: [email],
        }
        const res = await this.query(deleteQuery)
        return res.rowCount
    }
    async count_code_email_match(email, code) {
        const selectQuery = {
            text: 'SELECT COUNT(*) AS count FROM AuthCodes WHERE email = $1 AND code = $2',
            values: [email, code],
        }
        const res = await this.query(selectQuery);
        return parseInt(res.rows[0].count, 10);
    }


    // DEVELOPMENT
    async get_all_auth_codes() {
        const selectQuery = {
            text: 'SELECT * FROM AuthCodes',
            values: [],
        }
        const res = await this.query(selectQuery);
        return res.rows
    }
}

const pgdb = new PostgresDB()

module.exports = { pgdb };
