const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose"); // ✅ Import Mongoose
// Load .env if available, but don't crash if not installed
try {
  require("dotenv").config();
} catch (_) {
  // dotenv not installed; proceed without it
}
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB (env or fallback to local)
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/todos";

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Create Mongoose model
const TodoSchema = new mongoose.Schema({
  task: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

const Todo = mongoose.model("Todo", TodoSchema);

// 1) Create Todo
app.post("/todos", async (req, res) => {
  try {
    const { task } = req.body;
    if (!task || typeof task !== "string" || !task.trim()) {
      return res.status(400).json({ error: "Task is required" });
    }

    const newTodo = await Todo.create({ task: task.trim() });
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// 2) Get All Todos
app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// 3) Update Todo
app.patch("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { task, completed } = req.body;

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { task, completed },
      { new: true } // ✅ return updated document
    );

    if (!updatedTodo) return res.status(404).json({ error: "Todo not found" });
    res.json(updatedTodo);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// 4) Delete Todo
app.delete("/todos/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Todo deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
