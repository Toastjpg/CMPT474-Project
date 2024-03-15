const express = require('express');
const app = express();

const PORT = process.env.PORT || 8080;
const dotenv = require('dotenv');
dotenv.config();

// const path = require('path');

// app.use("/", express.static(path.join(__dirname, "/build")));
// // Handle all other routes
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, "/build/index.html"));
// });

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
app.get('/posts', async (req, res) => {
    console.log("GETTING POSTS");
    fetch(`${process.env.POST_SERVICE_URL}/api/posts`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            return data;
        })
        .then(data => res.send(data))
        .catch(error => console.log(error));
});

app.get('/posts/:id', async (req, res) => {
    fetch(`${process.env.POST_SERVICE_URL}/api/posts/${req.params.id}`)
        .then(response => response.json())
        .then(data => {
            res.send(data);
        });
});

app.post('/posts', (req, res) => {
    fetch(`${process.env.POST_SERVICE_URL}/api/posts`, {
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

app.delete('/posts/:id', (req, res) => {
    fetch(`${process.env.POST_SERVICE_URL}/api/posts/${req.params.id}`, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => {
            res.send(data);
        });
});

app.put('/posts/:id', (req, res) => {
    fetch(`${process.env.POST_SERVICE_URL}/api/posts/${req.params.id}`, {
        method: 'PUT',
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
app.get('/accounts', async (req, res) => {
    fetch(`${process.env.USER_SERVICE_URL}/api/accounts`)
        .then(response => response.json())
        .then(data => {
            res.send(data);
        });
});

app.post('/verify', async (req, res) => {
    fetch(`${process.env.USER_SERVICE_URL}/api/verify`, {
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

app.post('/create', async (req, res) => {
    // NEXT TIME: do verify here first, then create

    fetch(`${process.env.USER_SERVICE_URL}/api/create`, {
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



// connections to auth service
app.post('/register', async (req, res) => {

    fetch(`${process.env.AUTH_SERVICE_URL}/api/register`, {
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
})

app.post('/authorize', async (req, res) => {
    fetch(`${process.env.AUTH_SERVICE_URL}/api/authorize`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body),
    })
        .then(response => response.json())
        .then(data => {
            res.send(data);
        });
})

// For dev purposes to see Auth Code table
app.get('/authcodes', async (req, res) => {
    fetch(`${process.env.AUTH_SERVICE_URL}/api/authcodes`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => response.json())
        .then(data => {
            res.send(data);
        });
})

app.delete('/authcodes', async (req, res) => {
    fetch(`${process.env.AUTH_SERVICE_URL}/api/authcodes`, {
        method: 'DELETE',
        header: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body),
    })
        .then(response => response.json())
        .then(data => {
            res.send(data);
        })
});

app.listen(PORT, () => {
    console.log(`API Gateway is running on port ${PORT}`);
});
