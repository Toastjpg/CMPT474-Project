import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'

const app = express();
dotenv.config()


import { createAccount, verifyUniqueUsername } from './controller/user-account.controller.js'


app.use(bodyParser.json())
app.use(cors({
    origin: '*',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
}))

// [DEV]
app.use('/', function(req, res, next) {
    console.log(req.method, ': ', req.url, JSON.stringify(req.body))
    next()
})

app.post('/create-account', createAccount);
app.get('/verify-unique-username', verifyUniqueUsername);


// server
const port = parseInt(process.env.SERVICE_PORT) || 3000;
const serviceName = process.env.SERVICE_NAME || "Noname Service";
app.listen(port, () => {
    console.log(`${serviceName}: listening on port ${port}`);
});