const { Pool } = require("pg");
const { Connector } = require("@google-cloud/cloud-sql-connector");

const connector = new Connector();
let pool;

const helpers = {
    init: async () => {
        const clientOpts = await connector.getOptions({
            instanceConnectionName: process.env.DB_CONN_NAME,
            ipType: "PUBLIC",
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
        const q1 =
            "CREATE TABLE IF NOT EXISTS AuthCodes (email VARCHAR(64) NOT NULL, code CHAR(6) NOT NULL)";
        const res1 = await pool.query(q1);
    },

    create_auth_entry: async (email, code) => {
        // Just in case user tries to get another auth code
        // Make sure to not leave stale codes in database
        const deleteQ = "DELETE FROM AuthCodes WHERE email = $1";
        const deleteRes = await pool.query(deleteQ, [email]);
        console.log(`Deleted ${deleteRes.rowCount} rows from auth code tables`);

        const q = "INSERT INTO AuthCodes (email, code) VALUES ($1, $2)";
        const res = await pool.query(q, [email, code]);
        return res.rowCount;
    },

    get_auth_code: async (email) => {
        const q = "SELECT * FROM AuthCodes WHERE email = $1";
        const res = await pool.query(q, [email]);
        return res.rows[0];
    },

    // dev only
    get_all_auth_codes: async () => {
        const q = "SELECT * FROM AuthCodes";
        const res = await pool.query(q);
        return res.rows;
    },

    delete_auth_code: async (email) => {
        const q = "DELETE FROM AuthCodes WHERE email = $1";
        const res = await pool.query(q, [email]);
        console.log(res)
        return res.rowCount;
    },
};


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
            if(this.pool === null) {
                await this.connect()
                const createTableQuery = {
                    text: 'CREATE TABLE IF NOT EXISTS AuthCodes (email VARCHAR(64) NOT NULL, code CHAR(6) NOT NULL)',
                    values: [],
                }
                await this.pool.query(createTableQuery)
            }
            const res = await this.pool.query(queryObj)
            return res

        }catch(error) {
            console.debug("PostgresDB class error: async query(queryObj)")
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
