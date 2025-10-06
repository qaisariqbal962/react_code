Todo Backend

Express REST API for the React Todo app.

Endpoints
- GET /health → { status: "ok" }
- GET /todos → list all todos
- POST /todos → create todo { task }
- PATCH /todos/:id → update fields { text?, isComplete? }
- DELETE /todos/:id → remove todo

Data shape
{
  "id": "string",
  "text": "string",
  "isComplete": false,
  "createdAt": "ISO",
  "updatedAt": "ISO"
}

Setup
1. cd server
2. npm install
3. Create .env (optional):
   PORT=5000
   CLIENT_ORIGIN=http://localhost:5173
4. Start dev server:
   npm run dev

Data is stored in server/data/todos.json


