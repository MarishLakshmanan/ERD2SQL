import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase-config";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

export default function Home() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const db = getFirestore();

  useEffect(() => {
    const user = localStorage.getItem("uid")
    if (!user) {
      navigate("/");
      return;
    }
    setUserEmail(user);
    fetchProjects(user);
  }, []);

  const fetchProjects = async (uid) => {
    const q = query(collection(db, "projects"), where("userId", "==", uid));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc, index) => ({
      id: doc.id,
      index: index + 1,
      ...doc.data(),
    }));
    setProjects(data);
  };

  return (
    <div className="min-h-screen bg-white px-8 py-10 flex flex-col items-center">
      {/* Header */}
      <div className="w-full max-w-6xl flex items-center gap-4 mb-8">
        <img
          src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${userEmail}`}
          alt="User avatar"
          className="w-12 h-12 rounded-full"
        />
        <h1 className="text-xl font-medium">User: {userEmail}</h1>
      </div>

      {/* Top Actions */}
      <div className="w-full max-w-6xl grid grid-cols-3 gap-6 mb-10">
        {[
          { label: "Create New", action: () => navigate("/editor") },
          { label: "Share", action: () => alert("Coming soon...") },
          { label: "Import from", action: () => alert("Coming soon...") },
        ].map(({ label, action }) => (
          <div
            key={label}
            className="border p-6 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer text-center"
            onClick={action}
          >
            <p className="text-sm font-medium text-gray-700">{label}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="w-full max-w-6xl">
        <table className="w-full text-left border-t border-gray-200">
          <thead className="text-sm text-gray-500">
            <tr>
              <th className="py-3 w-[10%]">Diagram</th>
              <th className="py-3 w-[60%]">Title</th>
              <th className="py-3 w-[20%]">Date</th>
              <th className="py-3 w-[10%] text-center">...</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-gray-100">
            {projects.map((proj) => (
              <tr
                key={proj.id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => navigate(`/editor?id=${proj.id}`)}
              >
                <td className="py-2">{proj.index}</td>
                <td className="py-2 font-medium">{proj.title || "Untitled"}</td>
                <td className="py-2">
                  {proj.createdAt?.toDate().toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  }) || "—"}
                </td>
                <td className="py-2 text-center text-gray-400 text-xl">⋯</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}