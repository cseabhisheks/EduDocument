import AnnouncementItem from "../component/AnnouncementItem";
import { useNavigate } from "react-router-dom";

export default function AnnouncementsCard() {
  const navigate=useNavigate();
  const announcements = [
    {
      title: "Mid-Term Examinations Schedule",
      description:
        "Mid-term examinations will be held from March 15-22, 2026. Please check the detailed schedule on the notice board.",
      author: "Admin",
      date: "24/2/2026",
    },
    {
      title: "Assignment 2 Extended Deadline",
      description:
        "The deadline for Assignment 2 has been extended to March 5, 2026 due to network issues.",
      author: "Dr. Smith",
      date: "23/2/2026",
    },
    {
      title: "Library Hours Extended",
      description:
        "Library will now remain open until 10 PM on weekdays to facilitate exam preparation.",
      author: "Admin",
      date: "22/2/2026",
    },
  ];

  return (
    <div className="max-w-2xl mx-auto bg-gray-100 rounded-xl p-6 shadow-sm border border-gray-200">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Announcements
        </h2>
        <p className="text-sm text-gray-500">
          Latest news and updates
        </p>
      </div>

      {/* List */}
      <div className="divide-y">
        {announcements.map((item, index) => (
          <AnnouncementItem key={index} {...item} />
        ))}
      </div>

      {/* Footer */}
      <div className="text-center mt-6">
        <button className="text-sm font-medium text-gray-800 hover:underline" onClick={()=>{navigate('/announcement')}}>
          View all announcements →
        </button>
      </div>
    </div>
  );
}