const express = require("express");
const router = express.Router();

const db = require("../db");

router.post("/", (req, res) => {
    const { name, email, age } = req.body;

    db.query(
        "INSERT INTO users(name,email,age) VALUES (?,?,?)",
        [name, email, age],
        (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "User Added Successfully"
            });
        }
    );
});

router.get("/", (req, res) => {
    db.query("SELECT * FROM users", (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    });
});

router.put("/:id", (req, res) => {
    const { name, email, age } = req.body;
    const id = req.params.id;

    db.query(
        "UPDATE users SET name=?, email=?, age=? WHERE id=?",
        [name, email, age, id],
        (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "User Updated Successfully"
            });
        }
    );
});

router.delete("/:id", (req, res) => {
    const id = req.params.id;

    db.query(
        "DELETE FROM users WHERE id=?",
        [id],
        (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "User Deleted Successfully"
            });
        }
    );
});

module.exports = router;
