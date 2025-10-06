import axios from "axios";

// Create axios instance with base URL
const api = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

// API service functions
export const todoAPI = {
  // Get all todos
  getAllTodos: async () => {
    try {
      const response = await api.get("/todos");
      return response.data;
    } catch (error) {
      console.error("Error fetching todos:", error);
      throw error;
    }
  },

  // Create a new todo
  createTodo: async (task) => {
    try {
      const response = await api.post("/todos", { task });
      return response.data;
    } catch (error) {
      console.error("Error creating todo:", error);
      throw error;
    }
  },

  // Update a todo
  updateTodo: async (id, updates) => {
    try {
      const response = await api.patch(`/todos/${id}`, updates);
      return response.data;
    } catch (error) {
      console.error("Error updating todo:", error);
      throw error;
    }
  },

  // Delete a todo
  deleteTodo: async (id) => {
    try {
      const response = await api.delete(`/todos/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting todo:", error);
      throw error;
    }
  },
};

export default api;
