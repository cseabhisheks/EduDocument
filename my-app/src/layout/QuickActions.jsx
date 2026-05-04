import React from "react";
import { FaFolder, FaUpload, FaSearch } from "react-icons/fa";
import { ActionCard } from "../component/ActionCard";
import { useNavigate } from "react-router-dom";

export default function QuickActions() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 m-6">

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

        {/* Common */}
        <ActionCard
          title="Browse Documents"
          Icon={FaFolder}
          onClick={() => navigate("/document-library")}
        />

        <ActionCard
          title="Search Documents"
          Icon={FaSearch}
          onClick={() => navigate("/document-library")}
        />

        {/* 🔐 ROLE-BASED but SAME ROUTE */}
        <ActionCard
          title={
            role === "Admin" || "Faculty"
              ? "Upload File / Assignment"
              : "Submit Assignment"
          }
          Icon={FaUpload}
          onClick={() => navigate("/upload-document")}
        />
        {/* broadcast announcement */}

        {
         (role=="Admin"||role=="Faculty")&&
          <ActionCard
            title="Broadcast Announcement"
            Icon={FaUpload}
            onClick={() => navigate("/upload-document")}
          />
        }
      </div>
    </div>
  );
}