import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");

  // Get user email from stored token (fake decode here for simplicity)
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate("/");
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUserEmail(payload.sub || "User");
    } catch (e) {
      console.error("Invalid token");
      localStorage.removeItem("jwt");
      navigate("/");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center text-lg font-semibold text-blue-800">
            😊
          </div>
          <span className="text-lg font-medium">User: {userEmail}</span>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded"
        >
          Logout
        </button>
      </div>

      {/* Action Buttons */}
        <div className="flex justify-center gap-8 mb-8">
        <button
        onClick={() => navigate("/editor")}
        className="px-8 py-3 border rounded hover:shadow"
        >
        Create New
        </button>

        <button className="px-8 py-3 border rounded hover:shadow">Share</button>
        <button className="px-8 py-3 border rounded hover:shadow">Import from</button>
      </div>

      {/* Table Header */}
      <div className="border-t pt-4">
        <div className="grid grid-cols-4 text-sm text-gray-600 font-medium border-b pb-2 mb-2">
          <span>Diagram</span>
          <span>Title</span>
          <span>Date</span>
          <span>...</span>
        </div>

        {/* Empty state (future: list projects here) */}
        <div className="text-gray-400 text-sm text-center mt-8">
          No diagrams yet. Start by clicking "Create New".
        </div>
      </div>
    </div>
  );
};

export default Home;
