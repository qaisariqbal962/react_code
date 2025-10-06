import { promises as fs } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { nanoid } from "nanoid";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DATA_DIR = join(__dirname, "../../data");
const DATA_FILE = join(DATA_DIR, "todos.json");

async function ensureDataFile() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, JSON.stringify([], null, 2), "utf8");
  }
}

async function readFileJson() {
  await ensureDataFile();
  const raw = await fs.readFile(DATA_FILE, "utf8");
  return JSON.parse(raw || "[]");
}

async function writeFileJson(todos) {
  await fs.writeFile(DATA_FILE, JSON.stringify(todos, null, 2), "utf8");
}

export async function readAllTodos() {
  return await readFileJson();
}

export async function createTodoItem({ text }) {
  const todos = await readFileJson();
  const newTodo = {
    id: nanoid(),
    text,
    isComplete: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  todos.push(newTodo);
  await writeFileJson(todos);
  return newTodo;
}

export async function updateTodoItem(id, updates) {
  const todos = await readFileJson();
  const index = todos.findIndex((t) => t.id === id);
  if (index === -1) return null;

  const current = todos[index];
  const next = {
    ...current,
    ...(typeof updates.text === "string" ? { text: updates.text } : {}),
    ...(typeof updates.isComplete === "boolean"
      ? { isComplete: updates.isComplete }
      : {}),
    updatedAt: new Date().toISOString(),
  };
  todos[index] = next;
  await writeFileJson(todos);
  return next;
}

export async function deleteTodoItem(id) {
  const todos = await readFileJson();
  const next = todos.filter((t) => t.id !== id);
  if (next.length === todos.length) return false;
  await writeFileJson(next);
  return true;
}


