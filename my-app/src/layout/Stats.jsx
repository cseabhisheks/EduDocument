import { useEffect, useState } from "react";

import StatCard from "../component/StatCard";

import { FaFileAlt, FaUpload } from "react-icons/fa";

import { FaArrowTrendUp } from "react-icons/fa6";

export default function Stats() {

  // USER
  const user =
    JSON.parse(localStorage.getItem("user"));

  // STATE
  const [stats, setStats] = useState({
    totalDocuments: 0,
    myUploads: 0,
    totalDownloads: 0
  });

  const [loading, setLoading] =
    useState(true);

  // FETCH DOCUMENTS
  useEffect(() => {

    fetchStats();

  }, []);

  const fetchStats = async () => {

    try {

      const res = await fetch(
        `${import.meta.env.VITE_BACKEND}/api/documents`
      );

      const documents = await res.json();

      // TOTAL DOCUMENTS
      const totalDocuments =
        documents.length;

      // MY UPLOADS
      const myUploads =
        documents.filter(
          (doc) =>
            doc.uploadedBy ===
            user?.email
        ).length;

      // TOTAL DOWNLOADS
      const totalDownloads =
        documents.reduce(
          (sum, doc) =>
            sum + (doc.downloads || 0),
          0
        );

      setStats({
        totalDocuments,
        myUploads,
        totalDownloads
      });

    } catch (err) {

      console.error(
        "Failed to fetch stats",
        err
      );

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="p-6">

      {/* HEADING */}
      <div className="mb-6">

        <h1 className="text-2xl font-semibold text-gray-900">

          Welcome back,
          {" "}
          {user?.name ||
            user?.email ||
            "User"}!

        </h1>

        <p className="text-gray-500 mt-1">

          Access your study materials
          and upload your notes.

        </p>

      </div>

      {/* LOADING */}
      {loading ? (

        <p className="text-gray-500">
          Loading stats...
        </p>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* TOTAL DOCS */}
          <StatCard
            title="Total Documents"
            value={stats.totalDocuments}
            subtitle="Available for download"
            icon={FaFileAlt}
          />

          {/* MY UPLOADS */}
          <StatCard
            title="My Uploads"
            value={stats.myUploads}
            subtitle="Documents uploaded"
            icon={FaUpload}
          />

          {/* TOTAL DOWNLOADS */}
          <StatCard
            title="Total Downloads"
            value={stats.totalDownloads}
            subtitle="Across all documents"
            icon={FaArrowTrendUp}
          />

        </div>
      )}
    </div>
  );
}