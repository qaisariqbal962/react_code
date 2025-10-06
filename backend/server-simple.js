const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ In-memory database (for demo purposes)
let todos = [];
let nextId = 1;

// Helper function to find todo by ID
const findTodoById = (id) => todos.find((todo) => todo._id === id);

// 1) Create Todo
app.post("/todos", (req, res) => {
  try {
    const { task } = req.body;
    if (!task || typeof task !== "string" || !task.trim()) {
      return res.status(400).json({ error: "Task is required" });
    }

    const newTodo = {
      _id: nextId.toString(),
      task: task.trim(),
      completed: false,
    };

    todos.push(newTodo);
    nextId++;
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// 2) Get All Todos
app.get("/todos", (req, res) => {
  try {
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// 3) Update Todo
app.patch("/todos/:id", (req, res) => {
  try {
    const { id } = req.params;
    const { task, completed } = req.body;

    const todoIndex = todos.findIndex((todo) => todo._id === id);
    if (todoIndex === -1) {
      return res.status(404).json({ error: "Todo not found" });
    }

    if (task !== undefined) todos[todoIndex].task = task;
    if (completed !== undefined) todos[todoIndex].completed = completed;

    res.json(todos[todoIndex]);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// 4) Delete Todo
app.delete("/todos/:id", (req, res) => {
  try {
    const { id } = req.params;
    const todoIndex = todos.findIndex((todo) => todo._id === id);

    if (todoIndex === -1) {
      return res.status(404).json({ error: "Todo not found" });
    }

    todos.splice(todoIndex, 1);
    res.json({ message: "Todo deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(
    "✅ Using in-memory database (data will reset on server restart)"
  );
});
