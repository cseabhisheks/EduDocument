// components/AnnouncementCard.jsx
import { FaBell, FaUser, FaCalendarAlt } from "react-icons/fa";

const AnnouncementCard = ({
  title,
  description,
  author,
  role,
  date,
  tags = [],
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border p-5 flex gap-4 items-start">
      
      {/* Icon */}
      <div className="bg-orange-100 p-3 rounded-xl">
        <FaBell className="text-orange-500 text-lg" />
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-500 text-sm mt-1">{description}</p>

        {/* Footer */}
        <div className="flex flex-wrap items-center gap-3 mt-3 text-sm text-gray-500">
          
          <span className="flex items-center gap-1">
            <FaUser /> {author}
          </span>

          {role && (
            <span className="bg-red-100 text-red-500 px-2 py-0.5 rounded-full text-xs">
              {role}
            </span>
          )}

          <span className="flex items-center gap-1">
            <FaCalendarAlt /> {date}
          </span>

          {/* Tags */}
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-100 px-2 py-0.5 rounded-full text-xs text-gray-700"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementCard;
