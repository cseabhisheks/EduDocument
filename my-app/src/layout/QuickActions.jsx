import React from "react";
import { FaFolder, FaUpload, FaUsers, FaCog, FaFileAlt } from "react-icons/fa";
import { ActionCard } from "../component/ActionCard";
import { useNavigate } from "react-router-dom";

export default function QuickActions() {
  const navigate = useNavigate();

  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  })();
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

        {/* Common */}
        <ActionCard
          title="Notes & materials"
          Icon={FaFolder}
          onClick={() => navigate("/notes")}
        />

        <ActionCard
          title="Assignments"
          Icon={FaFileAlt}
          onClick={() => navigate("/assignments")}
        />

        {/* 🔐 ROLE-BASED but SAME ROUTE */}
        <ActionCard
          title={
            role === "Admin" || role === "Faculty"
              ? "Upload File / Assignment"
              : "Submit Assignment"
          }
          Icon={FaUpload}
          onClick={() => navigate("/upload-document")}
        />
        {/* broadcast announcement */}

        {(role === "Admin" || role === "Faculty") && (
          <ActionCard
            title="Broadcast Announcement"
            Icon={FaUpload}
            onClick={() => navigate("/upload-announcement")}
          />
        )}

        {role === "Admin" && (
          <ActionCard
            title="Admin — teachers & students"
            Icon={FaCog}
            onClick={() => navigate("/admin")}
          />
        )}

        {(role === "Admin" || role === "Faculty") && (
          <ActionCard
            title={role === "Admin" ? "All students" : "Students (your dept)"}
            Icon={FaUsers}
            onClick={() => navigate("/faculty/students")}
          />
        )}
      </div>
    </div>
  );
}