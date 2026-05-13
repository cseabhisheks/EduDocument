import { useEffect, useState } from "react";
import AnnouncementCard from "../component/AnnouncementCard";
import { authHeadersJson } from "../utilities/api";

const API = import.meta.env.VITE_BACKEND;

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      setUser(JSON.parse(localStorage.getItem("user") || "null"));
    } catch {
      setUser(null);
    }
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await fetch(`${API}/api/announcements`);
      const data = await response.json();
      setAnnouncements(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this announcement permanently?")) return;
    try {
      const res = await fetch(`${API}/api/announcements/${id}`, {
        method: "DELETE",
        headers: authHeadersJson(),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        alert(data.message || "Delete failed");
        return;
      }
      fetchAnnouncements();
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <h1 className="text-2xl font-bold text-gray-800">Announcements</h1>

      <p className="text-gray-500 text-sm mt-1">
        Stay updated with the latest news and notifications
      </p>

      <div className="mt-6 space-y-4">
        {loading ? (
          <p>Loading...</p>
        ) : announcements.length > 0 ? (
          announcements.map((item) => (
            <AnnouncementCard
              key={item._id}
              id={item._id}
              title={item.title}
              description={item.description}
              author={item.author}
              role={item.role}
              date={
                item.createdAt
                  ? new Date(item.createdAt).toLocaleDateString()
                  : ""
              }
              tags={item.tags}
              isAdmin={user?.role === "Admin"}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <p>No announcements found</p>
        )}
      </div>
    </div>
  );
};

export default Announcements;
