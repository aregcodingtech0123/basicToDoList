const express = require('express');
const app = express();
const cors = require("cors");
const pool = require("./db.js");
const crypto = require("crypto"); //imported 'crypto' to use SHA-256

// Middleware
app.use(cors());
app.use(express.json());

// CREATE: Yeni Todo Ekle
app.post('/todos', async (req, res) => {
    try {
        const { description } = req.body;
        const todo_id = crypto.createHash("sha256").update(description + Date.now().toString()).digest("hex"); // SHA-256 hash oluştur

        const newTodo = await pool.query(
            "INSERT INTO todo (todo_id, description) VALUES($1, $2) RETURNING *",
            [todo_id, description]
        );
        
        res.json(newTodo.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
});

// READ: Tüm Todo'ları Getir
app.get('/todos', async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo ORDER BY todo_id ASC");
        res.json(allTodos.rows);
    } catch (error) {
        console.error(error.message);
    }
});

// READ: Tek Todo Getir
app.get('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id=$1", [id]);
        res.json(todo.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
});

// UPDATE: Bir Todo'yu Güncelle
app.put('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        await pool.query("UPDATE todo SET description=$1 WHERE todo_id=$2", [description, id]);
        res.json("Todo was updated!");
    } catch (error) {
        console.error(error.message);
    }
});

// DELETE: Bir Todo'yu Sil
app.delete('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query("DELETE FROM todo WHERE todo_id=$1", [id]);
        res.json("Todo was deleted!");
    } catch (error) {
        console.error(error.message);
    }
});

// Sunucuyu Başlat
app.listen(5000, () => {
    console.log("Server has started on port 5000");
});
