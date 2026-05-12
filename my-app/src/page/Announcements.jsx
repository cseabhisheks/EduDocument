// pages/Announcements.jsx

import { useEffect, useState } from "react";
import AnnouncementCard from "../component/AnnouncementCard";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAnnouncements = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/announcements"
      );

      const data = await response.json();

      setAnnouncements(data);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <h1 className="text-2xl font-bold text-gray-800">
        Announcements
      </h1>

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
              title={item.title}
              description={item.description}
              author={item.author}
              role={item.role}
              date={item.date}
              tags={item.tags}
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