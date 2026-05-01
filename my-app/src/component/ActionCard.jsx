import React from "react";

export function ActionCard({ title, Icon, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center gap-2 
      border border-gray-200 rounded-xl p-6 w-full 
      hover:bg-gray-100 transition"
    >
      <Icon className="text-2xl text-gray-700" />
      <span className="text-sm font-medium text-gray-800">
        {title}
      </span>
    </button>
  );
}