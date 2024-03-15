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
        const resDelete = await delete_auth_code(email);
        console.log(`Deleted ${resDelete} rows from auth code tables`);

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
        return res.rowCount;
    },
};

module.exports = { helpers };
