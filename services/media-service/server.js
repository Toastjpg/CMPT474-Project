/* ------------------------------ dependencies ------------------------------ */
const express = require("express");
const cors = require("cors");
const Multer = require('multer')
const dotenv = require("dotenv");
dotenv.config();
const { getAllFiles, uploadFiles, uploadFile } = require("./controllers/media");

/* ------------------------------- server setup ------------------------------ */
const app = express();
const PORT = process.env.PORT || 8080;

/* ------------------------------- middleware ------------------------------- */

app.use(cors());

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// Middleware to log all requests
// app.use((req, res, next) => {
//     console.log(req.headers, req.params);
//     next();
// });

const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 32 * 1024 * 1024,
    },
})

//app.use(multer.array());
//app.use(express.static('public'));

var bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '32mb' }));
app.use(bodyParser.urlencoded({ limit: '32mb', extended: true }));

/* -------------------------------- endpoints ------------------------------- */

// Patch to fix CORS error from API gateway
// Middleware to handle the preflight requests
// See: https://stackoverflow.com/questions/64281334/cors-errors-when-trying-to-fetch-from-new-google-cloud-api-gateway
app.options("/*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization, Content-Length, X-Requested-With"
    );
    res.send(200);
});


app.get('/api/files', getAllFiles)
//app.post('/api/files', multer.any(), uploadFiles)
app.post('/api/files', multer.any(), uploadFile);
// app.delete('/api/files/:fileId', deleteFile)

/* ----------------------------- starting server ---------------------------- */
app.listen(PORT, () => {
    console.log(`MEDIA SERVICE: Server is running on port ${PORT}\n`);
});