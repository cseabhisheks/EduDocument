import React from "react";
import { FaFolder, FaUpload, FaSearch } from "react-icons/fa";
import { ActionCard } from "../component/ActionCard";

export default function QuickActions() {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
      
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Quick Actions
        </h2>
        <p className="text-sm text-gray-500">
          Common tasks to get you started
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <ActionCard
          title="Browse Documents"
          Icon={FaFolder}
          onClick={() => console.log("Browse")}
        />
        <ActionCard
          title="Upload File"
          Icon={FaUpload}
          onClick={() => console.log("Upload")}
        />
        <ActionCard
          title="Search Documents"
          Icon={FaSearch}
          onClick={() => console.log("Search")}
        />
      </div>
    </div>
  );
}