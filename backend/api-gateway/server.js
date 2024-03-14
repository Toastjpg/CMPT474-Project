const express = require('express');
//const bodyParser = require('body-parser');

const app = express();
//app.use(bodyParser.json());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// connections to post service
app.get('/get-post', async (req, res) => {
    fetch('http://localhost:8080/posts')
        .then(response => response.json())
        .then(data => {
            res.send(data);
        });
});

app.post('/create-post', (req, res) => {
    fetch('http://localhost:8080/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body),
    })
        .then(response => response.json())
        .then(data => {
            res.send(data);
        });
});

// connections to user-account service
app.post('/verify', async (req, res) => {
    fetch('http://localhost:8080/verify')
        .then(response => response.json())
        .then(data => {
            res.send(data);
        });
});

app.post('/create', async (req, res) => {
    fetch('http://localhost:8080/create', {
        method: 'POST',
        header: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body),
    })
        .then(response => response.json())
        .then(data => {
            res.send(data);
        });
});

app.listen(PORT, () => {
  console.log(`API Gateway is running on port ${PORT}`);
});


const postRouter = require("../backend/post-service/routes/posts.controller.js")