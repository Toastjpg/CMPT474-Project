const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

// const path = require('path');
// app.use("/", express.static(path.join(__dirname, "/build")));
// // Handle all other routes
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, "/build/index.html"));
// });




/**
 * Middleware Configurations
 */
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})
app.use(cors({
    origin: '*',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
}))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));




/**
 * Post Service Endpoints
 */
app.get('/posts', async (req, res) => {
    print_debug("app.get('/posts'")

    fetch(`${process.env.POST_SERVICE_URL}/api/posts`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            return data;
        })
        .then(data => res.send(data))
        .catch(error => {
            console.log("gateway-api: get request to post-service/posts")
            console.log(error)
            res.status(500).send("gateway-api: get request to post-service/posts")
        });
})
app.get('/posts/:id', async (req, res) => {
    fetch(`${process.env.POST_SERVICE_URL}/api/posts/${req.params.id}`)
        .then(response => response.json())
        .then(data => {
            res.send(data);
        })
        .catch(error => {
            console.log("gateway-api: get request to post-service/posts/:id")
            console.log(error)
            res.status(500).send("gateway-api: get request to post-service/posts/:id")
        });
})
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
        })
        .catch(error => {
            console.log("gateway-api: post request to post-service/posts")
            console.log(error)
            res.status(500).send("gateway-api: post request to post-service/posts")
        });
})
app.delete('/posts/:id', (req, res) => {
    fetch(`${process.env.POST_SERVICE_URL}/api/posts/${req.params.id}`, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => {
            res.send(data);
        })
        .catch(error => {
            console.log("gateway-api: delete request to posts-service//posts/:id")
            console.log(error)
            res.status(500).send("gateway-api: delete request to posts-service//posts/:id")
        })
})
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
        })
        .catch(error => {
            console.log("gateway-api: put request to posts-service//posts/:id")
            console.log(error)
            res.status(500).send("gateway-api: put request to posts-service//posts/:id")
        })
})





/**
 * User Account Service Endpoints
 */
app.get('/accounts', async (req, res) => {
    try {
        const response = await fetch(`${process.env.USER_SERVICE_URL}/api/accounts`, {
            method: 'GET',
        })
        const data = await response.json()
        if(!response.ok) {
            throw new Error(data)
        }
        return res.status(200).json(data)
    }catch(error) {
        print_error(error)
        return res.status(500).send("Something went wrong, plase try again later.")
    }
})
app.get('/account/email/:email', async (req, res) => {
    const email = req.params.email;
    try {
        const response = await fetch(`${process.env.USER_SERVICE_URL}/api/account/email/${email}`, {
            method: 'GET'
        })
        const data = await response.json()
        if(!response.ok) {
            throw new Error(data)
        }
        return res.status(200).json(data)
    }catch(error) {
        print_error(error)
        return res.status(500).send("Something went wrong, plase try again later.")
    }
})
// returns true or false if email is unique
app.get('/account/check-unique/email/:email', async (req, res) => {
    const email = req.params.email;
    try {
        const response = await fetch(`${process.env.USER_SERVICE_URL}/api/account/email/${email}`, {
            method: 'GET'
        })
        const data = await response.json()
        if(!response.ok) {
            throw new Error(data)
        }
        return res.status(200).json(data <= 0 ? true : false)
    }catch(error) {
        print_error(error)
        return res.status(500).send("Something went wrong, plase try again later.")
    }
})
app.post('/account', async (req, res) => {
    try {
        print_debug(`email=${req.body.username}`)
        print_debug(`email=${req.body.email}`)
        print_debug(`email=${req.body.password}`)
        const response = await fetch(`${process.env.USER_SERVICE_URL}/api/account`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body),
        })
        const data = await response.json()
        if(!response.ok) {
            throw new Error(data)
        }
        return res.status(200).json(data)
    }catch(error) {
        print_error(error)
        return res.status(500).send("Something went wrong, plase try again later.")
    }
})




/**
 * Authentication Service Endpoints
 */
app.post('/register', async (req, res) => {
    try {
        const response = await fetch(`${process.env.AUTH_SERVICE_URL}/api/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body),
        })
        const data = await response.json()
        if(!response.ok) {
            throw new Error(data)
        }
        return res.status(200).json(data)
    }catch(error) {
        print_error(error)
        return res.status(500).send("Something went wrong, plase try again later.")
    }
})
app.post('/authorize', async (req, res) => {
    try {
        const response = await fetch(`${process.env.AUTH_SERVICE_URL}/api/authorize`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body),
        })
        const data = await response.json()
        if(response.status == 200 || response.status == 401) {
            return res.status(response.status).json(data)
        }
        throw new Error(data)
    }catch(error) {
        print_error(error)
        return res.status(500).send("Something went wrong, plase try again later.")
    }
})
// For dev purposes to see Auth Code table
app.get('/authcodes', async (req, res) => {
    try {
        const response = await fetch(`${process.env.AUTH_SERVICE_URL}/api/authcodes`, {
            method: 'GET',
        })
        const data = await response.json()
        if(!response.ok) {
            throw new Error(data)
        }
        return res.status(200).json(data)
    }catch(error) {
        print_error(error)
        return res.status(500).send("Something went wrong, plase try again later.")
    }
})
app.delete('/authcodes', async (req, res) => {
    try {
        const response = await fetch(`${process.env.AUTH_SERVICE_URL}/api/authcodes`, {
            method: 'DELETE',
            header: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body),
        })
        const data = await response.json()
        if(!response.ok) {
            throw new Error(data)
        }
        return res.status(200).json(data)
    }catch(error) {
        print_error(error)
        return res.status(500).send("Something went wrong, plase try again later.")
    }
})




const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`API Gateway is running on port ${PORT}`);
})




// Helper functions
function print_debug(content) {
    console.debug(`API GATEWAY DEBUG: ${content}`)
}
function print_error(content) {
    console.debug(`API GATEWAY ERROR: ${content}`)
}