import { useEffect, useState } from "react";
import AnnouncementItem from "../component/AnnouncementItem";
import { useNavigate } from "react-router-dom";

export default function AnnouncementsCard() {
  const navigate = useNavigate();
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/announcements")
      .then(res => res.json())
      .then(data => setAnnouncements(data))
      .catch(err => console.error(err));
  }, []);

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
        {announcements.map((item, index) => (
          <AnnouncementItem
            key={index}
            title={item.title}
            description={item.description}
            author={item.author}
            date={new Date(item.createdAt).toLocaleDateString()}
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