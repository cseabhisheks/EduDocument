import { useEffect, useState } from "react";
import AnnouncementItem from "../component/AnnouncementItem";
import { useNavigate } from "react-router-dom";
import { authHeadersJson } from "../utilities/api";

export default function AnnouncementsCard() {
  const navigate = useNavigate();
  const [announcements, setAnnouncements] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      setUser(JSON.parse(localStorage.getItem("user") || "null"));
    } catch {
      setUser(null);
    }
  }, []);

  const load = () => {
    fetch(`${import.meta.env.VITE_BACKEND}/api/announcements`)
      .then((res) => res.json())
      .then((data) => setAnnouncements(Array.isArray(data) ? data : []))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this announcement?")) return;
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND}/api/announcements/${id}`,
        { method: "DELETE", headers: authHeadersJson() }
      );
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        alert(data.message || "Delete failed");
        return;
      }
      load();
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div className="mx-auto bg-gray-100 rounded-xl p-6 shadow-sm border w-full border-gray-200">

      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Announcements
        </h2>
        <p className="text-sm text-gray-500">
          Latest news and updates
        </p>
      </div>

      <div className="divide-y">
        {announcements.map((item) => (
          <AnnouncementItem
            key={item._id}
            id={item._id}
            title={item.title}
            description={item.description}
            author={item.author}
            date={new Date(item.createdAt).toLocaleDateString()}
            isAdmin={user?.role === "Admin"}
            onDelete={handleDelete}
          />
        ))}
      </div>
      <hr className="border-[1.5px]" />
      <div className="text-center mt-6">
        <button
          className="text-sm font-medium text-gray-800 hover:underline"
          onClick={() => navigate("/announcement")}
        >
          View all announcements →
        </button>
      </div>
    </div>
  );
}