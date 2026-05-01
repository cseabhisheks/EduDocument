// pages/Announcements.jsx
import AnnouncementCard from "../component/AnnouncementCard";

const Announcements = () => {
  const data = [
    {
      title: "Mid-Term Examinations Schedule",
      description:
        "Mid-term examinations will be held from March 15-22, 2026. Please check the detailed schedule on the notice board.",
      author: "Admin",
      role: "Admin",
      date: "24/2/2026",
    },
    {
      title: "Assignment 2 Extended Deadline",
      description:
        "The deadline for Assignment 2 has been extended to March 5, 2026 due to network issues.",
      author: "Dr. Smith",
      role: "Faculty",
      date: "23/2/2026",
      tags: ["Computer Science", "CS301"],
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <h1 className="text-2xl font-bold text-gray-800">Announcements</h1>
      <p className="text-gray-500 text-sm mt-1">
        Stay updated with the latest news and notifications
      </p>

      <div className="mt-6 space-y-4">
        {data.map((item, index) => (
          <AnnouncementCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Announcements;
