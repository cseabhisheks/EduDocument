import { FiFileText, FiDownload, FiTrash2 } from "react-icons/fi";

function normalizeId(v) {
  if (v == null) return "";
  if (typeof v === "object" && v.toString) return v.toString();
  return String(v);
}

function canDeleteDoc(doc, viewer, hasHandler) {
  if (!hasHandler || !viewer) return false;
  const role = viewer.role;
  const ownerId = normalizeId(doc.uploaderId);
  const viewerId = normalizeId(viewer._id);
  if (role === "Admin") return true;
  if (!ownerId || ownerId !== viewerId) return false;
  if (role === "Student") return doc.category === "Assignment";
  if (role === "Faculty") return doc.category !== "Assignment";
  return false;
}

export default function DocumentRow({ doc, viewer, onDelete }) {
  const API = import.meta.env.VITE_BACKEND;
  const showDelete = canDeleteDoc(doc, viewer, typeof onDelete === "function");

  const getCategoryStyle = (category) => {
    const c = (category || "").toLowerCase();
    if (c === "notes") return "bg-blue-100 text-blue-600";
    if (c === "assignment") return "bg-purple-100 text-purple-600";
    if (c === "question paper") return "bg-amber-100 text-amber-700";
    if (c === "lab") return "bg-green-100 text-green-600";
    return "bg-gray-100 text-gray-600";
  };

  const handleDownload = () => {
    if (!doc.fileUrl) return;
    const cleanPath = doc.fileUrl.replace(/\\/g, "/");
    const link = document.createElement("a");
    link.href = `${API}/${cleanPath}`;
    link.target = "_blank";
    link.click();
  };

  const handleDelete = () => {
    if (!onDelete || !doc._id) return;
    onDelete(doc._id);
  };

  const fileLabel = doc.fileName || doc.file || "";

  const mobileColSpan = onDelete ? 5 : 4;

  return (
    <>
      <tr className="md:hidden border-b">
        <td colSpan={mobileColSpan} className="py-4 px-4">
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <FiFileText className="text-gray-500 mt-1" size={18} />
              <div>
                <p className="font-medium text-gray-800">{doc.title}</p>
                <p className="text-xs text-gray-500">{fileLabel}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 text-sm text-gray-600">
              <span>{doc.subject}</span>
              <span
                className={`px-2 py-0.5 text-xs rounded-full ${getCategoryStyle(
                  doc.category
                )}`}
              >
                {doc.category}
              </span>
              <span>{doc.uploadedBy}</span>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleDownload}
                className="inline-flex items-center gap-2 border px-3 py-1.5 rounded-md hover:bg-gray-100 text-sm"
              >
                <FiDownload size={14} />
                Open file
              </button>
              {showDelete && (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="inline-flex items-center gap-2 border border-red-200 text-red-600 px-3 py-1.5 rounded-md hover:bg-red-50 text-sm"
                >
                  <FiTrash2 size={14} />
                  Delete
                </button>
              )}
            </div>
          </div>
        </td>
      </tr>

      <tr className="hidden md:table-row border-b hover:bg-gray-50">
        <td className="py-4 px-4">
          <div className="flex items-start gap-2">
            <FiFileText className="text-gray-500 mt-1" size={18} />
            <div>
              <p className="font-medium text-gray-800">{doc.title}</p>
              <p className="text-xs text-gray-500">{fileLabel}</p>
            </div>
          </div>
        </td>

        <td className="py-4 px-4 text-gray-700">{doc.subject}</td>

        <td className="py-4 px-4">
          <span
            className={`px-2 py-0.5 text-xs rounded-full ${getCategoryStyle(
              doc.category
            )}`}
          >
            {doc.category}
          </span>
        </td>

        <td className="py-4 px-4 text-center">
          <button
            type="button"
            onClick={handleDownload}
            className="inline-flex items-center gap-2 border px-3 py-1.5 rounded-md hover:bg-gray-100 transition"
          >
            <FiDownload size={14} />
            Open file
          </button>
        </td>

        {onDelete && (
          <td className="py-4 px-4 text-center">
            {showDelete ? (
              <button
                type="button"
                onClick={handleDelete}
                className="inline-flex items-center gap-1 text-red-600 border border-red-200 px-2 py-1 rounded-md hover:bg-red-50 text-sm"
                title="Delete"
              >
                <FiTrash2 size={16} />
              </button>
            ) : (
              <span className="text-gray-300 text-xs">—</span>
            )}
          </td>
        )}
      </tr>
    </>
  );
}
