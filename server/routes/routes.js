const express = require("express");
const db = require("../db/mongodb.js");
const router = express.Router();

const errorObject = {
    status: "error",
    title: "Error",
    info: "An unexpected error occured, please try again later"
};

router.get("/", async (req, res) => {
    try {
        const result = await db.readTodo();
        res.status(200).json(result);
    } catch(err) {
        res.status(500).json(errorObject);
    }
});

router.post("/", async (req, res) => {
    try {
        const { newTask } = req.body;
        const result = await db.createTodo(newTask);
        res.status(200).json(result);
    } catch(err) {
        res.status(500).json(errorObject);
    }
});

router.patch("/:id/updatetask", async (req, res) => {
    try {
        const { id } = req.params;
        const { updatedTask } = req.body;
        const result = await db.updateTodo(id, updatedTask);
        res.status(200).json(result);
    } catch(err) {
        res.status(500).json(errorObject);
    }
});

router.patch("/:id/finishtask", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db.finishTodo(id);
        res.status(200).json(result);
    } catch(err) {
        res.status(500).json(errorObject);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db.deleteTodo(id);
        res.status(200).json(result);
    } catch(err) {
        res.status(500).json(errorObject);
    }
});

module.exports = router;