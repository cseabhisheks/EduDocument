import { useEffect, useState } from "react";
import { authHeadersJson } from "../utilities/api";

const API = import.meta.env.VITE_BACKEND;

export default function FacultyStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  let viewer = null;
  try {
    viewer = JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    viewer = null;
  }

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API}/api/users/department-students`, {
          headers: authHeadersJson(),
        });
        if (res.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          window.location.href = "/";
          return;
        }
        const data = await res.json();
        if (!res.ok) {
          alert(data.message || "Failed to load students");
          return;
        }
        setStudents(data);
      } catch (e) {
        alert(e.message);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          {viewer?.role === "Admin" ? "All students" : "Students in your department"}
        </h1>
        <p className="text-sm text-gray-600 mb-6">
          Roster for your department. Student assignment uploads for your
          teaching subjects appear in the document library.
        </p>

        {loading ? (
          <p className="text-gray-500">Loading…</p>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4">Enrollment</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr key={s._id} className="border-t border-gray-100">
                    <td className="py-3 px-4">{s.name}</td>
                    <td className="py-3 px-4">{s.email}</td>
                    <td className="py-3 px-4">{s.department || "—"}</td>
                    <td className="py-3 px-4">{s.enrollment || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {students.length === 0 && (
              <p className="p-6 text-gray-500 text-center">No students found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
