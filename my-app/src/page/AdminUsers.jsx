import { useEffect, useState } from "react";
import { authHeadersJson } from "../utilities/api";

const API = import.meta.env.VITE_BACKEND;

const emptyEdit = {
  id: null,
  name: "",
  email: "",
  role: "Student",
  department: "",
  enrollment: "",
  subjects: "",
  password: "",
};

export default function AdminUsers() {
  const [tab, setTab] = useState("Faculty");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(emptyEdit);

  const departments = ["Computer Science", "Mechanical", "Electrical"];

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${API}/api/users?role=${encodeURIComponent(tab)}`,
        { headers: authHeadersJson() }
      );
      if (res.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/";
        return;
      }
      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Failed to load users");
        return;
      }
      setUsers(data);
    } catch (e) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [tab]);

  const startEdit = (u) => {
    setEdit({
      id: u._id,
      name: u.name || "",
      email: u.email || "",
      role: u.role || "Student",
      department: u.department || "",
      enrollment: u.enrollment || "",
      subjects: Array.isArray(u.subjects) ? u.subjects.join(", ") : "",
      password: "",
    });
  };

  const saveEdit = async (e) => {
    e.preventDefault();
    if (!edit.id) return;

    const body = {
      name: edit.name,
      email: edit.email,
      role: edit.role,
      department: edit.department,
      enrollment: edit.enrollment,
    };
    if (edit.role === "Faculty" && edit.subjects.trim()) {
      body.subjects = edit.subjects
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    } else if (edit.role === "Faculty") {
      body.subjects = [];
    }
    if (edit.password.trim()) {
      body.password = edit.password;
    }

    const res = await fetch(`${API}/api/users/${edit.id}`, {
      method: "PATCH",
      headers: authHeadersJson(),
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      alert(data.message || "Update failed");
      return;
    }
    setEdit(emptyEdit);
    load();
  };

  const remove = async (id) => {
    if (!confirm("Delete this user?")) return;
    const res = await fetch(`${API}/api/users/${id}`, {
      method: "DELETE",
      headers: authHeadersJson(),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      alert(data.message || "Delete failed");
      return;
    }
    load();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Admin — users
        </h1>
        <p className="text-sm text-gray-600 mb-6">
          Manage faculty and students. Faculty members need a department and
          optional teaching subjects (comma-separated) so they only receive
          student assignments for those subjects.
        </p>

        <div className="flex gap-2 mb-6">
          {["Faculty", "Student"].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setTab(r)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${tab === r
                ? "bg-black text-white"
                : "bg-white border border-gray-200 text-gray-700"
                }`}
            >
              {r === "Faculty" ? "Teachers" : "Students"}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-gray-500">Loading…</p>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-[900px] w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Department</th>
                    {tab === "Faculty" && (
                      <th className="py-3 px-4">Teaching subjects</th>
                    )}
                    {tab === "Student" && (
                      <th className="py-3 px-4">Enrollment</th>
                    )}
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u._id} className="border-t border-gray-100">
                      <td className="py-3 px-4">{u.name}</td>
                      <td className="py-3 px-4">{u.email}</td>
                      <td className="py-3 px-4">{u.department || "—"}</td>
                      {tab === "Faculty" && (
                        <td className="py-3 px-4 text-xs text-gray-600">
                          {Array.isArray(u.subjects) && u.subjects.length
                            ? u.subjects.join(", ")
                            : "— (all subjects in dept)"}
                        </td>
                      )}
                      {tab === "Student" && (
                        <td className="py-3 px-4">{u.enrollment || "—"}</td>
                      )}
                      <td className="py-3 px-4 text-right space-x-2">
                        <button
                          type="button"
                          className="text-indigo-600 hover:underline"
                          onClick={() => startEdit(u)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="text-red-600 hover:underline"
                          onClick={() => remove(u._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {users.length === 0 && (
              <p className="p-6 text-gray-500 text-center">No users in this tab.</p>
            )}
          </div>
        )}

        {edit.id && (
          <form
            onSubmit={saveEdit}
            className="mt-8 max-w-xl bg-white p-6 rounded-2xl border border-gray-200 space-y-3"
          >
            <h2 className="font-semibold text-lg">Edit user</h2>
            <input
              className="w-full border rounded-lg px-3 py-2"
              value={edit.name}
              onChange={(e) => setEdit({ ...edit, name: e.target.value })}
              placeholder="Name"
            />
            <input
              className="w-full border rounded-lg px-3 py-2"
              value={edit.email}
              onChange={(e) => setEdit({ ...edit, email: e.target.value })}
              placeholder="Email"
            />
            <select
              className="w-full border rounded-lg px-3 py-2"
              value={edit.role}
              onChange={(e) => setEdit({ ...edit, role: e.target.value })}
            >
              <option value="Student">Student</option>
              <option value="Faculty">Faculty</option>
              <option value="Admin">Admin</option>
            </select>
            <select
              className="w-full border rounded-lg px-3 py-2"
              value={edit.department}
              onChange={(e) => setEdit({ ...edit, department: e.target.value })}
            >
              <option value="">Department</option>
              {departments.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            <input
              className="w-full border rounded-lg px-3 py-2"
              value={edit.enrollment}
              onChange={(e) => setEdit({ ...edit, enrollment: e.target.value })}
              placeholder="Enrollment (students)"
            />
            {edit.role === "Faculty" && (
              <input
                className="w-full border rounded-lg px-3 py-2"
                value={edit.subjects}
                onChange={(e) => setEdit({ ...edit, subjects: e.target.value })}
                placeholder="Teaching subjects: DSA, OS, DBMS"
              />
            )}
            <input
              type="password"
              className="w-full border rounded-lg px-3 py-2"
              value={edit.password}
              onChange={(e) => setEdit({ ...edit, password: e.target.value })}
              placeholder="New password (optional)"
            />
            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                className="bg-black text-white px-4 py-2 rounded-lg"
              >
                Save
              </button>
              <button
                type="button"
                className="border px-4 py-2 rounded-lg"
                onClick={() => setEdit(emptyEdit)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
