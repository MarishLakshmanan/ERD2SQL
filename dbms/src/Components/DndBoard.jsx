// File: src/Components/DndBoard.jsx

import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";

const SHAPE_TYPES = [
  { id: "entity", label: "Entity", className: "rounded-none border-2" },
  { id: "attribute", label: "Attribute", className: "rounded-full border" },
  { id: "relationship", label: "Relationship", className: "rotate-45 w-24 h-24 border transform" },
  { id: "primaryKey", label: "Primary Key", className: "rounded-full border font-bold underline" },

];

export default function DndBoard() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState(auth.currentUser?.email || "");
  const [items, setItems] = useState([]);
  const [draggingId, setDraggingId] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (err) {
      console.error("Sign out failed:", err);
    }
  };

  const handleAddShape = (type) => {
    const shape = SHAPE_TYPES.find((s) => s.label === type);
    const newItem = {
      id: uuidv4(),
      type: shape.id,
      label: type,
      className: shape.className,
      x: 100 + Math.random() * 400,
      y: 100 + Math.random() * 300,
    };
    setItems((prev) => [...prev, newItem]);
  };

  const handleMouseDown = (e, id) => {
    if (e.detail === 2) {
      setEditingId(id);
    } else {
      setDraggingId(id);
    }
  };

  const handleMouseMove = (e) => {
    if (!draggingId) return;
    const canvas = document.getElementById("canvas");
    const bounds = canvas.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;

    setItems((prev) =>
      prev.map((item) =>
        item.id === draggingId ? { ...item, x, y } : item
      )
    );
  };

  const handleMouseUp = () => {
    setDraggingId(null);
  };

  const handleLabelChange = (e, id) => {
    const newLabel = e.target.value;
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, label: newLabel } : item
      )
    );
  };

  const handleKeyDown = (e, id) => {
    if (e.key === "Enter") {
      setEditingId(null);
    }
    if (e.key === "Backspace" && e.target.value === "") {
      setItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  return (
    <div
      className="flex flex-col h-screen bg-gray-100"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <header className="flex justify-between items-center px-6 py-2 bg-white shadow border-b">
        <div className="text-lg font-semibold">ERD Canvas</div>
        <div className="text-sm flex items-center gap-4">
          <span className="text-gray-700">{userEmail}</span>
          <button
            onClick={handleSignOut}
            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
          >
            Sign Out
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-52 bg-white border-r p-4 text-sm">
          <h2 className="font-semibold mb-3">Shapes</h2>
          <div className="flex flex-col gap-2">
            {SHAPE_TYPES.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => handleAddShape(label)}
                className="bg-gray-100 hover:bg-gray-200 rounded px-2 py-1 text-left"
              >
                {label}
              </button>
            ))}
          </div>
        </aside>

        <main className="flex-1 p-4 bg-gray-200 overflow-auto relative">
          <div
            id="canvas"
            className="relative w-full h-full bg-white border-2 border-blue-500 rounded"
          >
            {items.map((item) => (
              <div
                key={item.id}
                onMouseDown={(e) => handleMouseDown(e, item.id)}
                style={{ left: item.x, top: item.y }}
                className={`absolute px-2 py-1 bg-green-100 cursor-move text-xs text-center ${item.className}`}
              >
                {editingId === item.id ? (
                  <input
                    type="text"
                    className="text-xs border rounded px-1"
                    value={item.label}
                    onChange={(e) => handleLabelChange(e, item.id)}
                    onKeyDown={(e) => handleKeyDown(e, item.id)}
                    autoFocus
                  />
                ) : (
                  item.label
                )}
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
