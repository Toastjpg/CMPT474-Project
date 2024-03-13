import dotenv from 'dotenv'
dotenv.config()
// import { Connector } from '@google-cloud/cloud-sql-connector'
import mysql from 'mysql'
// const { Connector } = require('@google-cloud/cloud-sql-connector')
// const mysql = require('mysql')
// const connector = new Connector();
// const clientOpts = await connector.getOptions({
//     instanceConnectionName: process.env.INSTANCE_CONNECTION_NAME,
//     authType: 'IAM'
// });


export const pool = mysql.createPool({
    // ...clientOpts,
    host: process.env.DB_HOST,
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 100,
    multipleStatements: true
})