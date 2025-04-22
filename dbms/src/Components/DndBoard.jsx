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
  const containers = ['A', 'B', 'C'];
  const [parent, setParent] = useState(null);
  const draggableMarkup = (
    <Draggable id="draggable">Drag upsdbfjhsdbjh</Draggable>
  );

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
