import React from "react";
import { DocumentItem } from "../component/DocumentItem";
import { useNavigate } from "react-router-dom";

export default function RecentDocuments() {
  const navigate=useNavigate();
  
    const documents = [
    {
        title: "Introduction to Data Structures",
        type: "notes",
        course: "CS301",
    },
    {
        title: "Arrays and Linked Lists",
        type: "notes",
        course: "CS301",
    },
    {
        title: "Assignment 1 - Sorting Algorithms",
        type: "assignment",
        course: "CS301",
    },
    {
        title: "Lab Manual - Data Structures",
        type: "lab",
        course: "CS301",
    },
    {
        title: "CS301 Syllabus 2026",
        type: "syllabus",
        course: "CS301",
    },
];
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
      
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Recent Documents
        </h2>
        <p className="text-sm text-gray-500">
          Latest uploads and updates
        </p>
      </div>

      {/* List */}
      <div>
        {documents.map((doc, index) => (
          <DocumentItem
            key={index}
            title={doc.title}
            type={doc.type}
            course={doc.course}
            onDownload={() => console.log("Download", doc.title)}
          />
        ))}
      </div>

      {/* Footer */}
      <div className="text-center mt-4">
        <button className="text-sm font-medium text-gray-800 hover:underline" onClick={()=>{navigate("/document-library")}}>
          View all documents →
        </button>
      </div>
    </div>
  );
}