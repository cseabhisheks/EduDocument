import React, { useEffect, useState } from "react";
import { DocumentItem } from "../component/DocumentItem";
import { useNavigate } from "react-router-dom";
import { authHeadersJson } from "../utilities/api";

export default function RecentDocuments() {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `${import.meta.env.VITE_BACKEND}/api/documents`,
          { headers: authHeadersJson() }
        );

        if (res.status === 401) {
          throw new Error("Unauthorized");
        }

        if (!res.ok) {
          throw new Error("Failed to fetch documents");
        }

        const data = await res.json();
        const list = Array.isArray(data) ? data : [];
        setDocuments(list);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  if (loading) {
    return <div className="p-4 text-gray-500">Loading documents...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

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
        {documents.slice(0, 5).map((doc) => (
          <DocumentItem
            key={doc._id || doc.title}
            title={doc.title}
            type={doc.category}      // ✅ FIXED
            course={doc.subject}     // ✅ FIXED
            fileUrl={doc.fileUrl}    // 🔥 IMPORTANT FIX
          />
        ))}
      </div>

      {/* Footer */}
      <div className="text-center mt-4">
        <button
          className="text-sm font-medium text-gray-800 hover:underline"
          onClick={() => navigate("/notes")}
        >
          View all notes →
        </button>
      </div>
    </div>
  );
}