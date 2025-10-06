import {
  readAllTodos,
  createTodoItem,
  updateTodoItem,
  deleteTodoItem,
} from "../services/todos.service.js";

export async function getTodos(_req, res, next) {
  try {
    const todos = await readAllTodos();
    res.json(todos);
  } catch (err) {
    next(err);
  }
}

export async function createTodo(req, res, next) {
  try {
    const { task } = req.body || {};
    if (!task || typeof task !== "string" || task.trim().length === 0) {
      return res.status(400).json({ message: "'task' is required" });
    }
    const newTodo = await createTodoItem({ text: task.trim() });
    res.status(201).json(newTodo);
  } catch (err) {
    next(err);
  }
}

export async function updateTodo(req, res, next) {
  try {
    const { id } = req.params;
    const { text, isComplete } = req.body || {};
    const updated = await updateTodoItem(id, { text, isComplete });
    if (!updated) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

export async function deleteTodo(req, res, next) {
  try {
    const { id } = req.params;
    const ok = await deleteTodoItem(id);
    if (!ok) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}


