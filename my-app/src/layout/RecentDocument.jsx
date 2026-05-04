import React, { useEffect, useState } from "react";
import { DocumentItem } from "../component/DocumentItem";
import { useNavigate } from "react-router-dom";

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
          `${import.meta.env.VITE_BACKEND}/api/documents`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch documents");
        }

        const data = await res.json();
        setDocuments(data);
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
  console.log(documents)

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
          onClick={() => navigate("/document-library")}
        >
          View all documents →
        </button>
      </div>
    </div>
  );
}