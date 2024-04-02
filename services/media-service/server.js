/* ------------------------------ dependencies ------------------------------ */
const express = require("express");
const cors = require("cors");
const Multer = require('multer')
const dotenv = require("dotenv");
dotenv.config();
const { getAllFiles, uploadFiles } = require("./controllers/media");

/* ------------------------------- server setup ------------------------------ */
const app = express();
const PORT = process.env.PORT || 8080;

/* ------------------------------- middleware ------------------------------- */

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 25 * 1024 * 1024,
    },
})

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
app.post('/api/files', multer.any(), uploadFiles)
// app.delete('/api/files/:fileId', deleteFile)

/* ----------------------------- starting server ---------------------------- */
app.listen(PORT, () => {
    console.log(`MEDIA SERVICE: Server is running on port ${PORT}\n`);
});