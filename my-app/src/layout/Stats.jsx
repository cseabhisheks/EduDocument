import { useEffect, useState } from "react";
import StatCard from "../component/StatCard";
import { FaFileAlt, FaUpload, FaBook } from "react-icons/fa";
import { authHeadersJson } from "../utilities/api";

function normalizeId(v) {
  if (v == null) return "";
  if (typeof v === "object" && v.toString) return v.toString();
  return String(v);
}

export default function Stats() {
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    user = null;
  }

  const [stats, setStats] = useState({
    totalDocuments: 0,
    myUploads: 0,
    studyMaterials: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND}/api/documents`,
          { headers: authHeadersJson() }
        );

        if (res.status === 401) {
          setStats({ totalDocuments: 0, myUploads: 0, studyMaterials: 0 });
          return;
        }

        const data = await res.json();
        const documents = Array.isArray(data) ? data : [];
        const uid = normalizeId(user?._id);

        const myUploads = documents.filter(
          (doc) => normalizeId(doc.uploaderId) === uid && uid !== ""
        ).length;

        const studyMaterials = documents.filter(
          (doc) => (doc.category || "") !== "Assignment"
        ).length;

        setStats({
          totalDocuments: documents.length,
          myUploads,
          studyMaterials,
        });
      } catch (err) {
        console.error("Failed to fetch stats", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Welcome back, {user?.name || user?.email || "User"}!
        </h1>
        <p className="text-gray-500 mt-1">
          Access study materials, teacher assignments, and your submissions.
        </p>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading stats...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard
            title="Documents in your scope"
            value={stats.totalDocuments}
            subtitle="Notes, handouts, and assignments you can access"
            icon={FaFileAlt}
          />
          <StatCard
            title="My uploads"
            value={stats.myUploads}
            subtitle="Files you uploaded"
            icon={FaUpload}
          />
          <StatCard
            title="Notes & materials"
            value={stats.studyMaterials}
            subtitle="Non-assignment items (notes, papers, etc.)"
            icon={FaBook}
          />
        </div>
      )}
    </div>
  );
}
