import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import SearchFilter from "../utilities/SearchFilter";
import DocumentList from "../layout/DocumentList";
import { authHeadersJson } from "../utilities/api";
import {
  isTeacherHandout,
  isStudentSubmission,
} from "../utilities/assignmentDocument";

/**
 * @param {{ mode?: "notes" | "assignmentHub" }} props
 */
export default function DocumentsLibrary({ mode = "notes" }) {
  const [documents, setDocuments] = useState([]);
  const [user, setUser] = useState(null);

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      setUser(JSON.parse(localStorage.getItem("user") || "null"));
    } catch {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    setCategory("");
    setDepartment("");
    setSubject("");
    setSearch("");
  }, [mode]);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND}/api/documents`,
        { headers: authHeadersJson() }
      );

      const data = await res.json();

      if (res.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/";
        return;
      }

      if (!res.ok) {
        console.error(data);
        setDocuments([]);
        return;
      }

      setDocuments(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch documents:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDocument = async (id) => {
    if (!confirm("Delete this document?")) return;
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND}/api/documents/${id}`,
        { method: "DELETE", headers: authHeadersJson() }
      );
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        alert(data.message || data.error || "Delete failed");
        return;
      }
      fetchDocuments();
    } catch (e) {
      alert(e.message);
    }
  };

  const applyTextAndDeptFilters = (list) =>
    list
      .filter((doc) => {
        const q = search.toLowerCase();
        return (
          doc.title?.toLowerCase().includes(q) ||
          doc.fileName?.toLowerCase().includes(q) ||
          doc.file?.toLowerCase().includes(q) ||
          doc.uploadedBy?.toLowerCase().includes(q)
        );
      })
      .filter(
        (doc) =>
          (!department || doc.department === department) &&
          (!subject || doc.subject === subject)
      );

  const byNotesMode = (doc) => (doc.category || "") !== "Assignment";

  let body;

  if (mode === "notes") {
    const filteredDocs = applyTextAndDeptFilters(documents)
      .filter(byNotesMode)
      .filter((doc) => !category || doc.category === category);

    body = loading ? (
      <div className="flex justify-center items-center py-20">
        <p className="text-gray-500">Loading…</p>
      </div>
    ) : filteredDocs.length > 0 ? (
      <DocumentList
        title={`Notes & materials (${filteredDocs.length})`}
        documents={filteredDocs}
        viewer={user}
        onDeleteDocument={handleDeleteDocument}
      />
    ) : (
      <div className="flex justify-center items-center py-20">
        <p className="text-gray-400">No notes or materials found</p>
      </div>
    );
  } else {
    const assignmentDocs = documents.filter(
      (d) => (d.category || "") === "Assignment"
    );
    const teacherHandouts = applyTextAndDeptFilters(
      assignmentDocs.filter((d) => isTeacherHandout(d, user))
    );
    const submissions = applyTextAndDeptFilters(
      assignmentDocs.filter((d) => isStudentSubmission(d, user))
    );

    body = loading ? (
      <div className="flex justify-center items-center py-20">
        <p className="text-gray-500">Loading…</p>
      </div>
    ) : (
      <div className="space-y-2">
        {teacherHandouts.length > 0 ? (
          <DocumentList
            title={`Teacher assignments (${teacherHandouts.length})`}
            documents={teacherHandouts}
            viewer={user}
            onDeleteDocument={handleDeleteDocument}
            embedded
          />
        ) : (
          <div className="mb-8 rounded-2xl border border-dashed border-gray-200 bg-white p-8 text-center text-gray-500">
            No teacher assignment files yet. Faculty can upload these from{" "}
            <span className="font-medium text-gray-700">Upload</span> using
            category &quot;Assignment&quot;.
          </div>
        )}

        {submissions.length > 0 ? (
          <DocumentList
            title={`Assignment submissions (${submissions.length})`}
            documents={submissions}
            viewer={user}
            onDeleteDocument={handleDeleteDocument}
            embedded
          />
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-8 text-center text-gray-500">
            No assignment submissions in this view. Students submit from the
            upload page.
          </div>
        )}
      </div>
    );
  }

  const pageTitle =
    mode === "assignmentHub" ? "Assignments" : "Notes & materials";
  const pageSubtitle =
    mode === "assignmentHub"
      ? "Teacher assignment materials and student submissions, split below."
      : "Study materials, notes, and question papers in your access scope.";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-6 pt-4 pb-2 max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-900">{pageTitle}</h1>
        <p className="text-sm text-gray-600 mt-1">{pageSubtitle}</p>
      </div>

      <div className="px-6 pt-2">
        <SearchFilter
          mode={mode}
          search={search}
          setSearch={setSearch}
          department={department}
          setDepartment={setDepartment}
          subject={subject}
          setSubject={setSubject}
          category={category}
          setCategory={setCategory}
        />
      </div>

      <div className="px-6 pb-6 max-w-6xl mx-auto">{body}</div>
    </div>
  );
}

export function DocumentLibraryRedirect() {
  return <Navigate to="/notes" replace />;
}
