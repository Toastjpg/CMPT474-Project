const express = require('express')
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require('dotenv');
dotenv.config()


const { createAccount, verifyUniqueUsername } = require('./controller/user-account.controller')


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