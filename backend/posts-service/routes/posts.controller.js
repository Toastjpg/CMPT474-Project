var express = require("express");
var router = express.Router();
var db = require("../models/db");

/* get all posts */
router.get("/posts", async (req, res) => {
    const result = await db.helpers.get_all_posts();
    res.status(200).json(result);
});

// get post w/ id
router.get("/posts/:id", async (req, res) => {
    try {
        const result = await db.helpers.get_post_by_id(req.params.id);

        if (!result) {
            res.status(404).json({ message: "Invalid recipe_id" });
            return;
        }

        res.status(200).json(result);
    } catch (e) {
        res.status(500).json(e);
    }
});

// Create post, takes obj with two string params (title and content)
router.post("/posts", async (req, res) => {
    try {
        if (!req.body.title || !req.body.content) {
            res.status(400).json({ message: "Invalid request format" });
            return;
        }
        let obj = {
            title: req.body.title,
            content: req.body.content,
        };

        // Returns entire new object thats been created
        const result = await db.helpers.create_post(obj);

        if (!result) {
            res.status(500).json({ message: "Failed to create post" });
            return;
        }

        res.status(201).json(result);
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
});

// Delete post by id
router.delete("/posts/:id", async (req, res) => {
    try {
        const result = await db.helpers.delete_post(req.params.id);
        if (result === 0) {
            res.status(404).json({ message: "Invalid post to delete" });
            return;
        }
        res.json({ num_deleted: result });
    } catch (e) {
        res.status(500).json(e);
    }
});

// Update post by id
router.put("/posts/:id", async (req, res) => {
    try {
        if (!req.body.title || !req.body.content) {
            res.status(400).json({ message: "Invalid request format" });
            return;
        }
        let obj = {
            title: req.body.title,
            content: req.body.content,
        };

        // Returns row count of objects modified
        const result = await db.helpers.update_post(req.params.id, obj);

        if (result === 0) {
            res.status(500).json({ message: "Failed to update post" });
            return;
        }

        res.status(201).json({ num_changed: result });
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
});

module.exports = router;
