const { Pool } = require('pg')
const { Connector } = require('@google-cloud/cloud-sql-connector')

const connector = new Connector();
let pool

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
        const query = `
        DROP TABLE IF EXISTS Accounts;

        CREATE TABLE Accounts (
            username VARCHAR(50) NOT NULL,
            email VARCHAR(64) NOT NULL,
            password VARCHAR(128) NOT NULL
        );
        `;

        const res = await pool.query(query);
    },

    get_accounts: async () => {
        const q = "SELECT * FROM Accounts"
        const res = await pool.query(q)
        return res.rows
    },

    create_account: async (values) => {
        const insertQuery = "INSERT INTO Accounts (username, email, password) VALUES ($1,$2,$3) RETURNING *";
        const res = await pool.query(insertQuery, values)
        return res.rows[0]
    },

    verify_unique_username: async (values) => {
        const selectQuery = "SELECT * FROM Accounts WHERE username = $1";
        const res = await pool.query(selectQuery, values)
        return res.rowCount
    }
}

module.exports = { helpers }