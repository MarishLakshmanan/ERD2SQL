import React, { useEffect, useState } from "react";
import { data, useNavigate } from "react-router-dom";
import { auth } from "../firebase-config";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
// import { auth } from "../firebase-config";
// import { getFirestore, collection, query, where, getDocs, connectFirestoreEmulator } from "firebase/firestore";

export default function Home() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  // const db = getFirestore();
  // connectFirestoreEmulator(db, "127.0.0.1", 8080)

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
    const user = localStorage.getItem("uid")
    const url = `http://127.0.0.1:5000/api/data?email=${encodeURIComponent(user)}`;
    const token = localStorage.getItem('jwt');

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });

    const json = await res.json()
    console.log(json);
    setProjects(json.diagrams)
    
    
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
          { label: "Import from", action: () => alert("Coming soon...") },
          { label: "Sign Out", action: () => navigate("/") },
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
      {projects.length > 0 &&
      <div className="w-full max-w-6xl">
        <table className="w-full text-left border-t border-gray-200">
          <thead className="text-sm text-gray-500">
            <tr>
              <th className="py-3 w-[10%]">Diagram</th>
              <th className="py-3 w-[60%]">Title</th>
              <th className="py-3 w-[20%]">Date</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-gray-100">
            {projects.map((project,index) => (
              <tr
                key={project.id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => navigate(`/editor`,{state:{node:project.nodes,edge:project.edges,name:project.name,id:project.id}})}
              >
                <td className="py-2">{index+1}</td>
                <td className="py-2 font-medium">{project.name || "Untitled"}</td>
                <td className="py-2">
                  {new Date(project.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  }) || "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>}
    </div>
  );
}