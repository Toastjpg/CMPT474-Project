const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
// CORS policy
const cors = require('cors');
const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// connections to post service
app.get('/get-post', async (req, res) => {
    fetch("https://post-service-cqiosuewjq-uc.a.run.app/api/posts")
            .then(response => response.json())
            .then(data => {
                console.log(data);
                return data;
            })
            .then(data => res.send(data))
            .catch(error => console.log(error));
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
