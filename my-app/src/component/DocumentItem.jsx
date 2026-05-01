import React from "react";
import { FaFileAlt, FaDownload } from "react-icons/fa";

export function DocumentItem({ title, type, course, onDownload }) {
  return (
    <div className="flex items-center justify-between py-4 border-b last:border-none">
      
      {/* Left */}
      <div className="flex items-center gap-4">
        <div className="bg-blue-100 text-blue-600 p-3 rounded-lg">
          <FaFileAlt />
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-900">
            {title}
          </h3>

          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs bg-gray-100 px-2 py-1 rounded-full capitalize">
              {type}
            </span>
            <span className="text-xs text-gray-500">
              {course}
            </span>
          </div>
        </div>
      </div>

      {/* Right */}
      <button
        onClick={onDownload}
        className="text-gray-500 hover:text-gray-800"
      >
        <FaDownload />
      </button>
    </div>
  );
}