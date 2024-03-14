var express = require("express");
var router = express.Router();
var db = require("../models/db");

router.get("/", (req, res) => {
    res.send("hello world")
})

router.get("/accounts", async (req, res) => {
    try {
        const result = await db.helpers.get_accounts()
        console.log(result)
        res.status(200).json(result)
    }
    catch (e) {
        res.status(500).json(e)
    }
})

router.post("/create", async (req, res) => {
    const values = [
        req.body.username,
        req.body.email,
        req.body.password
    ]

    try {
        const result = await db.helpers.create_account(values)
        console.log(result)
        res.status(200).json(result)
    }
    catch (e) {
        res.status(500).json(e)
    }
})

// NOTE: fails if username is not unique, should check for username/email pairs
// TODO this doesnt work properly
router.post("/verify", async (req, res) => {
    const values = [
        req.body.username
    ]

    console.log('THE USERNAME IS ', req.body.username)

    try {
        const result = await db.helpers.verify_unique_username(values)
        console.log("QUERY RESULT ", result)
        res.status(200).json({ num_users: result })
    }
    catch (e) {
        res.status(500).json(e)
    }
})

module.exports = router;