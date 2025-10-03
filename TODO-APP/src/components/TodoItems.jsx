import React, { useState } from "react";
import tick from "../assets/tick.png";
import not_tick from "../assets/not_tick.png";
import delete_icon from "../assets/delete.png";
import edit_icon from "../assets/edit.png";

const TodoItems = ({ text, id, isComplete, deleteTodo, toggle, editTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(text);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleSave = () => {
    if (newText.trim() !== "") {
      editTodo(id, newText.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setNewText(text);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  return (
    <div className="flex items-center my-3 gap-2 bg-gray-100 p-3 rounded-lg">
      {/* ----Toggle Text Input---- */}
      <div
        onClick={() => !isEditing && toggle(id)}
        className="flex flex-1 items-center cursor-pointer"
      >
        <img src={isComplete ? tick : not_tick} alt="" className="w-7" />

        {isEditing ? (
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="ml-4 px-2 py-1 border rounded w-full outline-none"
            autoFocus
          />
        ) : (
          <p
            className={`text-slate-700 ml-4 text-[17px] ${
              isComplete ? "line-through" : ""
            }`}
          >
            {text}
          </p>
        )}
      </div>

      {/* -----Edit button----- */}
      {isEditing ? (
        <>
          <button
            onClick={handleSave}
            className="bg-green-700 text-white px-2 py-1 rounded text-sm mr-2"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="bg-gray-400 text-white px-2 py-1 rounded text-sm mr-2"
          >
            Cancel
          </button>
        </>
      ) : (
        <img
          onClick={() => setIsEditing(true)}
          src={edit_icon}
          alt="edit"
          className="w-4 cursor-pointer mr-2"
        />
      )}

      {/* ----Delete / Confirm----- */}
      {confirmDelete ? (
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-700">
            Are you sure to delete this?
          </span>
          <button
            onClick={() => deleteTodo(id)}
            className="bg-red-600 text-white px-2 py-1 rounded text-xs"
          >
            Yes
          </button>
          <button
            onClick={() => setConfirmDelete(false)}
            className="bg-gray-400 text-white px-2 py-1 rounded text-xs"
          >
            No
          </button>
        </div>
      ) : (
        <img
          onClick={() => setConfirmDelete(true)}
          src={delete_icon}
          alt="delete"
          className="w-4 cursor-pointer"
        />
      )}
    </div>
  );
};

export default TodoItems;
