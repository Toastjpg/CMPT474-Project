const { Pool } = require('pg')
const { Connector } = require('@google-cloud/cloud-sql-connector')
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
                    text: `
                        CREATE TABLE IF NOT EXISTS Accounts (
                            username VARCHAR(50) NOT NULL UNIQUE,
                            email VARCHAR(64) NOT NULL UNIQUE,
                            password VARCHAR(128) NOT NULL
                        );`,
                    values: [],
                }
                await this.pool.query(createTableQuery)
            }
            const res = await this.pool.query(queryObj)
            return res

        } catch (error) {
            console.debug("PostgresDB class error: async query(queryObj) failed.")
            throw error
        }
    }

    /**
     * Assumes email uniqeuness is already checked
     * @param {*} username 
     * @param {*} email 
     * @param {*} password 
     */
    async create_account(username, email, password) {
        const usernameMatches = await this.count_username_match(username)
        if (usernameMatches > 0) {
            throw new Error("Username is already registered with another account.")
        }
        const insertQuery = {
            text: 'INSERT INTO Accounts (username, email, password) VALUES ($1, $2, $3)',
            values: [username, email, password],
        }
        await this.query(insertQuery)
    }

    async delete_account(username) {
        const deleteQuery = {
            text: 'DELETE FROM Accounts WHERE username = $1',
            values: [username],
        }
        const res = await this.query(deleteQuery)
        return res.rowCount
    }
    async count_username_match(username) {
        const selectQuery = {
            text: 'SELECT COUNT(*) AS count FROM Accounts WHERE username = $1',
            values: [username],
        }
        const res = await this.query(selectQuery);
        return parseInt(res.rows[0].count, 10);
    }
    async count_email_match(email) {
        const selectQuery = {
            text: 'SELECT COUNT(*) AS count FROM Accounts WHERE email = $1',
            values: [email],
        }
        const res = await this.query(selectQuery);
        return parseInt(res.rows[0].count, 10);
    }

    async get_accounts() {
        const selectQuery = {
            text: 'SELECT * FROM Accounts',
            values: [],
        }
        const res = await this.query(selectQuery);
        return res.rows
    }
    async get_account_by_email(email) {
        const selectQuery = {
            text: 'SELECT * FROM Accounts WHERE email = $1',
            values: [email],
        }
        const res = await this.query(selectQuery);
        return res.rows
    }
}

const pgdb = new PostgresDB()

module.exports = { pgdb };