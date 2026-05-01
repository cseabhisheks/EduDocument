import { FiBell } from "react-icons/fi";

export default function AnnouncementItem({
  title,
  description,
  author,
  date,
}) {
  return (
    <div className="flex gap-3 py-4 border-b last:border-b-0">
      <div className="mt-1 text-orange-500">
        <FiBell size={18} />
      </div>

      <div className="flex-1">
        <h3 className="font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600 mt-1">{description}</p>

        <div className="text-xs text-gray-500 mt-2">
          {author} • {date}
        </div>
      </div>
    </div>
  );
}