import React, { useEffect, useRef, useState } from "react";
import todo_icon from "../assets/todo_icon.png";
import darkIcon from "../assets/dark.png";
import TodoItems from "../components/TodoItems";

const Todo = () => {
  const [TodoList, setTodoList] = useState(
    localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : []
  );

  const prefersDark =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") return true;
    if (saved === "light") return false;
    return prefersDark;
  });

  const inputRef = useRef();

  const add = () => {
    const inputText = inputRef.current.value.trim();

    if (inputText === "") {
      return null;
    }

    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
    };

    setTodoList((prev) => [...prev, newTodo]);
    inputRef.current.value = "";
  };

  const deleteTodo = (id) => {
    setTodoList((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const toggle = (id) => {
    setTodoList((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
      )
    );
  };

  const editTodo = (id, newText) => {
    setTodoList((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(TodoList));
  }, [TodoList]);

  // Persist theme only; we no longer rely on the global 'dark' class
  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <div
      className={`${darkMode ? "bg-gray-900 text-gray-100" : "bg-white"} place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl`}
    >
      {/*------title------ */}
      <div className="flex items-center mt-7 gap-2 justify-between">
        <div className="flex items-center gap-2">
          <img className="w-8" src={todo_icon} alt="todo icon" />
          <h1 className="text-3xl font-semibold">To-Do List</h1>
        </div>
        <button
          aria-label="Toggle dark mode"
          onClick={() => setDarkMode((d) => !d)}
          className={`${darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"} p-2 rounded-full transition`}
          title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          <img className="w-6 h-6" src={darkIcon} alt="toggle theme" />
        </button>
      </div>

      {/*-----input Box ------ */}
      <div
        className={`flex items-center my-7 rounded-full ${darkMode ? "bg-gray-800" : "bg-gray-200"}`}
      >
        <input
          ref={inputRef}
          className={`bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 ${darkMode ? "placeholder:text-slate-300 text-gray-100" : "placeholder:text-slate-600 text-gray-900"}`}
          type="text"
          placeholder="Add your task"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              add();
            }
          }}
        />
        <button
          onClick={add}
          className="border-none rounded-full bg-orange-600 w-32 h-14 text-white text-lg font-medium cursor-pointer"
        >
          Add +
        </button>
      </div>

      {/*-----Todo list------ */}
      <div>
        {TodoList.map((item) => (
          <TodoItems
            key={item.id}
            text={item.text}
            id={item.id}
            isComplete={item.isComplete}
            deleteTodo={deleteTodo}
            toggle={toggle}
            editTodo={editTodo}
          />
        ))}
      </div>
    </div>
  );
};

export default Todo;