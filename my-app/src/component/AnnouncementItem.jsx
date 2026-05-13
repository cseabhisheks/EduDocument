import { useEffect, useState } from "react";
import { FiBell, FiTrash2 } from "react-icons/fi";

export default function AnnouncementItem({
  id,
  title,
  description,
  author,
  date,
  isAdmin = false,
  onDelete,
}) {
  return (
    <div className="flex gap-3 py-4 border-b last:border-b-0 items-start">
      <div className="mt-1 text-orange-500 shrink-0">
        <FiBell size={18} />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600 mt-1">{description}</p>

        <div className="text-xs text-gray-500 mt-2">
          {author} • {date}
        </div>
      </div>

      {isAdmin && id && typeof onDelete === "function" && (
        <button
          type="button"
          onClick={() => onDelete(id)}
          className="shrink-0 text-red-600 border border-red-200 p-2 rounded-lg hover:bg-red-50"
          title="Delete"
        >
          <FiTrash2 size={16} />
        </button>
      )}
    </div>
  );
}